import React, { useState } from 'react';
import SigninForm from '../../components/auth/SigninForm';
import './signin.css'
import authenticationService from '../../services/AuthenticationService'
import { useDispatch } from 'react-redux';
import { login } from '../../features/authentication';

const Signin = () => {

    const [signInInfo,setSignInInfo] = useState({studentId:"",password:""})
    const dispatch = useDispatch()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {

            const loggedIn = await authenticationService.signIn(signInInfo)
            console.log(loggedIn)

            // dispatch(login(loggedIn.data.data[0]))

        } catch (error) {
            console.log("GET ERROR ", error.response)
        }
    }

    const handleInputChange = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        setSignInInfo(prev=>{
            return {
                ...prev,[inputName]:inputValue
            }
        })
    }

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