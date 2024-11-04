import React from "react";
import "../LRegi/lregi.css";
import Navbar from "../Navbar/navbar";

function lregi() {
  return (
    <div>
      <Navbar />
      <div className="shrc">
      <div className="leftot">
        <p>Join With US</p>
      </div>
      <div className="rightot">
      <form className="lregi-form">
        <label>Name</label>
        <div className="form-group">
          <input type="text" placeholder="Your Full Name" className="nameinput"/>
        </div>
        <label>Email</label>
        <div className="form-group">
          <input type="email" placeholder="Your Full Name" className="emailinput"/>
        </div>
        <label>Password</label>
        <div className="form-group">
          <input type="password" placeholder="Your Full Name" className="passwordinput"/>
        </div>
        <button type="submit" className="submit-button">Sumbit</button>
      </form>
      </div>
      </div>
    </div>
  );
}

export default lregi;
