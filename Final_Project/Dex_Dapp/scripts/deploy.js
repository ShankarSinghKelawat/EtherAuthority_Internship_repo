const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

    const TOKEN_A = "0xYourTokenAAddressHere";
    const TOKEN_B = "0xYourTokenBAddressHere";

    if (!TOKEN_A || !TOKEN_B) {
        throw new Error("Token addresses are missing");
    }

    const Dex = await hre.ethers.getContractFactory("Dex");
    const dex = await Dex.deploy(TOKEN_A, TOKEN_B);

    await dex.waitForDeployment();

    console.log("DEX deployed to:", await dex.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
