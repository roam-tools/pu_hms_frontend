import { Button, Card, Space } from "antd";
import React, { Fragment } from "react";
import "./hostel.css";
import ProgressiveImage from "react-progressive-graceful-image";

let formatCurrency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "GHS",
});

export const HostelDetail = ({ data, facilities }) => {
  return (
    <Fragment>
      <h1 className="hostel-name">{data?.name}</h1>
      <div className="hostel-detail">
        <Card
          className="h-hostel-card intro-y"
          bodyStyle={{ padding: 0 }}
          style={{ border: "none" }}
        >
          <ProgressiveImage
            src={data?.image}
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
        <Card className="h-card  intro-y" bodyStyle={{ padding: 0 }}>
          <h4 style={{ fontSize: 30 }}>{data?.name}</h4>
          <p>{data?.description}</p>
          <br />

          <p>Price starts at:</p>
          <h5>{formatCurrency.format(data?.bed_price || 0)}</h5>
          <p>per bed/semester</p>

          <br />
          <Space size="large">
            <Space>
              <i className="fa fa-user fa-lg"></i>
              <span>{data?.gender}</span>
            </Space>
            <Space>
              <i className="fa fa-door-open fa-lg"></i>
              <span>{data?.room_count} is available</span>
            </Space>
          </Space>

          <br />
          <br />
          <div className="facilities">
            <span>{facilities?.map((item) => item + ", ")}</span>
          </div>

          <br />
          <a href={"tel:" + data?.phone_number}>
            <Button
              size="large"
              className="quick-enquiry-btn"
              block
              icon={<i className="fa fa-phone"></i>}
            >
              {data?.phone_number}
            </Button>
          </a>
        </Card>
      </div>
    </Fragment>
  );
};
