import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CourseDetails() {
  const { courseId } = useParams(); // Get courseId from the URL
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
        if (response.data) {
          setCourse(response.data); // Set course data
          setError(null); // Reset error state if the request is successful
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError('Could not fetch course details. Please try again later.');
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (error) {
    return <div className="error">{error}</div>; // Display error message
  }

  return (
    <div>
      {course ? (
        <div className="course-details">
          <h2>{course.name}</h2>
          <p><strong>Department:</strong> {course.department}</p>
          <p><strong>Description:</strong> {course.description}</p>
          {/* Add more details as necessary */}
        </div>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
}

export default CourseDetails;
    