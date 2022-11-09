import {
  BookOutlined,
  KeyOutlined,
  TeamOutlined,
  ToolOutlined,
  HomeOutlined,
  MessageOutlined,
  PoweroffOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Modal } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./admin-layout.css";
// import logo from '../../../public/dist/images/puclogo2.png'
// import logo from "../../assets/images/puclogo2.png";
// import { useError, useSetError } from "../../context/ErrorContext";

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/admin">Dashboard</Link>, "/admin", <PieChartOutlined />),
  getItem(
    <Link to="/admin/keys">Key Management</Link>,
    "/admin/keys",
    <KeyOutlined />
  ),
  getItem(
    <Link to="/admin/students">Students</Link>,
    "/admin/students",
    <TeamOutlined />
  ),
  getItem(
    <Link to="/admin/rooms">Rooms</Link>,
    "/admin/rooms",
    <HomeOutlined />
  ),
  getItem(
    <Link to="/admin/bookings">Bookings</Link>,
    "/admin/bookings",
    <BookOutlined />
  ),
  getItem(
    <Link to="/admin/complaints">Complaints</Link>,
    "/admin/complaints",
    <MessageOutlined />
  ),
  getItem("Settings", "sub1", <ToolOutlined />, [
    // getItem(<Link to="/admin/profile">Profile</Link>, "admin/profile"),
    getItem(<Link to="/admin/logs">Key logs</Link>, "/admin/logs"),
  ]),
  getItem(
    <span
      onClick={() => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
        // dispatch(removeManager());
      }}
    >
      Logout
    </span>,
    "/logout",
    <PoweroffOutlined />
  ),
];

const rootSubmenuKeys = [
  "sub1",
  "/admin/keys",
  "/admin/students",
  "/admin/rooms",
  "/admin/bookings",
  "/admin/profile",
  "/admin/change/password",
  "/admin/logs",
];

export const AdminLayout = () => {
  //   const error = useError();
  //   const setError = useSetError();


  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [error, setError] = useState("");

  const errorFunc = () => {
    Modal.error({
      title: "Error",
      content: "An error has occured",
      onOk() {
        setError("");
      },
    });
  };

  useEffect(() => {
    if (error) {
      errorFunc();
    }
  }, [error]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // function logout() {
  //   sessionStorage.clear();
  //   localStorage.clear();
  //   dispatch(removeManager());
  // };

  return (
    <Fragment>
      <Layout
        style={{
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflowY: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo">
            <h4>PENTVARS</h4>
          </div>
          {!collapsed && <div className="side-title">Navigation</div>}
          <Menu
            theme="light"
            mode="inline"
            items={items}
            defaultSelectedKeys={pathname}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              width: collapsed ? "calc(100% - 115px)" : "calc(100% - 230px)",
              marginLeft: collapsed ? 100 : 215,
              marginTop: 20,
              padding: 0,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
};
