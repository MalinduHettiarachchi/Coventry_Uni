import React from 'react'
import '../LNavbar/lnavbar.css'
import loginImage from '../LNavbar/login.png';
import logoImage from '../LNavbar/logotw.png';


function wnavbar() {
  return (
    <nav className="lnavbar">
      <div className="lnavbar-logo">
      <a href='/lhome'><img src={logoImage} alt="LuxN logo"/></a>
      </div>
      <ul className="lnavbar-links">
        <p>Coventry Uni</p>
         <li className="lnavbar-profile-icon">
          <a href="/llogin">
            <img src={loginImage} alt="Profile" className="lprofile-image" />
          </a>
        </li>
      </ul>
      <div >
        
      </div>
    </nav>
    
  )
}

export default wnavbar
