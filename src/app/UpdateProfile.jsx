import { Form, Input } from "antd";
import React, { Fragment } from "react";
import { Navbar } from "../components/navbar/Navbar";

export const UpdateProfile = () => {
  return (
    <Fragment>
      <div
        className="puc-bg-white m-mb p-0"
        style={{ borderBottom: "1px solid #ccc" }}
      >
        <Navbar className="container puc-navbar px-0" />
      </div>
      <Form>
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input the first name!",
            },
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
      </Form>
    </Fragment>
  );
};
