import { Alert, Button, Card, Form, Input } from "antd";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import http from "../api";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPassword = async (values) => {
    setError("");
    try {
      setLoading(true);
      const response = await http.post("student/password/request", values);
      navigate("/login");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("We could not process your request! Please try again.");
      console.log(error.message);
    }
  };
  return (
    <div className="intro-y forgot-password">
      <Card
        title={
          <div style={{ textAlign: "center" }}>
            <NavLink to="/">
              <img
                src="/dist/images/logo2.png"
                alt="logo"
                width={50}
                className="intro-y"
              />
            </NavLink>
            <h3 style={{ margin: 0, marginTop: 15 }} className="intro-y">
              LOGIN
            </h3>
          </div>
        }
        style={{
          width: 500,
          borderRadius: "10px",
          minHeight: 350,
        }}
      >
        <h3 style={{ textAlign: "center" }}>RESET PASSWORD</h3>
        <p style={{ textAlign: "center" }}>
          Please provide us with your email address.
        </p>
        <Form
          name="forgot-password-form"
          layout="vertical"
          size="large"
          onFinish={handleForgotPassword}
        >
          <Form.Item
            label=""
            name="email_address"
            rules={[
              {
                required: true,
                message: "Please input your email address!",
              },
            ]}
          >
            <Input type="email" placeholder="Email address" />
          </Form.Item>
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ margin: "10px 0", textAlign: "center" }}
            />
          )}
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="w-100"
            >
              RESET PASSWORD
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
