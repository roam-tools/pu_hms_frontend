import React, { useState } from 'react';
import SignupForm from '../../components/auth/SignupForm';
import './signup.css'

const Signup = () => {

    const [signupInfo,setSignupInfo] = useState({firstName:"",lastName:"",email:"",username:"",password:""})

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
                    <SignupForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
                </div>
            </div>
        </div>
    );
};

export default Signup;