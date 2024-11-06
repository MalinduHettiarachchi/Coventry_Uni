import React from 'react'
import '../SNavbar/snavbar.css'
import loginImage from '../SNavbar/login.png';
import logoImage from '../SNavbar/logotw.png';


function wnavbar() {
  return (
    <nav className="snavbar">
      <div className="snavbar-logo">
      <a href='/shome'><img src={logoImage} alt="LuxN logo"/></a>
      </div>
      <ul className="snavbar-links">
        <p>Coventry Uni</p>
         <li className="snavbar-profile-icon">
          <a href="/slogin">
            <img src={loginImage} alt="Profile" className="sprofile-image" />
          </a>
        </li>
      </ul>
      <div >
        
      </div>
    </nav>
    
  )
}

export default wnavbar
