import React, { useState } from 'react';
import SigninForm from '../../components/auth/SigninForm';
import './signin.css'

const Signin = () => {

    const [signupInfo,setSignupInfo] = useState({username:"",password:""})

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("Nice")
    }

    const handleInputChange = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        setSignupInfo(prev=>{
            return {
                ...prev,[inputName]:inputValue
            }
        })
    }

    console.log(signupInfo)

    return (
        <div className="wrapper">
            <div className="container">
                <div className="auth-wrapper">
                    <SigninForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
                </div>
            </div>
        </div>
    );
};

export default Signin;