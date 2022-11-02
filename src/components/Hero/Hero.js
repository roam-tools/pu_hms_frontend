import React from "react";
import "./hero.css";
import { Navbar } from "../navbar/Navbar";

export const Hero = () => {
  return (
    <div className="puc-hero">
      <div style={{ paddingRight: 15 }}>
        <Navbar className="puc-navbar puc-bg-transparent" />
      </div>
      <div className="intro-y puc-hero-content">
        <p>
          Pentecost University Hostel
          <br />
          Portal
        </p>
      </div>
    </div>
  );
};
