import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
// import { selectUser } from './features/authentication';
// import { useSelector } from 'react-redux';
import DefaultLayout from './components/layout/DefaultLayout';
import AdminLayout from './components/layout/AdminLayout';



function App(props) {
  // const loggedIn = useSelector(selectUser)
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<DefaultLayout {...props}/>}/>
        <Route path="/admin/*" element={<AdminLayout {...props}/>} />
      </Routes>
    </Router>
  );
}

export default App;
