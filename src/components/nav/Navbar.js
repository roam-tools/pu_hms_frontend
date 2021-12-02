import React from 'react';
import {useNavigate} from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/images/The-University-Logo2.jpg'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
    const goHome = () =>{
        navigate("/")
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <div className="navbar">
                    <img src={logo} alt="logo" height="80" width="160" className="brand-image" onClick={goHome}/>
                    <div className="nav-actions">
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/sigin">Sign In</Link>
                    </div>
                </div>
            </div>
            
        </nav>
    );
};

export default Navbar;