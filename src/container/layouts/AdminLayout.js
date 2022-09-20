import {
    BookOutlined,
    KeyOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './admin-layout.css'
import logo from '../../assets/images/puclogo2.png'

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(<Link to="/admin/keys">Keys</Link>, '1', <KeyOutlined />),
    getItem(<Link to='/admin/students'>Students</Link>, '2', <TeamOutlined />),
    getItem(<Link to='/admin/rooms'>Rooms</Link>, '4', <HomeOutlined />),
    getItem(<Link to='/admin/bookings'>Bookings</Link>, '5', <BookOutlined />),
    getItem('Profile', 'sub1', <UserOutlined />, [
        getItem(<Link to='update/profile'>Update Profile</Link>, '6'),
        getItem(<Link to="/admin/change/password">Change Password</Link>, '7'),
        getItem(<Link to='/admin/logout'>Logout</Link>, '8'),
    ])
];

export const AdminLayout = () => {
    
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout
            style={{
                minHeight: '100vh'
            }}
        >
            <Sider
                theme='light'
                collapsible 
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo">
                    <img src={logo} alt="logo" width={80} />
                </div>
                {!collapsed &&
                    <div className='side-title'>
                        Navigation
                    </div>}
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Content
                    style={{
                        width: collapsed ? 'calc(100% - 115px)' : 'calc(100% - 230px)',
                        marginLeft: collapsed ? 100 : 215,
                        marginTop: 20,
                        padding: 0,
                    }}
                >
                    <Outlet />
                </Content>
                {/* <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer> */}
            </Layout>
        </Layout>
    );
};