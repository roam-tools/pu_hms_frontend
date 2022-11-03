import { Avatar, Button, Card } from "antd";
import React from "react";
import "./hostel.css";

export const Manager = ({ data }) => {
  console.log(data)
  return (
    <Card className="manager intro-y" bodyStyle={{ padding: 0 }}>
      <div className="m-overlay"></div>
      <img src={data?.image} alt="hostel" />
      <div className="manager-detail intro-y">
        <h3 className="intro-y">MANAGER</h3>
        <div className="avatar intro-y">
          <Avatar src={data?.image} size={90} />
        </div>
        <h4 className="intro-y">{data?.name}</h4>
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
