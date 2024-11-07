import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Get() {
  const [courses, setCourses] = useState([]);  // State to store the course data
  const [error, setError] = useState(null);  // State to handle any errors

  // UseEffect hook to fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');  // API to get courses
        setCourses(response.data);  // Set the course data to state
      } catch (err) {
        setError("Failed to fetch courses");  // Handle errors
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();  // Call the function to fetch data
  }, []);  // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <h2>Course Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if any */}
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <strong>{course.name}</strong><br />
              Department: {course.department}<br />
              Duration: {course.duration}<br />
              Fees: {course.fees}<br />
              Description: {course.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}

export default Get;
