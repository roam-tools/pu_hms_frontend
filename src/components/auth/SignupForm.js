import React from 'react';
import './signup-form.css'

const SignupForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="signup">
            <div className="signup-form">
                <h1 className="signup-form__header">Create a Pentecost University Hostel account</h1>
                <div className="form__floating">
                    <input type="text" name="firstName" className="input__control" onChange={props.handleInputChange} required/>
                    <label htmlFor='firstName' className="input__label">First Name</label>
                </div>
                <div className="form__floating">
                    <input type="text" name="lastName" className="input__control" onChange={props.handleInputChange} required/>
                    <label htmlFor='lastName' className="input__label">Last Name</label>
                </div>
                <div className="form__floating">
                    <input type="email" name="email" className="input__control" onChange={props.handleInputChange} required/>
                    <label htmlFor='email' className="input__label">E-mail</label>
                </div>
                <div className="form__floating">
                    <input type="text" name="username" className="input__control" onChange={props.handleInputChange} required/>
                    <label htmlFor='Username' className="input__label">Username</label>
                </div>
                <div className="form__floating">
                    <input type="password" name="password" className="input__control" onChange={props.handleInputChange} required/>
                    <label htmlFor='password' className="input__label">Password</label>
                </div>
                <br />
                <button className="input__control bg-blue">Sign Up</button>
                <p className="auth__question">Already have an account? <a href="http://">Sign in</a></p>
            </div>
        </form>
    );
};

export default SignupForm;