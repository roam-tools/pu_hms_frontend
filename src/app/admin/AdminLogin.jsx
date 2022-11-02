import { Button, Form, Input } from "antd";
import React from "react";
import "./admin-login.css";

export const AdminLogin = () => {
  return (
    <div className="admin-login">
      <div className="admin-login-form">
        <div
          style={{
            background: "#04276c",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 30,
            color: "white",
          }}
        >
          ADMIN LOGIN
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <Form
            layout="vertical"
            size="large"
            requiredMark={false}
            style={{ width: "100%", marginTop: "50px" }}
          >
            <Form.Item
              name="email_address"
              label="E-mail address"
              rules={[
                {
                  required: true,
                  message: "Email address is required!",
                },
              ]}
            >
              <Input type="text" placeholder="E-mail address" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password is required!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                size="large"
                block
                type="primary"
                htmlType="submit"
                style={{ background: "#04276c" }}
              >
                LOGIN
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
