import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AdminLayout } from "./app/admin/AdminLayout";
import { AdminLogin } from "./app/admin/AdminLogin";
import { AdminProfile } from "./app/admin/AdminProfile";
import { Bookings } from "./app/admin/Bookings";
import { KeyList } from "./app/admin/KeyList";
import { KeyLogs } from "./app/admin/KeyLogs";
import { AdminRooms } from "./app/admin/Rooms";
import { Students } from "./app/admin/Students";
import { Booking } from "./app/Booking";
import { ForgotPassword } from "./app/ForgotPassword";
import { Home } from "./app/Home";
import { Login } from "./app/Login";
import { Profile } from "./app/Profile";
import { SignUp } from "./app/SignUp";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="hostel/:id" element={<Booking />} />
        <Route
          path="/profile"
          element={
            <RequireStudent>
              <Profile />
            </RequireStudent>
          }
        />
        <Route
          path="/signup"
          element={
            <LoginAuth>
              <SignUp />
            </LoginAuth>
          }
        />
        <Route
          path="/login"
          element={
            <LoginAuth>
              <Login />
            </LoginAuth>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <LoginAuth>
              <ForgotPassword />
            </LoginAuth>
          }
        />

        <Route
          path="/admin"
          element={
            <RequireAdmin>
            <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/keys" element={<KeyList />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/logs" element={<KeyLogs />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
        <Route
          path="/admin/login"
          element={
            <AdminLoginAuth>
              <AdminLogin />
            </AdminLoginAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

function RequireStudent({ children }) {
  let { student } = useSelector((state) => state.login);
  let location = useLocation();

  if (!student.isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function RequireAdmin({ children }) {
  let { manager } = useSelector((state) => state.login);
  let location = useLocation();

  if (!manager.isLogin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

function LoginAuth({ children }) {
  let { student } = useSelector((state) => state.login);

  let location = useLocation();

  if (student.isLogin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function AdminLoginAuth({ children }) {
  let { manager } = useSelector((state) => state.login);

  let location = useLocation();

  if (manager.isLogin) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
}
