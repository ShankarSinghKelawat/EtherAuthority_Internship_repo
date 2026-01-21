import { ethers } from "ethers";
import dexAbi from "../ABI/dexContract.json";
import erc20Abi from "../ABI/goldToken.json";
import { DEX_ADDRESS, GOLD_ADDRESS } from "../config";

export default function AddLiquidity({ signer }) {

  const addLiquidity = async () => {
    try {
      const tokenAddress = document.getElementById("liq-token").value;
      const goldAmount = document.getElementById("liq-gold").value;
      const tokenAmount = document.getElementById("liq-token-amount").value;

      const dex = new ethers.Contract(DEX_ADDRESS, dexAbi, signer);
      const gold = new ethers.Contract(GOLD_ADDRESS, erc20Abi, signer);
      const token = new ethers.Contract(tokenAddress, erc20Abi, signer);

      const goldWei = ethers.parseUnits(goldAmount, 18);
      const tokenWei = ethers.parseUnits(tokenAmount, 18);

      // Approve tokens
      await gold.approve(DEX_ADDRESS, goldWei);
      await token.approve(DEX_ADDRESS, tokenWei);

      // Add liquidity
      await dex.addLiquidity(tokenAddress, goldWei, tokenWei);

      alert("Liquidity added successfully");
    } catch (err) {
      console.error(err);
      alert(err.reason || err.message);
    }
  };

  return (
    <div>
      <h2>Add Liquidity</h2>

      <input id="liq-token" placeholder="Token address (Diamond / Silver)" />
      <input id="liq-gold" placeholder="Gold amount" />
      <input id="liq-token-amount" placeholder="Token amount" />

      <button onClick={addLiquidity}>Add Liquidity</button>
    </div>
  );
}
