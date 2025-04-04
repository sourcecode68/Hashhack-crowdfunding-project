// popups/ProfilePopup.jsx
import React from "react";

const ProfilePopup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Profile Info</h2>
        <p>This is your profile popup.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProfilePopup;
