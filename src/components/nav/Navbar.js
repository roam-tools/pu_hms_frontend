import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/images/The-University-Logo2.jpg'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { selectUser } from '../../features/authentication';

const Navbar = () => {
    // const loggedIn = useSelector(selectUser)
    const dispatch = useDispatch()

    const [showMenu,setShowMenu] = useState(false)
    const [toggler,setToggler] = useState(false)

    const navigate = useNavigate()

    const goHome = () =>{
        navigate("/")
    }

    // const logout = () =>{
    //     dispatch(logout)
    // }
    const toggleMenu = () =>{
        setShowMenu(!showMenu)
        setToggler(!toggler)
    }
    const toggleMenu2 = () =>{
        setShowMenu(false)
        setToggler(false)
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <div className="navbar">
                    <img src={logo} alt="logo" className="brand-image" onClick={goHome}/>
                    <div className="nav-actions">
                        <div className={showMenu ? "active" : "inActive"} onClick={toggleMenu2}>
                        <Link to="/">Home</Link>
                        <Link to="/featured/hostels">Hostels</Link>
                        <Link to="/sign-up">Bookings</Link>
                        <Link to="/sign-up">Sign Up</Link>
                        <Link to="/sign-in" className = "logout">Login</Link>
                        </div>
                        <i className={toggler ? "fa fa-times fa-2x" : "fa fa-bars fa-2x"} onClick={toggleMenu}></i>
                    </div>
                </div>
            </div>
            
        </nav>
    );
};

export default Navbar;