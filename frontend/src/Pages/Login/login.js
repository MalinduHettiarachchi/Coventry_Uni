import React, { useState } from 'react';
import './login.css';
import WDash from '../Web Admin/WDashboard/wdash'; // Assuming WDash is in the same directory, adjust if necessary.

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle close button click
  const handleClose = () => {
    window.history.back(); // Go back to the previous page
  };

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Check if email and password match
    if (email === 'mhssc20@gmail.com' && password === '123') {
      setIsAuthenticated(true); // Set authenticated state to true
    } else {
      alert('Invalid email or password'); // Display error message if credentials don't match
    }
  };

  if (isAuthenticated) {
    // Render the WDash component if authenticated
    return <WDash />;
  }

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

      {/* Right Side Form */}
      <div className="login-right">
        <p className="login">Login</p>
        <label className="loginun">Login to your FULETRIX account.</label>
        
        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
