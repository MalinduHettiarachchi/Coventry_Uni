import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle close button click
  const handleClose = () => {
    window.history.back(); // Go back to the previous page
  };

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Check for special case: Coventry login credentials
    if (email === "coventry@gmail.com" && password === "cove123") {
      setIsAuthenticated(true);
      navigate("/webdah"); // Navigate to the /ambassadors route if credentials match
      return;
    }

    // Make API call to check credentials for lecturers first
    try {
      let response = await fetch("http://localhost:5000/api/lecturers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      let data = await response.json();
      console.log("Lecturer login response:", data); // Log the response

      if (data.success) {
        setIsAuthenticated(true); // Successfully authenticated
        navigate("/le"); // Navigate to the /le route if authenticated
        return; // No need to check the students' collection if already authenticated as lecturer
      } else {
        alert("Invalid email or password for lecturer.");
      }
    } catch (error) {
      console.error("Error during lecturer login:", error);
      alert("Something went wrong, please try again.");
    }

    // If lecturer authentication failed, check for student credentials
    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Student login response:", data); // Log the response

      if (data.success) {
        setIsAuthenticated(true); // Successfully authenticated
        navigate("/st"); // Navigate to the /st route if authenticated as student
      } else {
        alert("Invalid email or password for student.");
      }
    } catch (error) {
      console.error("Error during student login:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Close Button */}
      <button className="close-button" onClick={handleClose}>
        X
      </button>

      {/* Left Side Image and Text */}
      <div className="login-left">
        
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

          <a href="#forgot-password" className="forgot-password">
            Don't remember password?
          </a>

          <button type="submit" className="signin-button">
            Sign In
          </button>

          <p className="signup-prompt">
            Don’t have a LuxN card?{" "}
            <a href="#buy-now" className="buy-now">
              Buy Now
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
