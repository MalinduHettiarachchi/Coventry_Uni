import React, { useState } from "react";
import SNavbar from "../SNavbar/snavbar";
import './sdash.css';
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
      <SNavbar />
      <div className="swebcontainer">
        <div className="swebleft">
          <button className="swebleft-button" onClick={() => setActiveSection('request')}>
            <img src={homeIcon} alt="Home" className="swebleft-button-icon" />
            Request
          </button>
          <button className="swebleft-button" onClick={() => setActiveSection('courses')}>
            <img src={infoIcon} alt="Courses" className="swebleft-button-icon" />
            Courses
          </button>
          <button className="swebleft-button" onClick={() => setActiveSection('settings')}>
            <img src={settingsIcon} alt="Settings" className="swebleft-button-icon" />
            Settings
          </button>
          <button className="swebleft-button" onClick={() => setActiveSection('profile')}>
            <img src={userIcon} alt="Profile" className="swebleft-button-icon" />
            Profile
          </button>
        </div>
        <div className="swebright">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default WDash;
