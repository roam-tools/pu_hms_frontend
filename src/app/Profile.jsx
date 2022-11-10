import {
  Avatar,
  Col,
  Form,
  Modal,
  Row,
  Input,
  Upload,
  Button,
  Space,
} from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import http from "../api";
import { Navbar } from "../components/navbar/Navbar";
import Spinner from "../components/spinner/Spinner";
// import profileData from "./profileData.json";

let formatCurrency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "GHS",
});

const { TextArea } = Input;

export const Profile = () => {
  const navigate = useNavigate();
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
        setProfileInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);

  const onCreate = async (values) => {
    try {
      if (modalTitle.toLowerCase() === "update profile") {
        await http.patch("student/update", values);
      } else if (modalTitle.toLowerCase() === "change password") {
        await http.post("student/password/change", values);
      } else {
        await http.post("student/complaint", values);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async () => {
    Modal.confirm({
      title: "Comfirm Booking",
      content: <p>Are you sure you want to cancel this booking!</p>,
      okText: "Yes",
      cancelText: "No",
      async onOk() {
        try {
          await http.get("booking/cancel");
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  const handleChange = (info) => {};

  const props = {
    name: "image",
    action: `${process.env.REACT_APP_BASE_URL}photo`,
    headers: {
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.getItem("userToken")),
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
        <div
          style={{ height: "100vh", display: "flex", flexDirection: "column" }}
        >
          <div
            className="puc-bg-white m-mb p-0"
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <Navbar className="container puc-navbar px-0" />
          </div>
          <div className="profile-container">
            <div className="intro-y profile-card">
              <div
                onClick={() => navigate(-1)}
                style={{ marginBottom: 20, cursor: "pointer" }}
              >
                {/* <i className="fa fa-arrow-left"></i> */}
                Go Back
              </div>
              <h2>{profileInfo.profile?.student_id}</h2>
              <Avatar src={profileInfo.profile?.image} size={100} />
              <h4>
                {profileInfo.profile?.first_name}{" "}
                {profileInfo.profile?.last_name}
              </h4>
              <p>{profileInfo.profile?.email_address}</p>
              <br />
              <div className="profile-actions">
                <Button
                  onClick={() => {
                    setModalTitle("update profile");
                    setVisible(true);
                  }}
                  className="profile-action-btn"
                  block
                >
                  Update Profile
                </Button>
                <Button
                  onClick={() => {
                    setModalTitle("change password");
                    setVisible(true);
                  }}
                  className="profile-action-btn"
                  block
                >
                  Change Password
                </Button>
                <Upload {...props} block>
                  <Button className="profile-action-btn" block>
                    Change Avatar
                  </Button>
                </Upload>
              </div>
            </div>
            <div className="intro-y booking-card">
              <div className="booking-content">
                {!profileInfo?.hasOwnProperty("booking") && (
                  <div className="no-booking-available">
                    <span className="my-booking-title">My booking</span>
                    <h3 className="empty-booking">No booking available</h3>
                  </div>
                )}

                {profileInfo?.booking?.payment_status === "PENDING" && (
                  <div className="booking-available">
                    <span className="my-booking-title">My booking</span>
                    <h4 className="booking-available-room">
                      {profileInfo.booking?.room}
                    </h4>
                    <p className="booking-available-hostel">
                      {profileInfo.booking?.hostel}
                    </p>
                    <h3 className="booking-available-bed">
                      {profileInfo.booking?.bed_id}{" "}
                      {profileInfo.booking?.bed_type}{" "}
                    </h3>
                    <br />
                    <span className="booking-available-expiration">
                      Expires at:{" "}
                      {moment(profileInfo.booking?.expires_at).format(
                        "DD-MM-YYYY hh:mm:s A"
                      )}
                    </span>
                    <br />
                    <br />
                  </div>
                )}

                {profileInfo?.booking?.payment_status === "COMPLETED" && (
                  <div className="booking-successful">
                    <div>
                      <span className="my-booking-title">My Room</span>
                      <h4 className="booking-successful-room-name">
                        {profileInfo.booking?.room}
                      </h4>
                      <p className="booking-successful-hostel">
                        {profileInfo.booking?.hostel}
                      </p>
                      <h5 className="booking-successful-bed">
                        {profileInfo.booking?.bed_id}{" "}
                        {profileInfo.booking?.bed_type}{" "}
                      </h5>
                    </div>

                    <div className="booking-success-room">
                      <Space>
                        <i className="fa fa-user"></i>{" "}
                        <span>{profileInfo.room?.capacity} IN A ROOM</span>
                      </Space>
                      <Space>
                        <i className="fa fa-bed"></i>{" "}
                        <span>
                          {profileInfo.room?.remaining}/
                          {profileInfo.room?.capacity} BEDS AVAILABLE
                        </span>
                      </Space>
                      <Space>
                        <i className="fa fa-credit-card"></i>{" "}
                        <span>
                          {formatCurrency.format(
                            profileInfo.room?.bed_price || 0
                          )}
                        </span>
                      </Space>
                      <Space>
                        <i className="fa fa-star"></i>{" "}
                        <span>{profileInfo.booking?.payment_status}</span>
                      </Space>
                    </div>
                  </div>
                )}
              </div>

              <hr></hr>

              <div className="booking-content">
                {profileInfo?.booking?.payment_status === "COMPLETED" && (
                  <div className="booking-successful-alt">
                    <div className="room-mates-row">
                      {profileInfo?.room?.mates?.map((mate, index) => (
                        <Fragment key={index}>
                          <Space>
                            <div>
                              <span>
                                <i className="fa fa-user-circle"> </i>{" "}
                                {mate.first_name} {mate.last_name} [
                                {mate.student_id}]
                              </span>
                            </div>
                          </Space>
                          <Space>
                            <div>
                              <a href={"tel:" + mate.phone_number}>
                                <Button
                                  className="mate-call-btn"
                                  icon={<i className="fa fa-phone"></i>}
                                >
                                  {mate.phone_number}
                                </Button>
                              </a>
                            </div>
                          </Space>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="booking-actions">
                {!profileInfo?.hasOwnProperty("booking") && (
                  <NavLink to="/">
                    <Button block size="large" className="booking-btn">
                      Book A Room
                    </Button>
                  </NavLink>
                )}
                {profileInfo.booking?.payment_status === "PENDING" && (
                  <Button
                    className="cancel-btn"
                    onClick={cancelBooking}
                    // disabled
                  >
                    CANCEL BOOKING
                  </Button>
                )}
                {profileInfo?.hasOwnProperty("room") && (
                  <Button
                    onClick={() => {
                      setModalTitle("complaint");
                      setVisible(true);
                    }}
                    block
                    size="large"
                    className="booking-btn"
                  >
                    Make Complaint
                  </Button>
                )}
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      )}
      <Modal
        title={modalTitle.toUpperCase()}
        visible={visible}
        onCancel={() => setVisible(false)}
        okText="Submit"
        centered={true}
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
          {modalTitle.toLocaleLowerCase() === "complaint" && (
            <Form.Item
              name="message"
              rules={[
                {
                  required: true,
                  message: "Please input your complaint!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Fragment>
  );
};
