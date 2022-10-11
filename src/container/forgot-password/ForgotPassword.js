import { Button, Card, Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import http from '../../api'
import './forgot-password.css'

export const ForgotPassword = ({ role = "student"}) => {
    const navigate = useNavigate()

    const handleForgotPassword = async (values) => {
        try {
            let response =""
            if(role === "student"){
                response = await http.post('student/password/request', values)
                navigate('/admin/auth/login',{state:{status:"reset"}})
            }else{
                response = await http.post('admin/password/request', values)
                navigate('/admin/auth/login',{state:{status:"reset"}})
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='forgot-password-container'>
            <Card title="" style={{ width: 500, borderRadius:10, border:"1px solid #ccc" }} >
                <h3 style={{textAlign:"center"}}>RESET PASSWORD</h3>
                <p style={{textAlign:"center"}}>Please provide us with your email address.</p>
                <Form
                    name="forgot-password-form"
                    layout='vertical'
                    size='large'
                    onFinish={handleForgotPassword}
                >
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
                        <Input type='email' placeholder='Email address' />
                    </Form.Item>
                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit" className='w-100'>
                            RESET PASSWORD
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>
    )
}
