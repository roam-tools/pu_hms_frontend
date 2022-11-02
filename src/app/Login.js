import { Card, Form, Input, Button, Alert } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import http from "../api";
import { setStudent } from "../slices/login";

export const Login = () => {
  const { state } = useLocation();
  console.log(state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    setError("");
    try {
      setLoading(true);
      const response = await http.post("student/login", values);
      sessionStorage.setItem("userToken", JSON.stringify(response.data.token));
      dispatch(setStudent(response.data.profile));
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      setError("We could not process your request! Please try again.");
      console.log(error.message);
    }
  };

  return (
    <div className="signup">
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
        <Form
          name="signup-form"
          layout="vertical"
          size="large"
          onFinish={handleLogin}
        >
          <Form.Item
            label=""
            name="student_id"
            rules={[
              {
                required: true,
                message: "Please input your student id!",
              },
            ]}
          >
            <Input placeholder="Student Id" />
          </Form.Item>
          <Form.Item
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ margin: "10px 0", textAlign: "center" }}
            />
          )}
          <Form.Item className="intro-y">
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="w-100"
            >
              LOGIN
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Link to="/forgot-password">Forgot password?</Link>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
