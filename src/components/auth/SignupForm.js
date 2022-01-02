import React from "react";
import "./signup-form.css";

const SignupForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="signup">
      <div className="signup-form">
        <h1 className="signup-form__header">Create a PU student account</h1>
        <div className="user-info">
          <div className="form__floating">
            <input
              type="text"
              name="firstName"
              className="input__control"
              onChange={props.handleInputChange}
              required
            />
            <label htmlFor="firstName" className="input__label">
              First Name
            </label>
          </div>
          <span></span>
          <div className="form__floating">
            <input
              type="text"
              name="lastName"
              className="input__control"
              onChange={props.handleInputChange}
              required
            />
            <label htmlFor="lastName" className="input__label">
              Last Name
            </label>
          </div>
        </div>
        <div className="form__floating">
          <input
            type="email"
            name="email"
            className="input__control"
            onChange={props.handleInputChange}
            required
          />
          <label htmlFor="email" className="input__label">
            E-mail Address
          </label>
        </div>
        <div className="form__floating">
          <input
            type="text"
            name="studentId"
            className="input__control"
            onChange={props.handleInputChange}
            required
          />
          <label htmlFor="Username" className="input__label">
            Index Number
          </label>
        </div>
        <div className="form__floating">
          <input
            type="text"
            name="phone"
            className="input__control"
            onChange={props.handleInputChange}
            required
          />
          <label htmlFor="phoneNumber" className="input__label">
            Phone Number
          </label>
        </div>
        {props.error ? <div className="error">{props.error}</div> : null}
        <button
          className="input__control bg-blue"
          disabled={
            Object.keys(props.credentials).length < 5 || props.processing
          }
        >
          Sign Up
        </button>
        <p className="auth__question">
          Already have an account? <a href="/sign-in">Sign in</a>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
