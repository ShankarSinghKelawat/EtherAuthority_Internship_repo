# Staking DApp

A decentralized staking application that allows users to stake ERC20 tokens and earn rewards based on staking duration.  
The system consists of a Solidity smart contract deployed on an EVM-compatible blockchain and a React-based frontend that interacts with it via MetaMask.

---

## 📌 Project Overview

The Staking DApp enables users to:
- Stake a predefined ERC20 token
- Earn rewards over time at a fixed reward rate
- Withdraw staked tokens
- Claim accumulated rewards independently

Rewards are calculated proportionally based on:
- Amount of tokens staked
- Time duration of staking
- Total tokens staked in the contract

The contract follows a **reward-per-token** accounting model to ensure fair and gas-efficient reward distribution.

---
## 🔗 Deployed Contracts

### Network Details

- **Network:** `Sepolia Testnet`  
- **Chain ID:** `11155111`

### Contract Addresses

| Contract Type     | Address |
|------------------|---------|
| Staking Contract | `0x6DD6d211efBcc5452E05B573d56f66f971365945` |
| Staking Token    | `0x9D36B320f660064C5beDC30c8012f1646a53e7a9` |
| Reward Token     | `0x2540Ff9524a53eDb0D9eb42725372190cAeBfF0b` |

---

## 🔑 Core Functions

### `stake(uint256 amount)`
Allows users to stake ERC20 tokens after approval.

### `withdraw(uint256 amount)`
Withdraws a specified amount of staked tokens.

### `claimReward()`
Transfers accumulated reward tokens to the user.

### `earned(address user)`
Returns the total rewards earned by a user.

### `rewardPerToken()`
Calculates updated reward per token based on time elapsed.

---

## 🔐 Security Considerations

- Reentrancy protection using `ReentrancyGuard`
- Solidity ^0.8.x overflow checks
- Validations for zero or invalid stake amounts

> ❌ This contract is **NOT AUDITED**  
> ❌ Do **NOT** deploy to mainnet without a professional audit

---