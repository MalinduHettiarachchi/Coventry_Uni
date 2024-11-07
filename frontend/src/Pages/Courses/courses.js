import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../Courses/courses.css';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';

function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hoveredButton, setHoveredButton] = useState('');
  const [courses, setCourses] = useState([]);

  // Fetch courses when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      fetchCourses(selectedCategory);
    }
  }, [selectedCategory]);

  // Function to fetch courses
  const fetchCourses = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses?department=${category}`);
      setCourses(response.data); // Set the courses state
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (event) => {
    setSelectedCategory(event.target.value); // Update selected category from dropdown
  };

  const handleProgramClick = (category) => {
    setSelectedCategory(category); // Update selected category when a button is clicked
    setHoveredButton(''); // Reset hover when a button is clicked
  };

  const handleButtonHover = (category) => {
    setHoveredButton(category); // Set the hovered button
  };

  // Filter courses based on the search term and selected category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = course.department.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Navbar />
      <div className="courses-container">
        <p>Find Your Courses</p>

        <div className="input-row">
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="dropdown">
            <select value={selectedCategory} onChange={handleSelect}>
              <option value="">Select Category</option>
              <option value="computing">Computing</option>
              <option value="business">Business</option>
              <option value="engineering">Engineering</option>
              <option value="language">Language</option>
            </select>
          </div>

          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className="searchbody">
        <div className="searchbody-left">
          <p>OUR PROGRAMS</p>
          <button
            className={`left-button ${hoveredButton === 'Computing' ? 'hovered' : ''}`}
            onClick={() => handleProgramClick('computing')}
            onMouseEnter={() => handleButtonHover('Computing')}
            onMouseLeave={() => setHoveredButton('')}
          >
            School of Computing
          </button>
          <button
            className={`left-button ${hoveredButton === 'Business' ? 'hovered' : ''}`}
            onClick={() => handleProgramClick('business')}
            onMouseEnter={() => handleButtonHover('Business')}
            onMouseLeave={() => setHoveredButton('')}
          >
            School of Business
          </button>
          <button
            className={`left-button ${hoveredButton === 'Engineering' ? 'hovered' : ''}`}
            onClick={() => handleProgramClick('engineering')}
            onMouseEnter={() => handleButtonHover('Engineering')}
            onMouseLeave={() => setHoveredButton('')}
          >
            School of Engineering
          </button>
          <button
            className={`left-button ${hoveredButton === 'Language' ? 'hovered' : ''}`}
            onClick={() => handleProgramClick('language')}
            onMouseEnter={() => handleButtonHover('Language')}
            onMouseLeave={() => setHoveredButton('')}
          >
            School of Language
          </button>
        </div>

        <div className="searchbody-right">
          {/* Display content based on selected category */}
          {filteredCourses.length > 0 ? (
            <div className="course-list">
              <ul>
                {filteredCourses.map((course) => (
                  <li key={course._id}>
                    <Link to={`/course/${course._id}`} className="course-link">
                      <p><strong>Course Name:</strong> {course.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No courses available for this category.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Courses;
