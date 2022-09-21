import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppLayout } from './container/layouts/AppLayout';
import { Home } from './container/home/Home';
import { selectAdmin, selectStudent } from './features/auth';
import { Signup } from './container/signup/Signup';
import { Login } from './container/login/Login';
import { ForgotPassword } from './container/forgot-password/ForgotPassword';
import ErrorProvider from './context/ErrorContext';
import { HostelList } from './container/hostel/HostelList';
import { Hostel } from './container/hostel/Hotel';
import { Dashboard } from './container/dashboard/Dashboard';
import { Logout } from './container/login/Logout';
import { Rooms } from './container/rooms/Rooms';
import { AdminLayout } from './container/layouts/AdminLayout';
import { Students } from './container/admin/Students';
import { AdminRooms } from './container/admin/Rooms';
import { Bookings } from './container/admin/Bookings';
import { KeyList } from './container/admin/KeyList';
import { KeyLogs } from './container/admin/KeyLogs';

export const App = () => {
  return (
    <ErrorProvider value="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="hostels" element={<HostelList />} />
            <Route path="hostel/:id" element={<Hostel />} />
            <Route path="rooms" element={<Rooms />} />
          </Route>
          <Route path="/student/auth" element={
            <LoginAuth>
              <AppLayout />
            </LoginAuth>
          }>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/student/dashboard" element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path="/admin/auth" element={
            <AdminLoginAuth>
              <AppLayout />
            </AdminLoginAuth>
          }>
            <Route path="login" element={<Login role="admin" />} />
            <Route path="forgot-password" element={<ForgotPassword role="admin" />} />
          </Route>

          <Route path="/admin" element={
            <RequireAdminAuth>
              <AdminLayout />
            </RequireAdminAuth>
          }>
            <Route index element={"<AdminDashboard />"} />
            <Route path="logs" element={<KeyLogs />} />
            <Route path="keys" element={<KeyList />} />
            <Route path="students" element={<Students />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="bookings" element={<Bookings />} />
          </Route>

          <Route path="/admin/logout" element={
            <RequireAdminAuth>
              <Logout />
            </RequireAdminAuth>
          } />

          <Route path="/logout" element={
            <RequireAuth>
              <Logout />
            </RequireAuth>
          } />

        </Routes>
      </BrowserRouter>
    </ErrorProvider>
  )
}

function RequireAuth({ children }) {
  let auth = useSelector(selectStudent);
  let location = useLocation();

  if (!auth || auth === undefined) {
    return <Navigate to="/student/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

function LoginAuth({ children }) {
  let auth = useSelector(selectStudent);

  let location = useLocation();

  if (auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

//admin
function RequireAdminAuth({ children }) {
  let auth = useSelector(selectAdmin);
  let location = useLocation();

  if (!auth || auth === undefined) {
    return <Navigate to="/admin/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

function AdminLoginAuth({ children }) {
  let auth = useSelector(selectAdmin);

  let location = useLocation();

  if (auth) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
}

