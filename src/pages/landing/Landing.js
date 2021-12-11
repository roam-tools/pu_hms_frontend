import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/images/PUC Campus IMG_9174.JPG";
import "./langing.css";

const Landing = () => {
  return (
    <Fragment>
      <div className="overlay">
        <div className="hero-text">
          <h1>PENTECOST UNIVERSITY HOSTEL</h1>
          <p>
            We are offering over a 100 hostel facilities, 2000 rooms in an all
            round safe, serene, and hygienic environment for a sound mind.
          </p>
        </div>
<<<<<<< HEAD
            <Link to="/booking">Book Now</Link>
=======
            <Link to="/hostels">HOSTELS</Link>
>>>>>>> dc7ef1e53beaa411b6a878ec326d3148f2e61b6b
      </div>
      <div className="landing">
        <img src={hero} alt="" className="hero-image" />
      </div>
    </Fragment>
  );
};

export default Landing;
