import React from "react";

const Dashboard = ({ openPopup }) => {
  return (
    <div className="dashboard">
      <button onClick={() => openPopup("account")}>View Account</button>
    </div>
  );
};

export default Dashboard;
