import React, { useState } from "react";
import WNavbar from "../WNavbar/wnavbar";
import "./wdash.css";
import homeIcon from "./reqi.png";
import infoIcon from "./reqi.png";
import settingsIcon from "./reqi.png";
import userIcon from "./reqi.png";
import addIcon from "./add.png";

function WDash() {
  const [activeSection, setActiveSection] = useState("welcome");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const renderContent = () => {
    switch (activeSection) {
      case "welcome":
        return <div>Welcome to the Home section!</div>;
      case "request":
        return (
          <div className="rcard-container">
            <div className="rcard">
              <label className="l1">Name</label>
              <h3>Classic White Card</h3>
              <button className="buy-button">Buy Now</button>
            </div>
            <div className="rcard">
              <h3>Classic Black Card</h3>
              <button className="buy-button">Buy Now</button>
            </div>
            <div className="rcard">
              <h3>Company Card</h3>
              <button className="buy-button">Buy Now</button>
            </div>
          </div>
        );
      case "courses":
        return (
          <div className="wcoruses">
            <button className="addcourse" onClick={() => setIsModalOpen(true)}>
              Add Course
              <img src={addIcon} alt="Plus Icon" className="plus-icon" />
            </button>
            {/* Render Modal here */}
            {isModalOpen && (
              <div
                className="modal-overlay"
                onClick={() => setIsModalOpen(false)}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2>Add New Course</h2>
                  <form>
                    <label>Course Name:</label>
                    <input type="text" placeholder="Enter course name" />

                    <label>Department:</label>
                    <input type="text" placeholder="Enter department" />

                    <label>Course Duration:</label>
                    <input type="text" placeholder="Enter course duration" />

                    <label>Course Fees:</label>
                    <input type="number" placeholder="Enter course fees" />

                    <label>Course Description:</label>
                    <input type="text" placeholder="Enter course description" />

                    <button type="submit" className="adsubmit">Submit</button>
                    
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case "settings":
        return <div>Settings options will be displayed here.</div>;
      case "profile":
        return <div>User profile information appears here.</div>;
      default:
        return <div>Select a section from the left menu.</div>;
    }
  };

  return (
    <div>
      <WNavbar />
      <div className="webcontainer">
        <div className="webleft">
          <button
            className="webleft-button"
            onClick={() => setActiveSection("request")}
          >
            <img src={homeIcon} alt="Home" className="webleft-button-icon" />
            Request
          </button>
          <button
            className="webleft-button"
            onClick={() => setActiveSection("courses")}
          >
            <img src={infoIcon} alt="Courses" className="webleft-button-icon" />
            Courses
          </button>
          <button
            className="webleft-button"
            onClick={() => setActiveSection("settings")}
          >
            <img
              src={settingsIcon}
              alt="Settings"
              className="webleft-button-icon"
            />
            Settings
          </button>
          <button
            className="webleft-button"
            onClick={() => setActiveSection("profile")}
          >
            <img src={userIcon} alt="Profile" className="webleft-button-icon" />
            Profile
          </button>
        </div>
        <div className="webright">{renderContent()}</div>
      </div>
    </div>
  );
}

export default WDash;
