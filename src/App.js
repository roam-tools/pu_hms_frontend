import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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

function LoginAuth({ children }) {
  let { student } = useSelector((state) => state.login);

  let location = useLocation();

  if (student.isLogin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
