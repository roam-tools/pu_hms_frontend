import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/images/PUC Campus IMG_9174.JPG";
import "./langing.css";

const Landing = () => {
  return (
    <Fragment>
      <div className="overlay">
        <div className="hero-text">
          <h1>PENTECOST UNIVERSITY HOSTELS</h1>
          <p>
            Find halls and hostels in and out of campus anytime from anywhere.
          </p>
        </div>
        <Link to="/hostels">Find Accommodation</Link>
      </div>
      <div className="landing">
        <img src={hero} alt="" className="hero-image" />
      </div>
    </Fragment>
  );
};

export default Landing;
