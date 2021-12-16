import React from 'react';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Navbar from "./components/nav/Navbar";
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup'
// import HostelPage from './pages/booking/HostelPage';
import { selectUser } from './features/authentication';
import { useSelector } from 'react-redux';
import Landing from './pages/home/Landing';
import Hostels from './pages/hostels/Hostels';
import Booking from './pages/booking/Booking';
import Profile from './pages/profile/Profile';



function App() {
  const loggedIn = useSelector(selectUser)
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path="/featured/hostels" element={<Hostels />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/sign-up" element={<Signup />}/>
        <Route path="/sign-in" element={loggedIn ? <Navigate replace to="/" /> : <Signin />}/>
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
}

export default App;
