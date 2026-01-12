# Week 2 Tasks – Web3 & Full Stack Development

## Overview
This repository contains the **Week 2 internship tasks**, focused on implementing **Web3 smart contracts**,
**backend REST APIs**, **database integration**, and a **React-based Intern Management Web3 Application**.

The goal of Week 2 was to understand how **blockchain (Web3)** can be integrated with a **traditional Web2 stack** to build real-world decentralized applications.

---

## Week 2 Task Breakdown

---

## 1. Smart Contract Development

### 1.1 ERC20 Token Deployment
Implemented and deployed ERC20 smart contracts to represent fungible reward-based tokens.

#### ERC20 Token Examples:
- **Intern Reward Token**  
  Used to reward interns for overall performance and participation.

- **Task Completion Token**  
  Issued when an intern successfully completes assigned tasks.

- **Attendance Token**  
  Represents attendance-based incentives for interns.

**Key Concepts Used:**
- Solidity
- ERC20 Standard
- OpenZeppelin Contracts
- Token minting and transfer logic

---

### 1.2 ERC721 Token (NFT) Deployment
Implemented ERC721 smart contracts for non-fungible tokens representing achievements and certifications.

#### ERC721 NFT Examples:
- **Internship Certificate NFT**  
  Issued at the completion of the internship.

- **Course Completion NFT**  
  Represents successful completion of a specific course or training.

- **Achievement Badge NFT**  
  Awarded for exceptional performance or milestones.

**Key Concepts Used:**
- ERC721 Standard
- NFT metadata (name, description, image)
- Ownership tracking on blockchain

---

### 1.3 NFT Minting Contract
- Created a dedicated **NFT minting smart contract**
- Allowed minting NFTs to intern wallet addresses
- Managed token IDs and metadata URIs

---

## 2. Backend Development – REST APIs

### 2.1 Node.js & Express Backend
Developed RESTful APIs using **Node.js and Express.js** to handle intern and task-related operations.

#### Implemented APIs:
- **Intern Registration API**  
  Handles intern onboarding and profile creation.

- **Task Submission API**  
  Allows interns to submit completed tasks and track progress.

---

### 2.2 MongoDB Integration
Integrated MongoDB to persist application data.

#### Databases Designed:
- **Intern Profile Database**  
  Stores intern details such as name, email, wallet address, and role.

- **Task Tracking Database**  
  Stores task details, submission status, and completion history.

**Tools Used:**
- MongoDB
- Mongoose ODM
- Environment variables for secure configuration

---

## 3. Frontend Integration

### 3.1 React Frontend
- Built frontend components using **React.js**
- Connected frontend to backend REST APIs
- Displayed intern data and task status dynamically

---

### 3.2 React + Web3 Integration
- Connected frontend to blockchain via wallet (MetaMask)
- Enabled interaction with deployed smart contracts
- Allowed NFT minting and token interactions from UI

---

## 4. Example Application

### Intern Management Web3 App
A full-stack Web3 application demonstrating:
- Intern registration and management
- Task submission and tracking
- Blockchain-based rewards using ERC20 tokens
- NFT issuance using ERC721 contracts
- Integration of React frontend, Express backend, MongoDB, and Solidity smart contracts

---

## Tech Stack Used

### Frontend
- React.js
- JavaScript (ES6)
- HTML, CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Blockchain / Web3
- Solidity
- ERC20 & ERC721 Standards
- OpenZeppelin
- Remix IDE
- MetaMask
- Test Network (Sepolia)

---

## Learning Outcomes

- Practical understanding of **ERC20 and ERC721 standards**
- Smart contract deployment and testing
- NFT minting workflow
- Backend API design and integration
- MongoDB schema design for real applications
- Web3 + Web2 full-stack architecture
- Debugging blockchain and RPC-related issues

---

## Notes
- All deployments were done on **test networks**
- Sensitive files such as `.env` are excluded using `.gitignore`
- This repository is strictly for **learning and evaluation purposes**

