import React from 'react';
import {useNavigate} from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/images/The-University-Logo2.jpg'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/authentication';

const Navbar = () => {
    const loggedIn = useSelector(selectUser)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const goHome = () =>{
        navigate("/")
    }

    const logout = () =>{
        dispatch(logout)
        // console.log("ere")
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <div className="navbar">
                    <img src={logo} alt="logo" height="80" width="160" className="brand-image" onClick={goHome}/>
                    <div className="nav-actions">
                        {!loggedIn&&<Link to="/signup">Sign Up</Link>}
                        {!loggedIn ? 
                        <Link to="/signin">Sign In</Link> :
                        // <Link to="/signup" onClick={logout}>Logout</Link> 
                        <span onClick={logout}>Logout</span>
                        }
                    </div>
                </div>
            </div>
            
        </nav>
    );
};

export default Navbar;