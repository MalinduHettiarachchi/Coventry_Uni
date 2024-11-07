import React, { useState, useEffect } from "react";
import axios from "axios";
import WNavbar from "../WNavbar/wnavbar";
import "./wdash.css";
import homeIcon from "./reqi.png";
import infoIcon from "./reqi.png";
import settingsIcon from "./reqi.png";
import userIcon from "./reqi.png";

function WDash() {
  const [activeSection, setActiveSection] = useState("welcome");
  const [lecturerRequests, setLecturerRequests] = useState([]);
  const [courseData, setCourseData] = useState({
    name: "",
    department: "",
    duration: "",
    fees: "",
    description: "",
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (activeSection === "request") {
      fetchLecturerRequests();
    } else if (activeSection === "addlecturer") {
      fetchCourses();  // Fetch courses when "Add Lecturer" section is active
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

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAcceptRequest = async (request) => {
    try {
      const password = `L${request.name.slice(0, 2)}${request.contactNumber}`;
      const lecturerData = {
        name: request.name,
        email: request.email,
        contactNumber: request.contactNumber,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:5000/api/lecturer",
        lecturerData
      );
      console.log(response.data);
      alert("Lecturer added successfully!");
    } catch (error) {
      console.error("Error adding lecturer:", error);
    }
  };

  const handleCourseChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/courses", courseData);
      console.log(response.data);
      alert("Course added successfully!");
      setCourseData({
        name: "",
        department: "",
        duration: "",
        fees: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
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
                    <p><strong>Name:</strong> {request.name}</p>
                    <p><strong>Email:</strong> {request.email}</p>
                    <p><strong>Contact Number:</strong> {request.contactNumber}</p>
                    <p><strong>Resume:</strong> 
                      <a href={`/${request.resume}`} target="_blank" rel="noopener noreferrer">
                        Download Resume
                      </a>
                    </p>
                    <p><strong>Submitted on:</strong> 
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                    <div className="request-buttons">
                      <button className="accept-button" onClick={() => handleAcceptRequest(request)}>
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
          <form className="course-form" onSubmit={handleCourseSubmit}>
            <label>Course Name</label>
            <input type="text" name="name" value={courseData.name} onChange={handleCourseChange} placeholder="Enter course name" required />
            <label>Department</label>
            <select name="department" value={courseData.department} onChange={handleCourseChange} required>
              <option value="">Select Department</option>
              <option value="Computering">Computering</option>
              <option value="Business">Business</option>
              <option value="Engineering">Engineering</option>
              <option value="Language">Language</option>
            </select>
            <label>Course Duration</label>
            <input type="text" name="duration" value={courseData.duration} onChange={handleCourseChange} placeholder="Enter course duration" required />
            <label>Course Fees</label>
            <input type="number" name="fees" value={courseData.fees} onChange={handleCourseChange} placeholder="Enter course fees" required />
            <label>Course Description</label>
            <textarea name="description" value={courseData.description} onChange={handleCourseChange} placeholder="Enter course description" className="coursed" required></textarea>
            <button type="submit" className="adc">Add</button>
          </form>
        );
      case "addlecturer":
        return (
          <div>
            <h2>Courses</h2>
            {courses.length > 0 ? (
              <div className="ccourses-container">
                {courses.map((course) => (
                  <div key={course._id} className="ccourse-card">
                    <p><strong>Course Name:</strong> {course.name}</p>
                    <p><strong>Department:</strong> {course.department}</p>
                    <p><strong>Duration:</strong> {course.duration}</p>
                    <p><strong>Fees:</strong> ${course.fees}</p>
                    <p><strong>Description:</strong> {course.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No courses found.</p>
            )}
          </div>
        );
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
            <img src={homeIcon} alt="Home" className="webleft-button-icon" />Request
          </button>
          <button className="webleft-button" onClick={() => setActiveSection("courses")}>
            <img src={infoIcon} alt="Courses" className="webleft-button-icon" />Add Courses
          </button>
          <button className="webleft-button" onClick={() => setActiveSection("addlecturer")}>
            <img src={settingsIcon} alt="Add Lecturer" className="webleft-button-icon" />Add Lecturer
          </button>
          <button className="webleft-button" onClick={() => setActiveSection("profile")}>
            <img src={userIcon} alt="Profile" className="webleft-button-icon" />Profile
          </button>
        </div>
        <div className="webright">{renderContent()}</div>
      </div>
    </div>
  );
}

export default WDash;
