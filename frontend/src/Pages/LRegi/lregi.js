import React, { useState } from "react";
import axios from "axios";
import "../LRegi/lregi.css";
import Navbar from "../Navbar/navbar";

function Lregi() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="shrc">
        <div className="leftot">
          <p>Join With US</p>
        </div>
        <div className="rightot">
          <form className="lregi-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Full Name"
                className="nameinput"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <label>Email</label>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                className="emailinput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label>Password</label>
            <div className="form-group">
              <input
                type="password"
                placeholder="Your Password"
                className="passwordinput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Lregi;
