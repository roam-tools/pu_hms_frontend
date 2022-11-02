import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Modal,
  Row,
  Input,
  Upload,
} from "antd";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import http from "../api";
import { Navbar } from "../components/navbar/Navbar";
import Spinner from "../components/spinner/Spinner";

let formatCurrency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "GHS",
});

export const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const response = await http.get("student/profile", {
          retry: 50,
          retryDelay: 3000,
        });
        console.log("profile info>>>>>>>>", response.data);
        setProfileInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // setError(error.message);
      }
    };
    getProfile();
  }, []);

  const onCreate = async (values) => {
    try {
      if (modalTitle.toLowerCase() === "update profile") {
        await http.patch("student/update", values);
      } else {
        await http.post("student/password/change", values);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (info) => {};

  const props = {
    action: `${process.env.REACT_APP_BASE_URL}photo`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("userToken")),
    },
    onChange: handleChange,
    multiple: false,
    showUploadList: false,
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div
            className="puc-bg-white m-mb p-0"
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <Navbar className="container puc-navbar px-0" />
          </div>
          <h3 style={{ margin: "20px 0", textAlign: "center" }}>PROFILE</h3>
          <div className="container profile-details p-0">
            <Card
              title={profileInfo?.profile?.student_id || "Student Id"}
              className="intro-y"
              actions={[
                <div
                  onClick={() => {
                    setModalTitle("Update Profile");
                    setVisible(true);
                  }}
                  style={{ display: "grid", gridTemplateColumns: "1fr" }}
                >
                  <div>
                    <i className="fa fa-edit"></i>
                  </div>
                  <div>Profile</div>
                </div>,
                <div
                  onClick={() => {
                    setModalTitle("change password");
                    setVisible(true);
                  }}
                  style={{ display: "grid", gridTemplateColumns: "1fr" }}
                >
                  <div>
                    <i className="fa fa-lock"></i>
                  </div>
                  <div>Password</div>
                </div>,
                <Upload {...props}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                    <div>
                      <i className="fa fa-image"></i>
                    </div>
                    <div>Avatar</div>
                  </div>
                </Upload>,
              ]}
              style={{ textAlign: "center", height: "auto" }}
              bodyStyle={{ height: "340px" }}
            >
              <Avatar src={profileInfo.profile?.image} size={100} />
              <h4>
                {profileInfo?.profile?.first_name}{" "}
                {profileInfo?.profile?.last_name}
              </h4>
              <p>{profileInfo?.profile?.email_address}</p>
            </Card>
            <Card className="booking-info intro-y">
              {Object.keys(profileInfo).length < 0 ? (
                <Empty
                  imageStyle={{
                    height: "100%",
                  }}
                  description={
                    <p>
                      You have no bookings yet. <br />
                      Our booking process is made easy.
                    </p>
                  }
                >
                  <Button type="primary">
                    <NavLink to="/">BOOK NOW</NavLink>
                  </Button>
                </Empty>
              ) : (
                <Fragment>
                  <div className="p-overlay"></div>
                  {/* <img src="" alt="hostel" /> */}
                  <div className="booking-room-detail">
                    <div>
                      <h2 className="room-hostel-name">
                        {profileInfo.profile?.hostel?.name || "HOSTEL"}
                      </h2>
                      <h4 className="room-name">
                        {profileInfo.room?.room_id || "ROOM"}
                      </h4>
                      <h6 className="room-bed-detail">
                        {profileInfo.bed?.bed_id || "BED A"}{" "}
                        {profileInfo.bed?.bed_type || "TOP"}
                      </h6>
                    </div>
                    <div className="room-group" style={{ marginTop: 34 }}>
                      <div className="my-room-info">
                        <i className="fa fa-bed fa-lg"></i>
                        <p>{profileInfo.room?.capacity} in a room</p>
                      </div>
                      <div className="my-room-info">
                        <i className="fa fa-door-open fa-lg"></i>
                        <p>
                          {profileInfo.room?.remaining || 0} /{" "}
                          {profileInfo.room?.capacity || 0} beds remaining
                        </p>
                      </div>
                      <div className="my-room-info">
                        <i className="fa fa-credit-card fa-lg"></i>
                        <p>
                          {formatCurrency.format(
                            profileInfo.room?.bed_price || 0
                          )}
                        </p>
                      </div>
                      <div className="my-room-info">
                        <i className="fa fa-star fa-lg"></i>
                        <p>{profileInfo.booking?.payment_status || "PAID"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="room-mate">
                    <p
                      style={{
                        margin: 0,
                        marginTop: 20,
                        color: "white",
                      }}
                    >
                      ROOM MATES
                    </p>
                    {profileInfo.room?.mates.map((mate, index) => (
                      <div key={index} className="room-room-info">
                        <i className="fa fa-user fa-lg"></i>
                        <p className="room-mate-name">
                          {mate.first_name} {mate.last_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </Fragment>
              )}
            </Card>
          </div>
        </Fragment>
      )}
      <Modal
        title={modalTitle.toUpperCase()}
        visible={visible}
        onCancel={() => setVisible(false)}
        okText="Submit"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        destroyOnClose={true}
      >
        <Form
          form={form}
          layout="vertical"
          name="profile-manager"
          initialValues={profileInfo.profile}
          requiredMark={false}
          size="large"
          preserve={false}
        >
          {modalTitle.toLowerCase() === "change password" && (
            <>
              <Form.Item
                name="old_password"
                // label="Current Password"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <Input.Password placeholder="Current Password" />
              </Form.Item>
              <Form.Item
                name="new_password"
                // label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <Input.Password placeholder="New Password" />
              </Form.Item>
            </>
          )}
          {modalTitle.toLowerCase() === "update profile" && (
            <Fragment>
              <Row
                gutter={{
                  xs: 24,
                  sm: 24,
                  lg: 12,
                }}
              >
                <Col xs={24} sm={24} lg={12}>
                  <Form.Item
                    name="first_name"
                    // label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the first name!",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={12}>
                  <Form.Item
                    name="last_name"
                    // label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row
                gutter={{
                  xs: 24,
                  sm: 24,
                  lg: 12,
                }}
              >
                <Col xs={24} sm={24} lg={12}>
                  <Form.Item
                    name="phone_number"
                    // label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input the phone number!",
                      },
                    ]}
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={12}>
                  <Form.Item
                    name="email_address"
                    // label="Email Address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email address!",
                      },
                    ]}
                  >
                    <Input type="email" placeholder="Email Address" />
                  </Form.Item>
                </Col>
              </Row>
            </Fragment>
          )}
        </Form>
      </Modal>
    </Fragment>
  );
};
