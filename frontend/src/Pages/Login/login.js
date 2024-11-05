import React from 'react';
import './login.css';
//ZstDXOyVbd9FSGcp

function Login() {
  // Function to handle close button click
  const handleClose = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="login-container">
      {/* Close Button */}
      <button className="close-button" onClick={handleClose}>X</button>

      {/* Left Side Image and Text */}
      <div className="login-left">
        <div className="login-promo-text">
          <h3>Future of <span className="networking">Networking</span></h3>
          <h1>LuxN</h1>
        </div>
        <div className="login-image">
          <img src="path-to-your-image/left-image.png" alt="Phone and LuxN card" />
        </div>
      </div>
      <div className="login-right">
        <p className="login">Login</p>
        <label className="loginun">Login to your FULETRIX account.</label>
        
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Your email address" />

          <label>Password</label>
          <input type="password" placeholder="Your password" />

          <a href="#forgot-password" className="forgot-password">Don't remember password?</a>

          <button type="submit" className="signin-button">Sign In</button>

          <p className="signup-prompt">
            Don’t have a LuxN card? <a href="#buy-now" className="buy-now">Buy Now</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
