import React, { useState, useRef } from "react";
import axios from "axios";
import "../LRegi/lregi.css";
import Navbar from "../Navbar/navbar";
import Footer from '../Footer/footer';

function Lregi() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState(""); // Contact number
  const [resume, setResume] = useState(null); // State for the resume file

  const resumeInputRef = useRef(); // Create a ref for the resume input field

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]); // Set the selected file to resume state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Using FormData to handle file upload
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contactNumber", contactNumber); // Adding contact number to form data
    formData.append("resume", resume); // Adding resume to form data

    try {
      const response = await axios.post("http://localhost:5000/api/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Setting multipart header for file upload
        },
      });

      alert(response.data.message); // Show success message from backend

      // Clear the form fields after successful submission
      setName(""); // Clear the name field
      setEmail(""); // Clear the email field
      setContactNumber(""); // Clear the contact number field
      setResume(null); // Clear the resume field (reset the state)

      // Reset the file input using the ref
      resumeInputRef.current.value = ""; // Reset the file input field manually

    } catch (error) {
      alert("Error registering user"); // Show error message if the submission fails
    }
  };

  return (
    <div>
      <Navbar />
      <div className="shrc">
        <div className="leftot">
          <h6>Join With US</h6>
          <p>Are You Lecturer ?</p>
        </div>
        <div className="rightot">
          <form className="lregi-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Full Name"
                className="nameinput"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <label>Email</label>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                className="emailinput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label>Contact Number</label>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Phone Number"
                className="contactNumberInput" // Updated class name
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <label>Upload Resume</label>
            <div className="form-group">
              <input
                type="file"
                className="resumeinput"
                ref={resumeInputRef} // Attach the ref here to control the file input
                onChange={handleResumeChange}
                accept=".pdf, .doc, .docx" // Accept only document formats
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Lregi;
