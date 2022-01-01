import React from "react";
import "./hostel.css";
import { Link } from "react-router-dom";

const Hostel = (props) => {
  return (
    <div className={`column ${props.classes}`}>
      <div className="hostel-card">
        {props.image}
        <div className="hostel-info">
          <h2>{props.name}</h2>
          <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
          {props.location}
          <br />
          <i className="fa fa-bed" aria-hidden="true"></i> {props.beds}{" "}
          Bedspaces
          <br />
          <i className="fa fa-home" aria-hidden="true"></i> {props.rooms} Rooms
          <br />
          <hr></hr>
          <div className="hostel-info-action">
            <div>
              Price starts at <br />
              <span>GHS {props.price_start}</span>
            </div>
            <Link to="/booking" onClick={props.getHostelId}>
              View more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hostel;
