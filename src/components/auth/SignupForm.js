import React from 'react';
import './signup-form.css'

const SignupForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="signup">
            <div className="signup-form">
                <h1 className="signup-form__header">Create a Pentecost University College Hostel account</h1>
                <div className="user-info">
                    <div className="form__floating">
                        <input type="text" name="firstName" className="input__control" onChange={props.handleInputChange} required/>
                        <label htmlFor='firstName' className="input__label">First Name</label>
                    </div>
                    <span></span>
                    <div className="form__floating">
                        <input type="text" name="lastName" className="input__control" onChange={props.handleInputChange} required/>
                        <label htmlFor='lastName' className="input__label">Last Name</label>
                    </div>
                </div>
                <div className="form__floating">
                    <input type="email" name="email" className="input__control" onChange={props.handleInputChange} required/>
                    <label htmlFor='email' className="input__label">E-mail</label>
                </div>
                <div className="form__floating">
                    <input type="text" name="studentId" className="input__control" onChange={props.handleInputChange} required/>
                    <label htmlFor='Username' className="input__label">Student Id</label>
                </div>
                <div className="form__floating">
                    <input type="text" name="phone" className="input__control" onChange={props.handleInputChange} required/>
                    <label htmlFor='phoneNumber' className="input__label">Phone</label>
                </div>
                <button className="input__control bg-blue">Sign Up</button>
                <p className="auth__question">Already have an account? <a href="/signin">Sign in</a></p>
            </div>
        </form>
    );
};

export default SignupForm;