import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './studentregi.css';
import Navbar from '../Navbar/navbar';

function StudentRegistration() {
  const location = useLocation();
  const { course } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register-student', {
        name: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        course: course.name,  // Send course name along with other details
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="registration-form">
        <h2>Student Registration Form</h2>
        {course ? (
          <div>
            <h3>Course: {course.name}</h3>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Fees:</strong> LKR {course.fees}</p>
            <form onSubmit={handleSubmit}>
              <label>
                Full Name
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Submit Application</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        ) : (
          <p>No course details available.</p>
        )}
      </div>
    </div>
  );
}

export default StudentRegistration;
