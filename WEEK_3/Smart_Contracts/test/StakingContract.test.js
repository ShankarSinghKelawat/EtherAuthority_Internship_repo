const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StakingContract", function () {
  let owner, user;
  let stakingToken, rewardToken, staking;

  const ONE = ethers.parseEther("1");

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    // Deploy mock tokens
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    stakingToken = await MockERC20.deploy("StakeToken", "STK");
    rewardToken = await MockERC20.deploy("RewardToken", "RWD");

    // Deploy staking contract
    const StakingContract = await ethers.getContractFactory("StakingContract");
    staking = await StakingContract.deploy(
      stakingToken.target,
      rewardToken.target
    );

    // Mint tokens
    await stakingToken.mint(user.address, ethers.parseEther("100"));
    await rewardToken.mint(staking.target, ethers.parseEther("1000"));
  });

  describe("Stake", function () {
    it("stakes tokens correctly", async () => {
      await stakingToken.connect(user).approve(staking.target, ONE);

      await staking.connect(user).stake(ONE);

      expect(await staking.stakedBalance(user.address)).to.equal(ONE);
      expect(await stakingToken.balanceOf(staking.target)).to.equal(ONE);
    });

    it("reverts when staking zero", async () => {
      await expect(
        staking.connect(user).stake(0)
      ).to.be.revertedWith("Amount must be greater than Zero");
    });
  });

  describe("Rewards", function () {
    it("accumulates rewards over time", async () => {
      await stakingToken.connect(user).approve(staking.target, ONE);
      await staking.connect(user).stake(ONE);

      await ethers.provider.send("evm_increaseTime", [3600]);
      await ethers.provider.send("evm_mine");

      const rewards = await staking.earned(user.address);
      expect(rewards).to.be.gt(0);
    });
  });

  describe("Withdraw", function () {
    it("withdraws staked tokens", async () => {
      await stakingToken.connect(user).approve(staking.target, ONE);
      await staking.connect(user).stake(ONE);

      await staking.connect(user).withdraw(ONE);

      expect(await staking.stakedBalance(user.address)).to.equal(0);
      expect(await stakingToken.balanceOf(user.address)).to.equal(
        ethers.parseEther("100")
      );
    });

    it("reverts on over-withdraw", async () => {
      await expect(
        staking.connect(user).withdraw(ONE)
      ).to.be.revertedWith("Invalid amount to Withdraw");
    });
  });

  describe("Claim Rewards", function () {
    it("claims rewards correctly", async () => {
      await stakingToken.connect(user).approve(staking.target, ONE);
      await staking.connect(user).stake(ONE);

      await ethers.provider.send("evm_increaseTime", [3600]);
      await ethers.provider.send("evm_mine");

      await staking.connect(user).claimReward();

      const rewardBalance = await rewardToken.balanceOf(user.address);
      expect(rewardBalance).to.be.gt(0);
    });

    it("reverts if no rewards", async () => {
      await expect(
        staking.connect(user).claimReward()
      ).to.be.revertedWith("No Rewards to claim");
    });
  });
});
