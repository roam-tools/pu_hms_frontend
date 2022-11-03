import { Alert, Avatar, Drawer } from "antd";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeStudent } from "../../slices/login";
import "./navbar.css";

export const Navbar = (props) => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.login);
  const [clicked, setClicked] = useState(false);

  const openMenu = () => setClicked(!clicked);
  const closeMenu = () => setClicked(false);

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(removeStudent());
    window.location.reload();
  };

  return (
    <Fragment>
      {!navigator.onLine && (
        <Alert message="You are offline" style={{ textAlign: "center" }} />
      )}
      <nav {...props}>
        <NavLink to="/" className="brand">
          <img
            src="/dist/images/logo2.png"
            alt="logo"
            width={50}
            className="intro-x"
          />
          <span className="intro-x">Pentecost University</span>
        </NavLink>
        {student.isLogin ? (
          <Avatar
            size={45}
            src="/dist/images/puc-campus-1.jpg"
            className="intro-x avarter-sm"
          />
        ) : (
          <i className="intro-x fa fa-bars bars fa-3x" onClick={openMenu}></i>
        )}
        <div className="puc-navbar-links">
          {student.isLogin ? (
            <>
              <NavLink to="/profile" style={{ marginRight: "15px" }}>
                <Avatar
                  size={50}
                  src="/dist/images/puc-campus-1.jpg"
                  className="intro-x avarter"
                />
              </NavLink>
              <button
                onClick={logout}
                className="intro-x puc-btn puc-btn-danger"
                style={{color:"white"}}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                className="intro-x puc-btn puc-btn-outline"
                style={{ marginRight: "15px" }}
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className="intro-x puc-btn puc-btn-primary puc-text-white"
              >
                Log In
              </NavLink>
            </>
          )}
        </div>
      </nav>
      {clicked && (
        <Drawer
          title="Pentecost University"
          placement="left"
          width="100%"
          onClose={closeMenu}
          visible={clicked}
          closable={false}
          extra={
            <i key="1" onClick={closeMenu} className="fa fa-times fa-xl"></i>
          }
          footer={
            <div style={{ textAlign: "center" }}>Pentecost University</div>
          }
          bodyStyle={{
            fontSize: 24,
            textAlign: "center",
          }}
        >
          <NavLink to="/signup" style={{ display: "block", marginBottom: 15 }}>
            Sign Up
          </NavLink>
          <NavLink to="/login" style={{ display: "block" }}>
            Log In
          </NavLink>
        </Drawer>
      )}
    </Fragment>
  );
};
