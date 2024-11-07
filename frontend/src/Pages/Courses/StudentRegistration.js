import React from 'react';
import { useLocation } from 'react-router-dom';
import './studentregi.css';
import Navbar from '../Navbar/navbar';

function StudentRegistration() {
  const location = useLocation(); // Access the passed state
  const { course } = location.state || {}; // Destructure course details from state

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

            <form>
              {/* Add your form fields here */}
              <label>
                Full Name
                <input type="text" required />
              </label>
              <label>
                Email
                <input type="email" required />
              </label>
              <label>
                Phone Number
                <input type="tel" required />
              </label>
              <button type="submit">Submit Application</button>
            </form>
          </div>
        ) : (
          <p>No course details available.</p>
        )}
      </div>
    </div>
  );
}

export default StudentRegistration;