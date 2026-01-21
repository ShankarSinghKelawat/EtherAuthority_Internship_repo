import { ethers } from "ethers";

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  // Request account access
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  if (!accounts || accounts.length === 0) {
    throw new Error("No accounts found");
  }

  // Get chainId
  const chainIdHex = await window.ethereum.request({
    method: "eth_chainId",
  });
  const chainId = parseInt(chainIdHex, 16);

  // Create provider & signer
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return {
    provider,
    signer,
    account: accounts[0],
    chainId,
  };
};
