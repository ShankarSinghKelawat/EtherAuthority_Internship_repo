const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  // ethers v6: get balance via provider
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", balance.toString());

  const InternNFT = await hre.ethers.getContractFactory("InternNFT");
  const internNFT = await InternNFT.deploy();

  await internNFT.waitForDeployment();

  console.log(
    "InternNFT deployed to:",
    await internNFT.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
