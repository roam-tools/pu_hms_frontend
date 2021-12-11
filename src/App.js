import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from "./components/nav/Navbar";
import Booking from './pages/booking/Booking';
import Landing from './pages/landing/Landing';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} exact />
<<<<<<< HEAD
        <Route path="/signup" />
        <Route path="/booking" element={<Booking />} />
=======
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
>>>>>>> dc7ef1e53beaa411b6a878ec326d3148f2e61b6b
      </Routes>
    </Router>
  );
}

export default App;
