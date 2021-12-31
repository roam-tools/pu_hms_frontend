import React from "react";
import "./hostel-detail.css";

const HostelDetail = (props) => {
  return (
    <div className="hostel-detail">
      <img src={props.hostelImage} alt="" className="hostel-image" />
      <div className="hostel-detail-right">
        <h2 className="hd">{props.hostelName}</h2>
        <div className="hostel-detail-items">
          <p>Price starts at:</p>
          <h1>
            GHS {props.startPrice} <p>Per bed/semester</p>
          </h1>
          <div className="info">
            <span>
              <i className="fa fa-user"></i>
              {props.gender}
            </span>
            <span>
              <i className="fa fa-door-open fa-sm"></i>
              {props.roomCount} Rooms
            </span>
          </div>
          <div className="hostel-detail-items-footer">
            <h2>Quick enquiry</h2>
            <a href={`tel:${props.telephone}`}>
              <i className="fa fa-phone"></i> {props.telephone}
            </a>
          </div>
        </div>
        <h2 className="facilities-header">Facilities</h2>
        <div className="facilities-body">
          {props.facilities?.length > 0 &&
            props.facilities?.map((facility, index) => {
              return (
                <span key={index}>
                  <i className="fa fa-check"></i> {facility}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HostelDetail;
