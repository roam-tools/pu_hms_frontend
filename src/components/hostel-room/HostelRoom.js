import React from "react";
import { Link } from "react-router-dom";
import "./hostel-room.css";

const HostelRoom = (props) => {
  return (
    <div className="room">
      <h2 className="room-no">{props.roomId}</h2>
      <span>
        <i className="fa fa-gift"></i>
        {props.facilities}
      </span>
      <span>
        <i className="fa fa-user"></i>
        {props.gender}
      </span>
      <span>
        <i className="fa fa-bed"></i>
        {props.capacity} in a room ({props.available} beds left)
      </span>
      <hr></hr>
      <div className="room-footer">
        <div>
          Price for bed/semester
          <h2>GHS {props.bedPrice}</h2>
        </div>
        <Link to="/booking" onClick={props.bookNow}>
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default HostelRoom;
