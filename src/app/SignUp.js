import { Card, Col, Form, Input, Row, Select, Button, Alert } from "antd";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import http from "../api";

const { Option } = Select;

export const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (values) => {
    console.log(values);
    setError("");
    try {
      setLoading(true);
      await http.post("student/signup", {
        ...values,
        phone_number: `+${values.phone_number}`,
      });
      navigate("/login");
      // setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error.response.data.message);
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
              SIGN UP
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
          onFinish={handleSignup}
        >
          <Row gutter={24}>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                label=""
                name="first_name"
                className="intro-y"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input placeholder="First name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                label=""
                name="last_name"
                className="intro-y"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input placeholder="Last name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label=""
            name="gender"
            className="intro-y"
            rules={[
              {
                required: true,
                message: "Please input your gender!",
              },
            ]}
          >
            <Select placeholder="Gender">
              <Option value="MALE">Male</Option>
              <Option value="FEMALE">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label=""
            name="student_id"
            className="intro-y"
            rules={[
              {
                required: true,
                message: "Please input your student id!",
              },
            ]}
          >
            <Input placeholder="Student ID" />
          </Form.Item>
          <Form.Item
            label=""
            name="phone_number"
            className="intro-y"
            rules={[
              {
                required: true,
                message: "Please input your phone_number!",
              },
            ]}
          >
            {/* <Tooltip title="Telephone number format 2332000001"> */}
            <Input
              type="number"
              placeholder="2332000001"
              className="w-100"
              controls={false}
            />
            {/* </Tooltip> */}
          </Form.Item>
          <Form.Item
            label=""
            name="email_address"
            className="intro-y"
            rules={[
              {
                required: true,
                message: "Please input your email address!",
              },
            ]}
          >
            <Input placeholder="Email address" />
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
              SIGNU UP
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            Have an account already? <Link to="/login">Log in</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
