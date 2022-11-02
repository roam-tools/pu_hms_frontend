import { Alert, Button, Form, Input } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../../api";
import { setManager } from "../../slices/login";
import "./admin-login.css";

export const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdminLogin = async (values) => {
    try {
      setLoading(true);
      const response = await http.post("admin/login", values);
      sessionStorage.setItem("adminToken", JSON.stringify(response.data.token));
      dispatch(setManager(response.data.profile));
      setLoading(false);
      navigate("/admin/keys");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div>
            {error && <Alert message={error} style={{ textAlign: "center" }} />}
          </div>
          <Form
            name="admin-login"
            onFinish={handleAdminLogin}
            layout="vertical"
            size="large"
            requiredMark={false}
            style={{ width: "100%", marginTop: "20px" }}
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
                loading={loading}
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
