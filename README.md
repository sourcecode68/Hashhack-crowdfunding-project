# 🚀 Web3 DApp Crowdfunding Platform

A decentralized crowdfunding application built on the Ethereum blockchain using smart contracts. This platform allows users to create and contribute to fundraising campaigns securely and transparently.

## 🧠 Features

- 📦 Create and manage crowdfunding campaigns on-chain
- 💰 Donate using MetaMask or any Ethereum wallet
- 🔍 View all active campaigns
- 🔗 Fully decentralized, transparent and censorship-resistant
- 📈 Campaign stats like raised amount, goal, contributors
- 🛡️ Smart contract handles fund storage and withdrawal

## 📂 Project Structure

```
├── client/               # Frontend (React/Next.js/Vite etc.)
├── contracts/            # Solidity Smart Contracts
├── scripts/              # Deployment and interaction scripts
├── test/                 # Smart contract tests
├── hardhat.config.js     # Hardhat configuration
└── README.md
```

## 🛠️ Tech Stack

- **Solidity** – Smart contract development
- **Hardhat** – Development and testing framework
- **React.js / Next.js / Vite** – Frontend UI
- **Ethers.js / Web3.js** – Ethereum JavaScript API
- **MetaMask** – Wallet integration
- **IPFS (optional)** – Decentralized storage for campaign metadata/images

## 🚧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/web3-crowdfunding-dapp.git
cd web3-crowdfunding-dapp
```

### 2. Install Dependencies

```bash
npm install
```

Or if using Hardhat and separate frontend:

```bash
cd contracts/
npm install
cd ../client/
npm install
```

### 3. Compile Smart Contracts

```bash
npx hardhat compile
```

### 4. Deploy to Local or Testnet

```bash
npx hardhat run scripts/deploy.js --network localhost
# or testnet like Goerli
npx hardhat run scripts/deploy.js --network goerli
```

### 5. Run Frontend

```bash
cd client/
npm start
```

## 🧪 Testing

Run smart contract tests with:

```bash
npx hardhat test
```

## 🔐 Security Considerations

- All funds are stored in smart contracts with public visibility.
- Only campaign owners can withdraw funds upon reaching the goal.
- Proper checks included to prevent reentrancy and overflows.

## 🌐 Demo

[🔗 Live Demo](https://your-deployed-url.com)

## ✨ Contributing

We welcome contributions! Please open an issue or submit a PR for improvements or bug fixes.

## 📜 License

This project is licensed under the MIT License.

---

Made with ❤️ by [Your Name / Team Name]
