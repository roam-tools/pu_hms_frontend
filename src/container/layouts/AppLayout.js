import { Alert, Drawer, Layout, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, Link } from 'react-router-dom';
import logo from '../../assets/images/puclogo.jpg'
import { useError, useSetError } from '../../context/ErrorContext';
import { selectStudent } from '../../features/auth';
import './app-layout.css'

const { Header, Content, Footer } = Layout;

const roam = ' ROAM Labs'

export const AppLayout = () => {

    const error = useError()
    const setError = useSetError()

    const auth = useSelector(selectStudent)

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("")
            }, 5000);
        }
    }, [error, setError])

    useEffect(() => {
        return () => {
            setError("")
        }
    }, [setError])

    return (
        <Layout>
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 999,
                    width: '100%',
                    background: "#fff",
                    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                    padding: "0 24px"
                }}
            >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                    <div style={{ alignSelf: "center" }}>
                        <Link to="/">
                            <img src={logo} alt="logo" height={40} />
                        </Link>
                    </div>
                    <ul className='nav-menu'>
                        <li><NavLink to="/hostels">Hostels</NavLink></li>
                        <li><NavLink to="/rooms">Rooms</NavLink></li>
                    </ul>



                    {!auth && <Space size="large" className='nav-menu-right'>
                        <NavLink to="/student/auth/signup" className="signu-btn">Sign up</NavLink>
                        <NavLink to="/student/auth/login" className="login-btn">Login</NavLink>
                    </Space>}

                    {auth && <Space size="large" className='nav-menu-right'>
                        <NavLink to="/student/dashboard" className="signu-btn">Profile</NavLink>
                        <NavLink to="/student/logout" className="login-btn">Logout</NavLink>
                    </Space>}

                    <div className='hamburger'>
                        <i onClick={() => setVisible(true)} className='fa fa-bars'></i>
                    </div>

                </div>
            </Header>
            <Content
                className="site-layout"
                style={{
                    marginTop: 50,
                }}
            >
                {error && <Alert message={error} type="error" banner closable />}
                <div
                    className="site-layout-background"
                    style={{
                        height: "calc('100vh - 64px')",
                        padding: 24,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                <p style={{ margin: 0 }}>2021 Pentecost University. All Rights Reserved</p>
                <p style={{ margin: 0 }}>Powered By:{roam}</p>
            </Footer>

            <Drawer
                title="PUC HOSTELS"
                placement="left"
                width="70%"
                onClose={() => { setVisible(false) }}
                visible={visible}
                closable={false}
                headerStyle={{
                    borderBottom: "1px solid #000"
                }}
                extra={
                    <i onClick={() => setVisible(false)} key="1" className='fa fa-close fa-xl'></i>
                }
            >
                {!auth &&
                    <ul className='drawer-links'>
                        <li><NavLink to="/hostels"><i className='fa fa-house'></i> Hostels</NavLink></li>
                        <li><NavLink to="/rooms"><i className='fa fa-door-open'></i> Rooms</NavLink></li>
                        <li><NavLink to="/student/auth/signup"><i className='fa fa-user-plus'></i> Sign up</NavLink></li>
                        <li><NavLink to={"/student/auth/login"}><i className='fa fa-right-to-bracket'></i> Login</NavLink></li>
                    </ul>}
                {auth &&
                    <ul className='drawer-links'>
                        <li><NavLink to="/hostels"><i className='fa fa-house'></i> Hostels</NavLink></li>
                        <li><NavLink to="/rooms"><i className='fa fa-door-open'></i> Rooms</NavLink></li>
                        <li><NavLink to="/student/dashboard"><i className='fa fa-user-plus'></i> Profile</NavLink></li>
                        <li><NavLink to="/logout"><i className='fa fa-right-to-bracket'></i> Logout</NavLink></li>
                    </ul>}
            </Drawer>
        </Layout>
    )
}