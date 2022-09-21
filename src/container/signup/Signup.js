import { Button, Card, Col, Form, Input, Row } from 'antd'
import React from 'react'
import http from '../../api'
import { useSetError } from '../../context/ErrorContext'
import './signup.css'

export const Signup = () => {
    const setSignupError = useSetError()

    const handleSignup = async (values) => {
        let phone = values.phone_number.toString()
        const formatInputs = {
            ...values,
            phone_number: "+233" + phone.substr(phone.length - 10)
        }
        try {
            const response = await http.post("student/signup", formatInputs)
            console.log(response)
        } catch (error) {
            console.log(error.message)
            setSignupError(error.message)
        }
    }
    return (
        <div className='signup-container'>
            <Card title="" style={{ width: 500, borderRadius:10, border:"1px solid #ccc"  }} >
                <h3 style={{textAlign:"center"}}>SIGNUP</h3>
                <p style={{textAlign:"center"}}>Your signup enables you to login for a better experience.</p>
                <Form
                    name="signup-form"
                    layout='vertical'
                    size='large'
                    onFinish={handleSignup}
                >
                    <Row gutter={24}>
                        <Col xs={24} sm={24} lg={24}>
                            <Form.Item
                                label=""
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your first name!',
                                    },
                                ]}
                            >
                                <Input placeholder='First name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} lg={24}>
                            <Form.Item
                                label=""
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your last name!',
                                    },
                                ]}
                            >
                                <Input placeholder='Last name' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label=""
                        name="student_id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your student id!',
                            },
                        ]}
                    >
                        <Input placeholder='Student ID' />
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone_number!',
                            },
                        ]}
                    >
                        <Input
                            type='number'
                            prefix="+233"
                            placeholder='Phone number'
                            className="w-100"
                        />
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="email_address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email address!',
                            },
                        ]}
                    >
                        <Input placeholder='Email address' />
                    </Form.Item>
                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit" className='w-100'>
                            SIGNU UP
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
