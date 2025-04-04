import React from "react";

const DonationBox = ({ openPopup }) => {
  return (
    <div className="donation-box">
      <button onClick={() => openPopup("donation")}>Donation History</button>
    </div>
  );
};

export default DonationBox;
