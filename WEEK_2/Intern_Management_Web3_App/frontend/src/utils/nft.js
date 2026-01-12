import { ethers } from "ethers";
import InternNFT from "../abis/InternNFT.json";
import { NFT_CONTRACT_ADDRESS, ADMIN_WALLET } from "../config";

export async function mintNFT(internWallet, tokenURI) {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const signerAddress = await signer.getAddress();
  if (signerAddress.toLowerCase() !== ADMIN_WALLET.toLowerCase()) {
    throw new Error("Not admin wallet");
  }

  const contract = new ethers.Contract(
    NFT_CONTRACT_ADDRESS,
    InternNFT.abi,
    signer
  );

  const tx = await contract.mintInternNFT(internWallet, tokenURI);
  const receipt = await tx.wait();

  return receipt;
}
