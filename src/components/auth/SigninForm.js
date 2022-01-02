import React from "react";
import "./login-form.css";

const SigninForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="login">
      <div className="login-form">
        <h1 className="login-form__header">PU Student Login</h1>
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
            type="password"
            name="password"
            className="input__control"
            onChange={props.handleInputChange}
            required
          />
          <label htmlFor="password" className="input__label">
            Password
          </label>
        </div>
        {/* <br /> */}
        {props.error ? <div className="error">{props.error}</div> : null}
        <button
          className="input__control bg-blue"
          disabled={
            Object.keys(props.credentials).length < 2 || props.processing
          }
        >
          Sign In
        </button>
        <p className="auth__question">
          Don't have an account? <a href="/sign-up">Sign up</a>
        </p>
      </div>
    </form>
  );
};

export default SigninForm;
