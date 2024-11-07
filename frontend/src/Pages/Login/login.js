import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle close button click
  const handleClose = () => {
    window.history.back(); // Go back to the previous page
  };

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Make API call to check credentials
    try {
      const response = await fetch('http://localhost:5000/api/lecturers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true); // Successfully authenticated
        navigate('/le'); // Navigate to the /le route if authenticated
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong, please try again.');
    }
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
