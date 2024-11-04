import React from 'react';
import './navbar.css';
import loginImage from '../Navbar/login.png';
import logoImage from '../Navbar/logotw.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <a href='/home'><img src={logoImage} alt="LuxN logo"/></a>
      </div>
      <ul className="navbar-links">
        <li><a href="#teams">LUXN for Teams</a></li>
        <li><a href="/ourteam">Our Team</a></li>
        <li><a href="#review">Review</a></li>
        <li><a href="#ambassadors">Ambassadors</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
         <li className="navbar-profile-icon">
          <a href="/login">
            <img src={loginImage} alt="Profile" className="profile-image" />
          </a>
        </li>
      </ul>
      <div >
        
      </div>
    </nav>
  );
}

export default Navbar;
