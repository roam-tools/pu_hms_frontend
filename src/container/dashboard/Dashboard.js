import { Card, Col, Image, Row, Button, Avatar, Pagination, Select, Space, PageHeader, Modal, Form, Input, Upload, Empty, Alert } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React, { Fragment, useEffect, useState } from 'react'
import './dashboard.css'
import hostelImg from '../../assets/images/puc-campus.jpg'
import http from '../../api';
import { useSetError } from '../../context/ErrorContext';
import { Widget } from '../../components/widget/Widget'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import Countdown from "react-countdown";
import ProgressiveImage from 'react-progressive-graceful-image'

import placeholder from '../../assets/images/placeholder.gif'


const { Option } = Select


let newDate = new Date();
let newStamp = newDate.getTime();

let formatCurrency = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'GHS'
});

export const Dashboard = () => {

  const setError = useSetError()

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [modalTitle, setModalTitle] = useState("")
  const [expireCounter, setExpireCounter] = useState(0)
  const [myBooking, setMyBooking] = useState({})
  const [profileLoading, setProfileLoading] = useState(true)


  useEffect(() => {
    const getProfile = async () => {
      try {
        setProfileLoading(true)
        const response = await http.get('student/profile', { retry: 50, retryDelay: 3000 })
        console.log(response.data)

        setMyBooking(response.data)
        setProfileLoading(false)
      } catch (error) {
        console.log(error)
        setError(error.message)
      }
    }
    getProfile()
  }, [setError])

  const expireCounterFunc = (startStamp) => {    
    console.log(moment(startStamp).unix())
    newDate = new Date();
    newStamp = newDate.getTime();
    var diff = Math.round((newStamp - moment(startStamp).unix()) / 1000);

    var d = Math.floor(diff / (24 * 60 * 60));
    diff = diff - (d * 24 * 60 * 60);
    var h = Math.floor(diff / (60 * 60));
    diff = diff - (h * 60 * 60);
    var m = Math.floor(diff / (60));
    diff = diff - (m * 60);
    var s = diff;

    setExpireCounter(d + " day(s), " + h + " hour(s), " + m + " minute(s), " + s + " second(s) working")

  }

  const onCreate = async (values) => {
    try {
      if (modalTitle.toLowerCase() === 'update profile') {
        await http.patch("student/update", values)
      } else {
        await http.post("student/password/change", values)
      }
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = info => {

  }

  const props = {
    action: `${process.env.REACT_APP_BASE_URL}photo`,
    headers: {
      Authorization:  "Bearer " + JSON.parse(localStorage.getItem('userToken')),
    },
    onChange: handleChange,
    multiple: false,
    showUploadList:false
  };

  return (
    <Fragment>
      {profileLoading ?
        <Card loading={profileLoading} style={{height:300, marginBottom:15 }} /> :
        <Fragment>
          <div className='hostel'>
            <PageHeader
              avatar={{ src: myBooking.profile?.image ? myBooking.profile?.image : hostelImg, size: "80" }}
              className="d-none d-lg-block d-md-block"
              title={myBooking.profile?.first_name + " " + myBooking.profile?.last_name}
              subTitle={myBooking.profile.student_id}
              style={{
                background: "white",
                margin: "15px 0",
                border: "1px solid #ccc"
              }}
              extra={[
                <Button onClick={() => { setModalTitle("Update Profile"); setIsModalVisible(true) }} key="1" icon={<i className='bi bi-person'> </i>} disabled={profileLoading}> UPDATE PROFILE</Button>,
                <Button onClick={() => { setModalTitle("Change Password"); setIsModalVisible(true) }} key="2" icon={<i className='bi bi-lock'> </i>} disabled={profileLoading}> CHANGE PASSWORD</Button>,
                <Upload key="3" {...props}>
                  <Button icon={<i className='bi bi-image'> </i>} disabled={profileLoading}> CHANGE AVATAR</Button>
                </Upload>,
                <Button onClick={() => { setModalTitle("Change Password"); setIsModalVisible(true) }} key="2" icon={<i className='bi bi-chat'> </i>} disabled={profileLoading}>LODGE COMPLAIN</Button>,
              ]}
            />
            {
              (Object.keys(myBooking).length === 0 && !profileLoading) &&
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 150,
                }}
                description={
                  <p>
                    You have no bookings yet. <br />
                    Our booking process is made easy.
                  </p>
                }
              >
                <Button type="primary"><NavLink to="/hostels/">BOOK NOW</NavLink></Button>
              </Empty>
            }
            {
              (Object.keys(myBooking).length > 0 && !profileLoading) &&
              <Fragment>
                <div className='student-profile d-lg-none d-sm-block d-md-block bg-white mt-3 p-3 rounded'>
                  <h3 className='mb-3 fw-bold'>{myBooking.profile.student_id}</h3>
                  <Avatar src={hostelImg} size={150} />
                  <h4>{myBooking.profile?.first_name + " " + myBooking.profile?.last_name}</h4>
                  <small>{myBooking.profile.email_address}</small>
                  <div>
                    <Space size="large">
                    <Button onClick={() => { setModalTitle("Update Profile"); setIsModalVisible(true) }} icon={<i className='bi bi-person'> </i>}></Button>
                    <Button onClick={() => { setModalTitle("Change Password"); setIsModalVisible(true) }} icon={<i className='bi bi-lock'> </i>}></Button>
                    <Upload {...props}>
                      <Button icon={<i className='bi bi-image'> </i>}></Button>
                    </Upload>
                    </Space>
                  </div>
                </div>
                <div className='hostel'>
                  <Row
                    gutter={{
                      sm: 24,
                      lg: 12,
                    }}
                  >
                    <Col
                      xs={{
                        span: 24,
                      }}
                      lg={{
                        span: 16
                      }}
                      style={{
                        marginBottom: 15
                      }}
                    >
                      <div className='hostel-image-container d-none d-sm-block d-md-block'>
                        <ProgressiveImage
                            src={myBooking.hostel.image || hostelImg}
                            placeholder={placeholder}
                        >
                            {(src, loading) => <img src={src} alt="hero" className='image' height="340px" width="100%" style={{ opacity: loading ? 0.5 : 1, borderRadius: 5 }} />}
                        </ProgressiveImage>
                      </div>
                    </Col>
                    <Col
                      xs={{
                        span: 24,
                      }}
                      lg={{
                        span: 8
                      }}
                    >
                      <div className='booking-details'>
                        { myBooking.booking.payment_status.toString().toLowerCase() !== "completed" &&
                          <small className='booking-expiration' style={{textAlign:"center"}}>EXPIRES IN: {<Countdown date={Date.now(myBooking.booking.expires_at) + 1000} />}</small>}
                        <div className='booking-room-detail'>
                          <div>
                            <p className='booking-title'>My booking</p>
                            <h4 className='room-name'>{ myBooking.room.room_id}</h4>
                            <p className='room-hostel-name'>{ myBooking.profile.hostel.name }</p>
                            <h6 className='room-bed-detail'>{ myBooking.bed.bed_id +" "+ myBooking.bed.bed_type }</h6>
                          </div>
                          <div style={{ marginTop: 34 }}>
                            <div className='my-room-info'>
                              <i className="bi bi-house"></i>
                              <p>{ myBooking.room.capacity } in a room</p>
                            </div>
                            <div className='my-room-info'>
                              <i className="bi bi-people"></i>
                              <p>{ myBooking.room.remaining}/{myBooking.room.capacity} remaining</p>
                            </div>
                            <div className='my-room-info'>
                              <i className="bi bi-wallet"></i>
                              <p>{ formatCurrency.format(myBooking.room.bed_price) }</p>
                            </div>
                            <div className='my-room-info'>
                              <i className="bi bi-star"></i>
                              <p>{ myBooking.booking.payment_status }</p>
                            </div>
                          </div>
                        </div>
                        <div className='room-mate '>
                          <p style={{margin:0, color:"white", textAlign:"center"}}>ROOM MATES</p>
                          {
                            myBooking.room.mates.map((mate,index)=>(
                              <div key={index} className='room-mate-item'>
                                <UserOutlined className='room-mate-icon' />
                                <p className='room-mate-name'>
                                { mate.first_name +" "+ mate.last_name }
                                </p>
                              </div>
                            ))
                          }
                        </div>
                        <div className='booking-actions'>
                          <Button size='large' className='cancel-room-btn' disabled={myBooking.booking.payment_status.toString().toLowerCase() === 'completed'}>
                            {
                              myBooking.booking.payment_status.toString().toLowerCase() === 'completed' ? 'COMPLETED' : "CANCEL"
                            }
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Fragment>
            }
          </div>
          <div className='hostel-manager-profile'>
            <h3 style={{ margin: "0 0 24px 0" }}>HOSTEL MANAGER</h3>
            <Avatar src={myBooking.hostel.manager.image || hostelImg} size={80} icon={<UserOutlined />} />
            <h4 style={{ margin: 0 }}>{myBooking.hostel.manager.first_name} {myBooking.hostel.manager.last_name}</h4>
            <p>{myBooking.hostel.manager.email_address}.com</p>
          </div>
        </Fragment>
      }

      <Widget />
      <Modal
        title={modalTitle.toUpperCase()}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        okText="Submit"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        destroyOnClose={true}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={
            myBooking.profile
          }
          requiredMark={false}
          size="large"
          preserve={false}
        >
          {modalTitle.toLowerCase() === 'change password' && (
            <>
              <Form.Item
                name="old_password"
                // label="Current Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <Input.Password placeholder='Current Password' />
              </Form.Item>
              <Form.Item
                name="new_password"
                // label="New Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <Input.Password placeholder='New Password' />
              </Form.Item>
            </>
          )
          }
          {modalTitle.toLowerCase() === 'update profile' && (
            <Fragment>
              <Row
                gutter={{
                  xs: 24,
                  sm: 24,
                  lg: 12,
                }}
              >
                <Col
                  xs={24} sm={24} lg={12}
                >
                  <Form.Item
                    name="first_name"
                    // label="First Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input the first name!',
                      },
                    ]}
                  >
                    <Input placeholder='First Name' />
                  </Form.Item>
                </Col>
                <Col
                  xs={24} sm={24} lg={12}
                >
                  <Form.Item
                    name="last_name"
                    // label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your last name!',
                      },
                    ]}
                  >
                    <Input placeholder='Last Name' />
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
                <Col
                  xs={24} sm={24} lg={12}
                >
                  <Form.Item
                    name="phone_number"
                    // label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input the phone number!',
                      },
                    ]}
                  >
                    <Input placeholder='Phone Number' />
                  </Form.Item>
                </Col>
                <Col
                  xs={24} sm={24} lg={12}
                >
                  <Form.Item
                    name="email_address"
                    // label="Email Address"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email address!',
                      },
                    ]}
                  >
                    <Input type="email" placeholder='Email Address' />
                  </Form.Item>
                </Col>
              </Row>
            </Fragment>
          )
          }
        </Form>
      </Modal>
    </Fragment>
  )
}
