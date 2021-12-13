import React from 'react';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Hostels from './pages/booking/Hostels';
import Navbar from "./components/nav/Navbar";
// import Booking from './pages/booking/Booking';
import Landing from './pages/landing/Landing';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup'
import HostelPage from './pages/booking/HostelPage';
import { selectUser } from './features/authentication';
import { useSelector } from 'react-redux';


function App() {
  const loggedIn = useSelector(selectUser)
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/hostel" element={<HostelPage />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={loggedIn ? <Navigate replace to="/" /> : <Signin />}/>
      </Routes>
    </Router>
  );
}

export default App;
