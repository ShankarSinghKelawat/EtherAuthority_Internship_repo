# 🧩 Mini Decentralized Exchange (DEX) DApp

A **Mini Decentralized Exchange (DEX)** built using **Solidity** and **React**, enabling users to swap ERC-20 tokens directly from their wallets without relying on a centralized intermediary.

This project demonstrates core **DeFi concepts** such as liquidity pools, automated market makers (AMM), token swaps, and smart contract–driven asset custody.

---

## 🚀 Deployment Details

| Component | Network | Address |
|---------|--------|---------|
| DEX Contract | Sepolia | `0x9c90518739576f5DF4c0DE1A9ca0862699b913e2` |
| Token Gold | Sepolia | `0x145b7BDB59FD35C307605AD022981C2c9AADe8e4` |
| Token Silver | Sepolia | `0x017B2C957036c35B13808A58eb4db013168D3d89` |
| Token Diamond | Sepolia | `0xe262f6Ab48487Cb0aFfB97984a612fd2673f1315` |

---

## 📌 Features

- 🔁 Swap ERC-20 tokens using an AMM model
- 💧 Add liquidity
- 📊 Price calculation based on pool reserves
- 🔐 Non-custodial (users keep control of funds)
- 🦊 MetaMask wallet integration
- ⛓️ Deployed on Ethereum test network

---

## 🏗️ Tech Stack

### Smart Contracts
- Solidity `^0.8.x`
- OpenZeppelin (ERC-20, security utilities)

### Frontend
- React.js
- Ethers.js
- MetaMask

### Blockchain
- Ethereum (Sepolia)

---

## 🧠 Core Concepts Implemented

- Automated Market Maker (AMM)
- Constant Product Formula: `x * y = k`
- Liquidity Pools
- ERC-20 Token Standard
- Smart Contract Security Basics

---

## ⚙️ Smart Contract Overview

### `DexContract.sol`
- Manages liquidity pools
- Handles token swaps
- Calculates output amounts
- Emits events for frontend tracking

### `GoldToken.sol` , `SilverToken.sol` & `Diamond Token`
- Sample ERC-20 tokens
- Used for testing swaps and liquidity

# where **Gold Token acts as the base token** for all swaps and liquidity pools.
# All other ERC-20 tokens are traded **against Gold Token**, similar to how ETH or USDT works as a base pair in real-world DEXs.

# To swap TokenA → TokenB:
1. TokenA → Gold
2. Gold → TokenB

---

## 🔄 Swap Logic (AMM)

The exchange uses the **constant product formula**:


Where:
- `x` = reserve of Token A
- `y` = reserve of Token B
- `k` = constant

This ensures fair pricing and prevents pool depletion.

---

## End



