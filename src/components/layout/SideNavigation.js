import React, {Fragment } from "react";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import {selectUser} from '../../features/authentication'

const SideNavigation = (props) => {

    const user = useSelector(selectUser)

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
        {user.role === 'admin' ?
        <li>
            <div className="nav-link-text">
                <Link to="hostels"><i className="fa fa-home"></i> Hostels</Link>
            </div>
        </li>:null}
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
        {user.role === 'admin' ?
        <Fragment>
        <li>
            <div className="nav-link-text">
                <Link to="porters"><i className="fa fa-user"></i> Porters</Link>
            </div>
        </li>
        <li>
            <div className="nav-link-text">
                <Link to="admins"><i className="fa fa-user"></i> Admins</Link>
            </div>
        </li>
        </Fragment>
        :null}
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
