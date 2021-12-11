import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Hostels from './pages/booking/Hostels';
import Navbar from "./components/nav/Navbar";
// import Booking from './pages/booking/Booking';
import Landing from './pages/landing/Landing';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup'
import HostelPage from './pages/booking/HostelPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/hostel" element={<HostelPage />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
      </Routes>
    </Router>
  );
}

export default App;
