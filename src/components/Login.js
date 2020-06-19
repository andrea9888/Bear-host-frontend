import React from "react";
import '../styles/Login.css';
export const Login = () => {

  function handleSubmit(event) {
    console.log(event);
  }
  return (
    <div className="body">
    <div className="text">
    </div>
    <div className="form-container">
    <form onSubmit={handleSubmit} className="sign-in">
      <h2>SIGN IN</h2>
      <input type="text" placeholder="Username" className="input-shape"/>
      <input type="password" placeholder="Password" className="input-shape"/>
      <div className="section-bellow">
        <div className="section-checkbox">
        <input type="checkbox" name="keep" id="keep" className="keep-checkbtn"/>
        <label htmlFor="keep" className="keep-label">Keep me logged in</label>
        </div>
        <a href="#">Forgot Password?</a>
      </div>
      <button type="submit" className="signin-btn" >SIGN IN</button>
    </form>
    </div>
    <div className="sign-up">
      <p>DON'T HAVE AN ACCOUNT?</p>
      <button>SIGN UP</button>
    </div>
    </div>
  );
};
