import React, { useState } from 'react';
import '../Courses/courses.css';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';

function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hoveredButton, setHoveredButton] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (event) => {
    setSelectedCategory(event.target.value); // Update the selected category when dropdown value changes
  };

  const handleProgramClick = (category) => {
    setSelectedCategory(category); // Update selected category when a button is clicked
    setHoveredButton(''); // Reset hover when a button is clicked
  };

  const handleButtonHover = (category) => {
    setHoveredButton(category); // Set the hovered button
  };

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
          {selectedCategory === 'computing' && (
            <div className="course-list">
              <p>Displaying Computing Courses...</p>
              <ul>
                <li>Higher National Diploma in Digital Filmmaking</li>
                <li>Higher National Diploma in Network Engineering (Part Time)</li>
                <li>Higher National Diploma in Software Engineering (Part Time)</li>
                <li>Higher National Diploma in Network Engineering (Full Time)</li>
                <li>Higher National Diploma in Information Systems (Full Time)</li>
                <li>Higher National Diploma in Software Engineering (Full Time)</li>
                <li>Higher National Diploma in Computer Science with Artificial Intelligence</li>
              </ul>
            </div>
          )}
          {selectedCategory === 'business' && (
            <div className="course-list">
              <p>Displaying Business Courses...</p>
              <ul>
                <li>Higher National Diploma in Business Management</li>
                <li>Higher National Diploma in Marketing</li>
                <li>Higher National Diploma in Accounting</li>
                <li>Higher National Diploma in Business Administration</li>
                <li>Higher National Diploma in Entrepreneurship</li>
                <li>Higher National Diploma in Human Resource Management</li>
              </ul>
            </div>
          )}
          {selectedCategory === 'engineering' && (
            <div className="course-list">
              <p>Displaying Engineering Courses...</p>
              <ul>
                <li>Higher National Diploma in Civil Engineering</li>
                <li>Higher National Diploma in Mechanical Engineering</li>
                <li>Higher National Diploma in Electrical Engineering</li>
                <li>Higher National Diploma in Electronics Engineering</li>
                <li>Higher National Diploma in Industrial Engineering</li>
                <li>Higher National Diploma in Chemical Engineering</li>
              </ul>
            </div>
          )}
          {selectedCategory === 'language' && (
            <div className="course-list">
              <p>Displaying Language Courses...</p>
              <ul>
                <li>Higher National Diploma in English Language</li>
                <li>Higher National Diploma in French Language</li>
                <li>Higher National Diploma in Spanish Language</li>
                <li>Higher National Diploma in German Language</li>
                <li>Higher National Diploma in Chinese Language</li>
                <li>Higher National Diploma in Japanese Language</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Courses;
