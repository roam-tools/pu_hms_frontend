import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from "./components/nav/Navbar";
import Landing from './pages/landing/Landing';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
      </Routes>
    </Router>
  );
}

export default App;
