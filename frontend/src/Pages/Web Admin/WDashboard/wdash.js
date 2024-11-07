import React, { useState, useEffect } from "react";
import axios from "axios";
import WNavbar from "../WNavbar/wnavbar";
import "./wdash.css";
import homeIcon from "./reqi.png";
import infoIcon from "./reqi.png";
import settingsIcon from "./reqi.png";
import userIcon from "./reqi.png";
import addIcon from "./add.png";

function WDash() {
  const [activeSection, setActiveSection] = useState("welcome");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lecturerRequests, setLecturerRequests] = useState([]); // State for storing fetched data

  useEffect(() => {
    if (activeSection === "request") {
      fetchLecturerRequests();
    }
  }, [activeSection]);

  const fetchLecturerRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/lecturerreq");
      setLecturerRequests(response.data);
    } catch (error) {
      console.error("Error fetching lecturer requests:", error);
    }
  };

  const handleAcceptRequest = async (request) => {
    try {
      // Generate password for the lecturer
      const password = `L${request.name.slice(0, 2)}${request.contactNumber}`;

      // Prepare data to send
      const lecturerData = {
        name: request.name,
        email: request.email,
        contactNumber: request.contactNumber,
        password: password,
      };

      // Send POST request to add lecturer to the database
      const response = await axios.post('http://localhost:5000/api/lecturer', lecturerData);
      console.log(response.data);
      alert('Lecturer added successfully!');
    } catch (error) {
      console.error("Error adding lecturer:", error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "welcome":
        return <div>Welcome to the Home section!</div>;
      case "request":
        return (
          <div>
            <h2>Lecturer Requests</h2>
            {lecturerRequests.length > 0 ? (
              <div className="request-container">
                {lecturerRequests.map((request) => (
                  <div key={request._id} className="request-card">
                    <p>
                      <strong>Name:</strong> {request.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {request.email}
                    </p>
                    <p>
                      <strong>Contact Number:</strong> {request.contactNumber}
                    </p>
                    <p>
                      <strong>Resume:</strong> <a href={`/${request.resume}`} target="_blank" rel="noopener noreferrer">Download Resume</a>
                    </p>
                    <p>
                      <strong>Submitted on:</strong> {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                    <div className="request-buttons">
                      <button
                        className="accept-button"
                        onClick={() => handleAcceptRequest(request)}
                      >
                        Accept
                      </button>
                      <button className="reject-button">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No lecturer requests found.</p>
            )}
          </div>
        );
      case "courses":
        return (
          <div className="wcoruses">
            <button className="addcourse" onClick={() => setIsModalOpen(true)}>
              Add Course
              <img src={addIcon} alt="Plus Icon" className="plus-icon" />
            </button>
            {isModalOpen && (
              <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <h2>Add New Course</h2>
                  <form>
                    <label>Course Name</label>
                    <input type="text" placeholder="Enter course name" />
                    <label>Department</label>
                    <input type="text" placeholder="Enter department" />
                    <label>Course Duration</label>
                    <input type="text" placeholder="Enter course duration" />
                    <label>Course Fees</label>
                    <input type="number" placeholder="Enter course fees" />
                    <label >Course Description</label>
                    <textarea placeholder="Enter course description" className="coursed"></textarea>
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
          <button className="webleft-button" onClick={() => setActiveSection("request")}>
            <img src={homeIcon} alt="Home" className="webleft-button-icon" />
            Request
          </button>
          <button className="webleft-button" onClick={() => setActiveSection("courses")}>
            <img src={infoIcon} alt="Courses" className="webleft-button-icon" />
            Courses
          </button>
          <button className="webleft-button" onClick={() => setActiveSection("settings")}>
            <img src={settingsIcon} alt="Settings" className="webleft-button-icon" />
            Settings
          </button>
          <button className="webleft-button" onClick={() => setActiveSection("profile")}>
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
