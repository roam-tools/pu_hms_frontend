import React from "react";
import "./hostel-manager.css";

const HostelManager = (props) => {
  return (
    <div className="manager-profile">
      <div className="manager-info">
        <img src={props.avatar} alt="manager" className="manager-image" />
        <p className="profile-name">{props.name}</p>
      </div>
      <p className="profile">
        {props.profile}
      </p>
    </div>
  );
};

export default HostelManager;
