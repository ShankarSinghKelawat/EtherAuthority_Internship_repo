import { ethers } from "ethers";
import { useEffect, useState } from "react";
import dexAbi from "../ABI/dexContract.json";
import erc20Abi from "../ABI/goldToken.json";
import {
  DEX_ADDRESS,
  GOLD_ADDRESS,
  DIAMOND_ADDRESS,
  SILVER_ADDRESS,
} from "../config";

const TOKENS = {
  GOLD: { name: "Gold (GLT)", address: GOLD_ADDRESS },
  DIAMOND: { name: "Diamond (DMT)", address: DIAMOND_ADDRESS },
  SILVER: { name: "Silver (SVT)", address: SILVER_ADDRESS },
};

export default function Exchange({ signer }) {
  const [fromToken, setFromToken] = useState(DIAMOND_ADDRESS);
  const [toToken, setToToken] = useState(GOLD_ADDRESS);
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");
  const [txStatus, setTxStatus] = useState(""); 

  const format2Decimals = (value) => {
    if (!value) return "";
    return Number(value).toFixed(2);
  };

  useEffect(() => {
    fetchQuote();
  }, [fromToken, toToken, amount]);

  const fetchQuote = async () => {
    try {
      setError("");
      setQuote(null);

      if (!amount || Number(amount) <= 0) return;

      if (fromToken === toToken) {
        setError("Invalid exchange: From and To tokens must be different");
        return;
      }

      const dex = new ethers.Contract(DEX_ADDRESS, dexAbi, signer);
      const weiAmount = ethers.parseUnits(amount, 18);

      const out = await dex.getQuote(fromToken, toToken, weiAmount);
      setQuote(ethers.formatUnits(out, 18));
    } catch (err) {
      setError("No liquidity available for this pair");
    }
  };

  const swap = async () => {
    try {
      if (fromToken === toToken) {
        setError("Invalid exchange");
        return;
      }

      if (!amount || Number(amount) <= 0) {
        setError("Enter a valid amount");
        return;
      }

      setError("");
      setTxStatus("pending");

      const dex = new ethers.Contract(DEX_ADDRESS, dexAbi, signer);
      const fromTokenContract = new ethers.Contract(
        fromToken,
        erc20Abi,
        signer
      );

      const weiAmount = ethers.parseUnits(amount, 18);

      const approveTx = await fromTokenContract.approve(
        DEX_ADDRESS,
        weiAmount
      );
      await approveTx.wait();

      const tx = await dex.exchange(fromToken, toToken, weiAmount);
      await tx.wait();

      setTxStatus("success");
      setAmount("");
      setQuote(null);
    } catch (err) {
      console.error(err);
      setTxStatus("error");
    }
  };

  return (
    <div>
      <h2 className="description">Exchange Tokens</h2>
      <label className="labels">From: </label>
      <select className="selects" value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
        {Object.values(TOKENS).map((t) => (
          <option key={t.address} value={t.address}>
            {t.name}
          </option>
        ))}
      </select>
      <br />

      <label className="labels">To: </label>
      <select className="selects" value={toToken} onChange={(e) => setToToken(e.target.value)}>
        {Object.values(TOKENS).map((t) => (
          <option key={t.address} value={t.address}>
            {t.name}
          </option>
        ))}
      </select>
      <br />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Quote */}
      {quote && !error && (
        <p>
          You will receive ≈{" "}
          <b>{format2Decimals(quote)}</b>{" "}
          {Object.values(TOKENS).find((t) => t.address === toToken)?.name}
        </p>
      )}

      {/* Fee info */}
      <p style={{ fontSize: "17px", color: "#7a7a7a" }}>
        Fee: 0.3% per swap (routed swaps incur the fee twice)
      </p>

      {/* Errors */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="excBtn"
        onClick={swap}
        disabled={!quote || txStatus === "pending"}
      >
        Exchange
      </button>

      {/* Transaction status */}
      {txStatus === "pending" && <p>Transaction pending…</p>}
      {txStatus === "success" && (
        <p style={{ color: "green" }}>Transaction successful ✅</p>
      )}
      {txStatus === "error" && (
        <p style={{ color: "red" }}>Transaction failed ❌</p>
      )}
    </div>
  );
}
