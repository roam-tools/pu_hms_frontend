import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-page">
      <div className = "hero-text">
        <h1>PENTECOST UNIVERSITY HOSTEL</h1>
        <p>
          We are offering over a 100 hostel facilities, 2000 rooms in an all
          round safe, serene, and hygienic environment for a sound mind.
        </p>
        <br />
        <br />
        <br />
        <Link to="/featured/hostels">Featured Hostels</Link>
      </div>
    </div>
    </div>
  );
};

export default Landing;
