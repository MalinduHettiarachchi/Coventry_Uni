import React, { useState } from 'react';
import '../Courses/courses.css';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer'

function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (event) => {
    setSelectedCategory(event.target.value);
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
          <p>OUT PROGRAMS</p>
          <button className="left-button">Computing</button>
          <button className="left-button">Business</button>
          <button className="left-button">Engineering</button>
          <button className="left-button">Language</button>
        </div>
        <div className="searchbody-right">
          {/* Content for the right side */}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Courses;
