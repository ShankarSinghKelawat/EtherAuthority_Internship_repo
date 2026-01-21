import { useState } from "react";
import { connectWallet } from "../utils/connectWallet";

export default function ConnectWallet({ setSigner }) {
  const [account, setAccount] = useState(null);

  const handleConnect = async () => {
    try {
      const { signer, account, chainId } = await connectWallet();

      if (chainId !== 11155111) {
        alert("Please switch to Sepolia network");
        return;
      }

      setSigner(signer);
      setAccount(account);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const shortAddress = (addr) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="wallet-wrapper">
      {!account && (
        <p className="wallet-hint">
          Connect Your Wallet to Get Started!
        </p>
      )}

      <button
        className={`wallet-btn ${account ? "connected" : ""}`}
        onClick={handleConnect}
      >
        {account ? shortAddress(account) : "Connect"}
      </button>
    </div>
  );
}
