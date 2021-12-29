import React from 'react';
import {BrowserRouter as Router,Routes,Route, Navigate,useLocation} from 'react-router-dom'
import { selectUser } from './features/authentication';
import { useSelector } from 'react-redux';
import DefaultLayout from './components/layout/DefaultLayout';
import AdminLayout from './components/layout/AdminLayout';
import Signin from './pages/signin/Signin'



function App(props) {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<DefaultLayout {...props}/>}/>
        <Route path="/admin/*" element={<RequireAuth><AdminLayout {...props}/></RequireAuth>}/> />
      </Routes>
    </Router>
  );
}


function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useSelector(selectUser)
  let location = useLocation();
  console.log(auth)

  if (auth.role !== "porter") {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }else{
    return children;
  }
  if( auth.role !== "admin"){
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }else{
    return children;
  }

}

export default App;
