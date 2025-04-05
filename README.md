# 🚀 Web3 DApp Crowdfunding Platform

A decentralized crowdfunding application built on the Ethereum blockcha using smart contracts. This platform allows users to create and contribute to fundraising campaigns securely and transparently.This project mainly target NGO's or charitiable oragnizations to provide a secure,decentralized way for Fundraising.

## 🧠 Features

- 📦 Create and manage crowdfunding campaigns on-chain
- 💰 Donate using MetaMask
- 🔍 View all active campaigns
- 🔗 Fully decentralized, transparent and censorship-resistant
- 📈 Campaign stats like raised amount only access to the owner
- 🛡️ Smart contract handles fund storage and withdrawal
  

## 📂 Project Structure

```
├── foundry/          # Solidity Smart Contracts and framework
├── node/             #Backend Code for running
├── test/             # React Files              
└── README.md
```

## 🛠️ Tech Stack

- **Solidity** – Smart contract development
- **Foundry** – Development and testing framework
- **React.js / Vite** – Frontend UI
- **Ethers.js** – Ethereum JavaScript API
- **MetaMask** – Wallet integration
- 

## 🚧 Setup Instructions

### 1. Clone the Repository

```bash
gh repo clone sourcecode68/Hashhack-crowdfunding-project
cd Hashhack-crowdfunding-project
```

### 2. Install Dependencies

# In both root and test directories (if applicable)
```bash
npm install
```

### 3. Compile Smart Contracts
```bash
forge build
```

### 4. Deploy to Local or Testnet
```bash
forge script script/DeployFundMe.s.sol --rpc-url $SEPOLIA_RPC --broadcast --private-key $SEPOLIA_PRIVATE_KEY
```

### 5. Run Frontend
```bash

cd test/
npm run dev
```
## 🧪 Testinggh repo clone sourcecode68/Hashhack-crowdfunding-project

```bash
forge test
```

## 🔐 Security Considerations

- All funds are stored in smart contracts with public visibility.
- Only campaign owners can withdraw the amount raised and closed the contract
- Proper checks included to prevent reentrancy and overflows.



## ✨ Contributing

We welcome contributions! Please open an issue or submit a PR for improvements or bug fixes.

## 📜 License

This project is licensed under the MIT License.

## 🧗 Challenges We Encountered

- **Dynamic Solidity Versioning**: Adjusting and maintaining compatibility with evolving Solidity versions posed challenges, especially during contract compilation and deployment across different environments.
- **Framework Integration Complexity**: Integrating modern tools like **Vite** with **Ethers.js** was non-trivial due to limited documentation and fewer community resources, making the development workflow more intricate.
- **Limited Faucet Access**: Testing on Ethereum testnets was constrained by limited faucet availability, impacting the pace of development and thorough testing of transaction flows.

## Some Important Points
The Contract id of already contract is 0xaAaE531962533a505cF8254baCDBE89D43B37EAF.
