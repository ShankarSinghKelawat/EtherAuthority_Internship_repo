const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Gold-Based DEX", function () {
  let dex;
  let gold;
  let token;
  let owner, user;

  const INITIAL_SUPPLY = ethers.parseEther("100000*decimal(18)");
  const LIQUIDITY_GOLD = ethers.parseEther("1000*decimal(18)");
  const LIQUIDITY_TOKEN = ethers.parseEther("500*decimal(18)");

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    // Deploy Gold Token
    const GoldToken = await ethers.getContractFactory("GoldToken");
    gold = await GoldToken.deploy(INITIAL_SUPPLY);
    await gold.waitForDeployment();

    // Deploy ERC20 Token
    const Token = await ethers.getContractFactory("ERC20Token");
    token = await Token.deploy(INITIAL_SUPPLY);
    await token.waitForDeployment();

    // Deploy DEX
    const Dex = await ethers.getContractFactory("Dex");
    dex = await Dex.deploy(await gold.getAddress());
    await dex.waitForDeployment();

    // Transfer tokens to user
    await gold.transfer(user.address, ethers.parseEther("2000"));
    await token.transfer(user.address, ethers.parseEther("2000"));
  });

  describe("Deployment", () => {
    it("should set Gold token as base token", async () => {
      expect(await dex.goldToken()).to.equal(await gold.getAddress());
    });
  });

  describe("Liquidity", () => {
    it("should allow adding liquidity with Gold as base", async () => {
      await gold.approve(dex, LIQUIDITY_GOLD);
      await token.approve(dex, LIQUIDITY_TOKEN);

      await dex.addLiquidity(
        await token.getAddress(),
        LIQUIDITY_GOLD,
        LIQUIDITY_TOKEN
      );

      const reserves = await dex.getReserves(await token.getAddress());

      expect(reserves.goldReserve).to.equal(LIQUIDITY_GOLD);
      expect(reserves.tokenReserve).to.equal(LIQUIDITY_TOKEN);
    });

    it("should revert if Gold amount is zero", async () => {
      await token.approve(dex, LIQUIDITY_TOKEN);

      await expect(
        dex.addLiquidity(
          await token.getAddress(),
          0,
          LIQUIDITY_TOKEN
        )
      ).to.be.reverted;
    });
  });

  describe("Swaps", () => {
    beforeEach(async () => {
      await gold.approve(dex, LIQUIDITY_GOLD);
      await token.approve(dex, LIQUIDITY_TOKEN);

      await dex.addLiquidity(
        await token.getAddress(),
        LIQUIDITY_GOLD,
        LIQUIDITY_TOKEN
      );
    });

    it("should swap Token → Gold", async () => {
      const swapAmount = ethers.parseEther("10");

      await token.connect(user).approve(dex, swapAmount);

      const goldBefore = await gold.balanceOf(user.address);

      await dex.connect(user).swapTokenForGold(
        await token.getAddress(),
        swapAmount
      );

      const goldAfter = await gold.balanceOf(user.address);

      expect(goldAfter).to.be.gt(goldBefore);
    });

    it("should swap Gold → Token", async () => {
      const swapAmount = ethers.parseEther("10");

      await gold.connect(user).approve(dex, swapAmount);

      const tokenBefore = await token.balanceOf(user.address);

      await dex.connect(user).swapGoldForToken(
        await token.getAddress(),
        swapAmount
      );

      const tokenAfter = await token.balanceOf(user.address);

      expect(tokenAfter).to.be.gt(tokenBefore);
    });

    it("should update reserves after swap", async () => {
      const swapAmount = ethers.parseEther("20");

      await gold.connect(user).approve(dex, swapAmount);

      await dex.connect(user).swapGoldForToken(
        await token.getAddress(),
        swapAmount
      );

      const reserves = await dex.getReserves(await token.getAddress());

      expect(reserves.goldReserve).to.be.gt(LIQUIDITY_GOLD);
      expect(reserves.tokenReserve).to.be.lt(LIQUIDITY_TOKEN);
    });
  });

  describe("Invalid operations", () => {
    it("should revert direct Token → Token swaps", async () => {
      await expect(
        dex.swapTokenForToken(
          await token.getAddress(),
          await token.getAddress(),
          ethers.parseEther("10")
        )
      ).to.be.reverted;
    });
  });
});
