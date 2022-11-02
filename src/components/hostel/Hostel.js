import { Card } from "antd";
import React from "react";
// import { VisibilityContext } from "react-horizontal-scrolling-menu";
import ProgressiveImage from "react-progressive-graceful-image";
import { NavLink } from "react-router-dom";
import "./hostel.css";

export const Hostel = ({ hostel, selected, scrol = null }) => {
  const { id, name, location, image } = hostel;

  return (
    <NavLink to={`/hostel/${id}`}>
      <Card
        bordered={false}
        bodyStyle={{ padding: 0 }}
        className="intro-y puc-hostel"
      >
        <div className="overlay">
          <div className="puc-hostel-info">
            <h4 className="intro-y">{name}</h4>
            <h6 className="intro-y">{location}</h6>
          </div>
        </div>
        <ProgressiveImage
          src={image}
          placeholder="/dist/images/placeholder.gif"
        >
          {(src, loading) => (
            <img
              src={src}
              alt="hostel"
              className="puc-hostel-image"
              style={{ opacity: loading ? 0.5 : 1, borderRadius: 5 }}
            />
          )}
        </ProgressiveImage>
      </Card>
    </NavLink>
  );
};
