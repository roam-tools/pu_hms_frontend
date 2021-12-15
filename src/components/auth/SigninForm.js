import React from 'react';
import './login-form.css'

const SigninForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="login">
            <div className="login-form">
                <h1 className="login-form__header">Login into Pentecost University College Hostel account</h1>
                <div className="form__floating">
                    <input type="text" name="studentId" className="input__control" onChange={props.handleInputChange} required/>
                    <label htmlFor='Username' className="input__label">Student Id</label>
                </div>
                <div className="form__floating">
                    <input type="password" name="password" className="input__control" onChange={props.handleInputChange} required/>
                    <label htmlFor='password' className="input__label">Password</label>
                </div>
                <br />
                <button className="input__control bg-blue">Sign In</button>
                <p className="auth__question">Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </form>
    );
};

export default SigninForm;