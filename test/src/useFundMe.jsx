// src/hooks/useFundMe.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { factoryAbi, factoryContractAddress, fundMeAbi } from "./constants.js";

export function useFundMe() {
  const [selectedContract, setSelectedContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [myContracts, setMyContracts] = useState([]);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    fetchAllContracts();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        return accounts[0];
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to continue.");
    }
  };

  const getProviderAndSigner = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return { provider, signer };
  };

  const createContract = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const factoryContract = new ethers.Contract(
      factoryContractAddress,
      factoryAbi,
      signer
    );

    try {
      const tx = await factoryContract.create();
      const receipt = await tx.wait(1);

      const iface = new ethers.Interface(factoryAbi);
      let newContractAddress = null;

      for (const log of receipt.logs) {
        try {
          const parsedLog = iface.parseLog(log);
          if (parsedLog.name === "FundMeCreated") {
            newContractAddress = parsedLog.args.contractAddress; // or parsedLog.args[1]
            break;
          }
        } catch (err) {
          continue;
        }
      }

      if (newContractAddress) {
        console.log(`✅ New contract at: ${newContractAddress}`);
        await fetchAllContracts();
        return newContractAddress;
      } else {
        return "0x0";
        console.error("❌ FundMeCreated event not found in logs.");
      }
    } catch (err) {
      return "0x0";
      console.error("Contract creation error:", err);
    }
  };

  const fetchAllContracts = async () => {
    try {
      const { signer } = await getProviderAndSigner();
      const factoryContract = new ethers.Contract(
        factoryContractAddress,
        factoryAbi,
        signer
      );
      const all = await factoryContract.getAllContracts();
      setContracts([...all]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserContracts = async () => {
    try {
      const { signer } = await getProviderAndSigner();
      const userAddress = await signer.getAddress();
      const factoryContract = new ethers.Contract(
        factoryContractAddress,
        factoryAbi,
        signer
      );
      const proxy = await factoryContract.getUserContracts(userAddress);
      const mine = Array.from(proxy);
      setMyContracts(mine);
    } catch (err) {
      console.error(err);
    }
  };

  const fundContract = async (ethAmount) => {
    if (!selectedContract) return alert("Select a contract first!");
    try {
      const { signer } = await getProviderAndSigner();
      const contract = new ethers.Contract(selectedContract, fundMeAbi, signer);
      const tx = await contract.fund({ value: ethers.parseEther(ethAmount) });
      await tx.wait(1);
    } catch (err) {
      console.error(err);
      if (err.reason?.includes("didnt send enough eth")) {
        alert("Not enough ETH sent!");
      }
    }
  };

  const withdrawFunds = async () => {
    if (!selectedContract) return alert("Select a contract first!");
    try {
      const { signer } = await getProviderAndSigner();
      const contract = new ethers.Contract(selectedContract, fundMeAbi, signer);
      const owner = await contract.owner();
      const user = await signer.getAddress();
      if (owner.toLowerCase() !== user.toLowerCase()) {
        alert("You are not the owner!");
        return;
      }
      const tx = await contract.withdraw();
      await tx.wait(1);
    } catch (err) {
      console.error(err);
    }
  };

  const getBalance = async () => {
    if (!selectedContract) return;
    try {
      const { provider } = await getProviderAndSigner();
      const bal = await provider.getBalance(selectedContract);
      const ethBalance = ethers.formatEther(bal);
      setBalance(ethBalance);
      return ethBalance;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    account,
    connectWallet,
    createContract,
    fetchAllContracts,
    fetchUserContracts,
    fundContract,
    withdrawFunds,
    getBalance,
    selectedContract,
    setSelectedContract,
    contracts,
    myContracts,
    balance,
  };
}
