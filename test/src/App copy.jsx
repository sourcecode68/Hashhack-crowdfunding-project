// src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { useFundMe } from "./useFundMe";
import CreateFundraiserPopup from "./components/createFundraiserPopup.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faStarOfLife,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const {
    account,
    connectWallet,
    contracts,
    fetchAllContracts,
    setSelectedContract,
    fundContract,
    getBalance,
    balance,
    createContract,
  } = useFundMe();

  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const handleClosePopup = () => setShowPopup(false);

  useEffect(() => {
    if (account) {
      fetchAllContracts();
    }
  }, [account]);

  const handleCreateFundraiser = async (data) => {
    const newAddr = await createContract(); // optional: save metadata in IPFS/backend
    alert(`Fundraiser created at ${newAddr}`);
    fetchAllContracts();
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
                <FontAwesomeIcon
                  className="xmark"
                  icon={faXmark}
                  onClick={handleClosePopup}
                />
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
                    Pellentesque risus dui, eleifend Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Pellentesque risus dui,
                    eleifend
                  </p>
                  <button className="Withdraw">Withdraw</button>
                </div>

                <button
                  className="close-btn"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <div className="body">
            <div className="overlay"></div>
            <div className="navbar">
              <FontAwesomeIcon
                icon={faStarOfLife}
                style={{ fontSize: "40px", color: "#ff7e1a" }}
              />

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
            {/* <h1 id="camp">LIVE CAMPAIGNS</h1> */}
            <div className="fund-win styled-scrollbar">
              {contracts.map((addr, index) => (
                <div className="card" key={index}>
                  <div className="image">
                    <img src="/images/disaster.jpeg" alt="disaster" />
                  </div>
                  <ul>
                    <li>Goal:</li>
                    <li>{addr.slice(0, 10)}...</li>
                  </ul>
                  <ul>
                    <li>Balance:</li>
                    <li>
                      <button
                        onClick={async () => {
                          setSelectedContract(addr);
                          await getBalance();
                        }}
                      >
                        Check
                      </button>
                      {balance && <span> {balance} ETH</span>}
                    </li>
                  </ul>
                  <div className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque risus dui, eleifend
                  </div>
                  <button
                    className="donate"
                    onClick={async () => {
                      setSelectedContract(addr);
                      await fundContract("0.01");
                    }}
                  >
                    Donate 0.01 ETH
                  </button>
                </div>
              ))}
            </div>
            {/* <h2 className="view">View More</h2> */}
          </div>

          {showCreatePopup && (
            <CreateFundraiserPopup
              onClose={() => setShowCreatePopup(false)}
              onSubmit={handleCreateFundraiser}
            />
          )}
        </div>
      )}
      {/* <footer class="footer">
        <div class="footer-bottom">
          <p>&copy; 2025 ReliefFund | All Rights Reserved</p>
        </div>
      </footer> */}
    </div>
  );
}

export default App;
