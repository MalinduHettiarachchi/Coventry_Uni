import React, { useState } from "react";
import LNavbar from "../LNavbar/lnavbar";
import './ldash.css';
import homeIcon from './reqi.png'; 
import infoIcon from './reqi.png';
import settingsIcon from './reqi.png';
import userIcon from './reqi.png';

function WDash() {
  const [activeSection, setActiveSection] = useState('welcome');

  const renderContent = () => {
    switch (activeSection) {
      case 'welcome':
        return <div>Welcome to the Home section!</div>;
      case 'request':
        return <div>Course information goes here.</div>;
      case 'courses':
        return <div>Course information goes here.</div>;
      case 'settings':
        return <div>Settings options will be displayed here.</div>;
      case 'profile':
        return <div>User profile information appears here.</div>;
      default:
        return <div>Select a section from the left menu.</div>;
    }
  };

  return (
    <div>
      <LNavbar />
      <div className="lwebcontainer">
        <div className="lwebleft">
          <button className="lwebleft-button" onClick={() => setActiveSection('request')}>
            <img src={homeIcon} alt="Home" className="lwebleft-button-icon" />
            Request
          </button>
          <button className="lwebleft-button" onClick={() => setActiveSection('courses')}>
            <img src={infoIcon} alt="Courses" className="lwebleft-button-icon" />
            Courses
          </button>
          <button className="lwebleft-button" onClick={() => setActiveSection('settings')}>
            <img src={settingsIcon} alt="Settings" className="lwebleft-button-icon" />
            Settings
          </button>
          <button className="lwebleft-button" onClick={() => setActiveSection('profile')}>
            <img src={userIcon} alt="Profile" className="lwebleft-button-icon" />
            Profile
          </button>
        </div>
        <div className="lwebright">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default WDash;
