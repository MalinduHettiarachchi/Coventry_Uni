import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>Lux</span>
        <span className="navbar-logo-icon">N</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#teams">LUXN for Teams</a></li>
        <li><a href="#custom-card">Custom Card</a></li>
        <li><a href="#review">Review</a></li>
        <li><a href="#ambassadors">Ambassadors</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="navbar-profile-icon">
        <span>👤</span>
      </div>
    </nav>
  );
}

export default Navbar;
