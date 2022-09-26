import { Button, Card, Space } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import http from '../../api'

export const Logout = ({ role }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const logout = async () => {
        if (pathname === 'student/logout') {
            await http.get('student/logout')
        } else {
            await http.get('admin/logout')
        }
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload()
    }
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card bodyStyle={{ textAlign: "center" }}>
                <p>
                    The logout button was clicked. <br /> Please confirm.
                </p>
                <Space>
                    <Button onClick={logout} type='danger'>Yes, logout</Button>
                    <Button onClick={() => navigate(-1)} type='primary' ghost>Cancel</Button>
                </Space>
            </Card>
        </div>
    )
}
