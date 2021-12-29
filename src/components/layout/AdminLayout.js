import React from "react";
import adminRoutes from "./adminRoutes";
import "./admin-layout.css";
import SideNavigation from "./SideNavigation";
import { Route, Routes,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { logout,selectUser } from "../../features/authentication";

const AdminLayout = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  console.log(user);

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <div className="admin-layout">
      <SideNavigation />
      <div className="admin-layout-main">
        <nav>
          <span>PENTECOST UNIVERSITY HOSTEL MANAGEMENT</span>
          <button className="user-account-control" onClick={logoutUser}>
            Logout
          </button>
        </nav>
        <div className="admin-layout-main-content">
          <Routes>
            {adminRoutes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                  exact={route.exact}
                />
              );
            })}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
