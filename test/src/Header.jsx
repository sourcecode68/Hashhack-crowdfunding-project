import React from "react";

const Header = ({ openPopup }) => {
  return (
    <div className="header">
      <button onClick={() => openPopup("profile")}>View Profile</button>
    </div>
  );
};

export default Header;
