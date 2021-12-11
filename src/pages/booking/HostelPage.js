import React from "react";
import Card from "../../components/card/Card.js";
import heroHostel from "../../assets/images/PUC Campus IMG_9174.JPG";
import "./hostel-page.css";
import { Link } from "react-router-dom";
import Hostel from "../../components/hostel/Hostel";
import RoomCard from "../../components/card/RoomCard.js";

const HostelPage = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="hostel-page">
          <h2>Hostel Name</h2>
          <div className="hostel-page-header">
            <img src={heroHostel} alt="" className="imgHostel" />
            <div className="hostel-page-info">
              <Card>
                <div className="card-content-wrap">
                  <p>
                    Price starts at:
                    <br />
                    <span>GHS 1,500</span>
                    <br /> <small>per bed/semester</small>
                  </p>
                  <br />
                  <i class="fa fa-user" aria-hidden="true"></i> Males
                  <br />
                  <i class="fa fa-home" aria-hidden="true"></i> 50 rooms
                  available
                  <br />
                  <br />
                  <div className="hostel-content-wrapper-action">
                    <span>
                      <strong>Quick enquiry</strong>
                    </span>
                    <Link to="/hostel">
                      <i className="fa fa-phone"></i>0500144870
                    </Link>
                  </div>
                </div>
              </Card>
              <br />
              <Card>
                <h3 className="hostel-hightlight">Hostel Highlights</h3>
                <div className="highlights">
                  <span>
                    <i className="fa fa-check"></i> Security cameras
                  </span>
                  <span>
                    <i className="fa fa-check"></i> Car pack
                  </span>
                  <span>
                    <i className="fa fa-check"></i> Basket ball court
                  </span>
                  <span>
                    <i className="fa fa-check"></i> Basket ball court
                  </span>
                  <span>
                    <i className="fa fa-check"></i> Basket ball court
                  </span>
                  <span>
                    <i className="fa fa-check"></i> Basket ball court
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="hostel-rooms">
          <h1 className="rooms-available">ROOMS AVAILABLE</h1>
          <div className="rooms-wrap">
              <RoomCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelPage;
