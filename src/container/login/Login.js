import { Alert, Button, Card, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useSetError } from '../../context/ErrorContext'
import { login, resetStatus } from '../../features/auth'
import './login.css'

export const Login = ({ role="student" }) => {
    const setError = useSetError()

    const { state } = useLocation()

    const dispatch = useDispatch()
    const status = useSelector(state => state.auth.status)

    useEffect(() => {
        if (status === "failed") {
            setError("Invalide credentials.")
        }
        setTimeout(() => {
            dispatch(resetStatus())
        }, 4000);
    }, [status, setError, dispatch])

    const handleLogin = (values) => {
        dispatch(login({...values,role}))
    }

    return (
        <div className='login-container'>
            <Card title="" style={{ width: 500, borderRadius: 10, border: "1px solid #ccc" }} >
                {state?.status === "reset" && <Alert message="You have been sent an email containing your new credential to your account." closable banner style={{ marginBottom: 15 }} />}
                <h3 style={{ textAlign: "center" }}>LOGIN</h3>
                <p style={{ textAlign: "center" }}>Please provide your credential to login for a better experience.</p>
                <Form
                    name="login-form"
                    layout='vertical'
                    size='large'
                    onFinish={handleLogin}
                >
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
                        <Input placeholder='Student Id' />
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Password' />
                    </Form.Item>
                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit" className='w-100' disabled={status === "loading"}>
                            {status === "loading" ? "PROCESSING...." : "LOGIN"}
                        </Button>
                    </Form.Item>
                </Form>
                <Link to="/student/auth/forgot-password">Forgot password?</Link>

            </Card>
        </div>
    )
}
