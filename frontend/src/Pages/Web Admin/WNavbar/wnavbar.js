import React from 'react'
import './wnavbar.css'
import loginImage from './login.png';
import logoImage from './logotw.png';


function wnavbar() {
  return (
    <nav className="wnavbar">
      <div className="wnavbar-logo">
      <a href='/whome'><img src={logoImage} alt="LuxN logo"/></a>
      </div>
      <ul className="wnavbar-links">
        <p>Coventry Uni</p>
         <li className="wnavbar-profile-icon">
          <a href="/wlogin">
            <img src={loginImage} alt="Profile" className="wprofile-image" />
          </a>
        </li>
      </ul>
      <div >
        
      </div>
    </nav>
    
  )
}

export default wnavbar
