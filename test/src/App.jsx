import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error("User rejected request:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask extension.");
    }
  };

  return (
    <div>
      {!walletConnected ? (
        <div className="wallet-overlay ">
          {/* <div className="overlay"></div> */}
          <h2>Welcome to My Platform</h2>
          <p>Please connect your MetaMask wallet to continue</p>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      ) : (
        <div className="main-platform">
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
              <button id="login">Login</button>
            </div>

            <div className="title">
              <h1 id="title">
                Help those who <span className="need">NEED</span> your support.
              </h1>
              <p className="para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque risus dui, eleifend
              </p>
              <button id="donate">Donate Now</button>
            </div>

            <div className="fund-win">
              <div className="card">
                <div className="image">
                  <img src="/images/disaster.jpeg" alt="" />
                </div>
                <ul>
                  <li>Goal:</li>
                  <li></li>
                </ul>
                <ul>
                  <li>Raised:</li>
                  <li></li>
                </ul>
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque risus dui, eleifend
                </div>
                <button className="donate">Donate</button>
              </div>
              <div className="card">
                <div className="image">
                  <img src="/images/disaster.jpeg" alt="" />
                </div>
                <ul>
                  <li>Goal:</li>
                  <li></li>
                </ul>
                <ul>
                  <li>Raised:</li>
                  <li></li>
                </ul>
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque risus dui, eleifend
                </div>
                <button className="donate">Donate</button>
              </div>
              <div className="card">
                <div className="image">
                  <img src="/images/disaster.jpeg" alt="" />
                </div>
                <ul>
                  <li>Goal:</li>
                  <li></li>
                </ul>
                <ul>
                  <li>Raised:</li>
                  <li></li>
                </ul>
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque risus dui, eleifend
                </div>
                <button className="donate">Donate</button>
              </div>
            </div>
            <h2 className="view">View More</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
