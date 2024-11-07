import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../Courses/details.css';
import Navbar from "../Navbar/navbar";

function CourseDetails() {
  const { courseId } = useParams(); // Get courseId from the URL
  const [course, setCourse] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch the details for the course
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/${courseId}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleApplyNow = () => {
    // Navigate to StudentRegistration page and pass course data as state
    navigate("/student-registration", { state: { course } });
  };

  return (
    <div>
      <Navbar />
      {course ? (
        <div className="course-details">
          <h2>{course.name}</h2>
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Course Fees:</strong> LKR {course.fees}</p>

          {/* Apply Now Button */}
          <button className="apply-now-btn" onClick={handleApplyNow}>Apply Now</button>
        </div>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
}

export default CourseDetails;