import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import SignupForm from '../../components/auth/SignupForm';
import './signup.css'
import authenticationService from '../../services/AuthenticationService'

const Signup = () => {

    const [signupInfo,setSignupInfo] = useState({firstName:"",lastName:"",studentId:"",email:"",password:"",phone:""})
    const [signedUp, setSignedup] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const newSignUp = await authenticationService.signUp(signupInfo)
            console.log(newSignUp)
            setSignedup(!signedUp)

        }catch(error){
            console.log(error)
        }
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
                {!signedUp&&<div className="auth-wrapper">
                    <SignupForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
                </div>}

                {signedUp&&
                <div className="success-message">
                    <h2>Thank you for signing up!</h2>
                    <p>
                        Your account password has been sent to your email 
                        {signupInfo.email}. Check and click <Link to="/signin"> here</Link> to sign in.
                    </p>
                </div>
                }

            </div>
        </div>
    );
};

export default Signup;