import React, { } from "react";
import { Link } from "react-router-dom";

const SideNavigation = (props) => {

  return (
    <div className="sidebar">
      <div className="logo-details">
        <span className="logo_name">PUHMS</span>
      </div>

      <ul className="nav-links">
        <li>
            <div className="nav-link-text">
                <Link to="/admin"><i className="fa fa-chart-line"></i> Dashboard</Link>
            </div>
        </li>
        <li>
            <div className="nav-link-text">
                <Link to="hostels"><i className="fa fa-home"></i> Hostels</Link>
            </div>
        </li>
        <li>
            <div className="nav-link-text">
                <Link to="rooms"><i className="fa fa-door-open"></i> Rooms</Link>
            </div>
        </li>
        <li>
            <div className="nav-link-text">
                <Link to="bookings"><i className="fa fa-book"></i> Bookings</Link>
            </div>
        </li>
        <li>
            <div className="nav-link-text">
                <Link to="students"><i className="fa fa-user"></i> Students</Link>
            </div>
        </li>
        <li>
            <div className="nav-link-text">
                <Link to="complaints"><i className="fa fa-box"></i> Complaints</Link>
            </div>
        </li>
        <li>
            <div className="nav-link-text">
                <Link to="payments"><i className="fa fa-money-check"></i> Payments</Link>
            </div>
        </li>
      </ul>
    </div>
  );
};

export default SideNavigation;
