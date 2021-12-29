import React, { useState } from 'react';
import SigninForm from '../../components/auth/SigninForm';
import './signin.css'
import authenticationService from '../../services/AuthenticationService'
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {selectUser} from '../../features/authentication'
import { login } from '../../features/authentication';

const Signin = () => {

    const [signInInfo,setSignInInfo] = useState({})
    const dispatch = useDispatch()
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    const user = useSelector(selectUser)
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setProcessing(true)
        try {

            const loggedIn = await authenticationService.signIn(signInInfo)

            if(loggedIn.status === 200){
                let user = loggedIn.data.data[0]
                user.role = loggedIn.data.message
                console.log(user.role)
                dispatch(login(user))
                console.log(loggedIn)
                setProcessing(false)
                if(user.role === "admin"){
                    navigate('/admin')
                }else if(user.role === "porter"){
                    navigate('/admin')
                }else{
                    navigate('/hostels')
                }
            }else{
                console.log("Processing.....")
                setProcessing(false)
                setError(true)
            }


        } catch (error) {
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
                    <SigninForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} credentials={signInInfo} processing={processing} error={error}/>
                </div>
            </div>
        </div>
    );
};

export default Signin;