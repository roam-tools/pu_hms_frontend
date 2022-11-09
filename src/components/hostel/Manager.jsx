import { Avatar, Button, Card } from "antd";
import React from "react";
import "./hostel.css";

export const Manager = ({ data, hostel }) => {
  return (
    <Card className="manager intro-y" bodyStyle={{ padding: 0 }}>
      <div className="m-overlay"></div>
      <img src={hostel?.image} alt="hostel" className="manager-bg" />
      <div className="manager-detail intro-y">
        <h3 className="intro-y">MANAGER</h3>
        <Avatar src={data?.image} size={90} className="intro-y" />
        <h4 className="intro-y">
          {data?.first_name} {data?.last_name}
        </h4>
        <p className="intro-y">{data?.email_address}</p>
        <a href={"tel:" + data?.phone_number}>
          <Button
            size="large"
            type="primary"
            icon={<i className="fa fa-phone"></i>}
            className="manager-call-btn intro-y"
          >
            {data?.phone_number}
          </Button>
        </a>
      </div>
    </Card>
  );
};
