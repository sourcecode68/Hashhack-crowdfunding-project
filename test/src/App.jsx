import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { useFundMe } from "./useFundMe";
import CreateFundraiserPopup from "./components/createFundraiserPopup.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function App() {
  const {
    account,
    connectWallet,
    fetchAllContracts,
    setSelectedContract,
    fundContract,
    getBalance,
    balance,
    createContract,
  } = useFundMe();

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [contractDetails, setContractDetails] = useState([]);

  const fetchContractDetailsFromBackend = async (address) => {
    try {
      const res = await fetch(`http://localhost:5000/contract-details?address=${address}`);
      const data = await res.json();
      return {
        address,
        title: data.title || "",
        description: data.description || "",
        goal: data.goal || "",
        image: data.image || "/images/disaster.jpeg"
      };
    } catch (err) {
      console.error(`Failed to fetch details for ${address}`, err);
      return {
        address,
        title: "",
        description: "",
        image: "/images/disaster.jpeg",
      };
    }
  };

  const loadAllContracts = async () => {
    try {
      const addresses = await fetchAllContracts();
      const detailsPromises = addresses.map((addr) => fetchContractDetailsFromBackend(addr));
      const allDetails = await Promise.all(detailsPromises);
      setContractDetails(allDetails);
    } catch (error) {
      console.error("Error loading contracts:", error);
    }
  };

  useEffect(() => {
    if (account) {
      loadAllContracts();
    }
  }, [account]);

  const handleCreateFundraiser = async (data) => {
    const newAddr = await createContract();
    alert(`Fundraiser created at ${newAddr}`);
    loadAllContracts(); // refresh list
  };

  return (
    <div>
      {!account ? (
        <div className="wallet-overlay">
          <h2>Welcome to My Platform</h2>
          <p>Please connect your MetaMask wallet to continue</p>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      ) : (
        <div className="main-platform">
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <div className="image">
                  <img src="/images/disaster.jpeg" alt="disaster" />
                </div>
                <div id="overlay-text">
                  <h1>Title</h1>
                  <ul>
                    <li>Goal:</li>
                    <li>3000</li>
                  </ul>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque risus dui, eleifend
                  </p>
                  <button className="Withdraw">Withdraw</button>
                </div>
                <button className="close-btn" onClick={() => setShowPopup(false)}>
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="body">
            <div className="overlay"></div>
            <div className="navbar">
              <img src="" alt="" />
              <ul>
                <li>Home</li>
                <li>About</li>
                <li>Team</li>
                <li>Contact Us</li>
              </ul>
              <div className="buttons">
                <button id="login" onClick={() => setShowCreatePopup(true)}>
                  Start A Fundraiser
                </button>
                <button id="login" onClick={() => setShowPopup(true)}>
                  Profile
                </button>
              </div>
            </div>

            <div className="title">
              <h1 id="title">
                Help those who <span className="need">NEED</span> your support.
              </h1>
              <p className="para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque risus dui, eleifend
              </p>
              <button className="donate">
                Donate Now{" "}
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  style={{ marginLeft: "12px" }}
                />
              </button>
            </div>

            <div className="fund-win hide-scrollbar">
              {contractDetails
                .filter((contract) => contract.title && contract.title !== "Untitled")
                .map((contract, index) => (
                  <div className="card" key={index}>
                    <div className="image">
                      <img
                        src={contract.image || "/images/disaster.jpeg"}
                        alt={contract.title}
                      />
                    </div>
                    <ul>
                      <li><strong>Title:</strong> {contract.title}</li>
                    </ul>
                    <ul>
                      <li><strong>Address:</strong> {contract.address?.slice(0, 10)}...</li>
                    </ul>
                    <ul>
                      <li>
                        <strong>Balance:</strong>
                        <button
                          onClick={async () => {
                            setSelectedContract(contract.address);
                            await getBalance();
                          }}
                          style={{ marginLeft: "10px" }}
                        >
                          Check
                        </button>
                        {balance && <span> {balance} ETH</span>}
                      </li>
                    </ul>
                    <p className="text">
                      {contract.description || "No description provided."}
                    </p>
                    <button
                      className="donate"
                      onClick={async () => {
                        setSelectedContract(contract.address);
                        await fundContract("0.01");
                      }}
                    >
                      Donate 0.01 ETH
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {showCreatePopup && (
            <CreateFundraiserPopup
              onClose={() => setShowCreatePopup(false)}
              onSubmit={handleCreateFundraiser}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
