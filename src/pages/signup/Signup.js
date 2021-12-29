import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import SignupForm from '../../components/auth/SignupForm';
import './signup.css'
import authenticationService from '../../services/AuthenticationService'

const Signup = () => {

    const [signupInfo,setSignupInfo] = useState({})
    const [signedUp, setSignedup] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (e) =>{
        e.preventDefault()
        setProcessing(true)
        
        try{
            const resp = await authenticationService.signUp(signupInfo)
            if(resp.status === 200){
                setSignedup(!signedUp)
                setProcessing(false)
                setSignupInfo({})
            }else{
                setProcessing(false)
                console.log("Processing.....")
            }

        }catch(error){
            setProcessing(false)
            setError(error.response.data.message)
            // console.log("GET ERROR ", error.response.data.message)
            setTimeout(() => {
                setError("")
            }, 5000);
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


    return (
        <div className="wrapper">
            <div className="container">
                {!signedUp&&<div className="auth-wrapper">
                    <SignupForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} credentials={signupInfo} processing={processing} error={error}/>
                </div>}

                {signedUp&&
                <div className="success-message">
                    <h2>Thank you for signing up!</h2>
                    <p>
                        Your account password has been sent to your email 
                        {signupInfo.email}. Check and click <Link to="/sign-in"> here</Link> to sign in.
                    </p>
                </div>
                }

            </div>
        </div>
    );
};

export default Signup;