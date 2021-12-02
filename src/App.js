import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from "./components/nav/Navbar";
import Landing from './pages/landing/Landing';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path="/signup" />
      </Routes>
    </Router>
  );
}

export default App;
