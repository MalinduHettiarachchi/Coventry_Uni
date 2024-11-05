import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar"; // Adjust the path if necessary
import ST1 from "../Home/st1.png";
import ST2 from "../Home/st2.png";
import ST3 from "../Home/st3.png";
import searchIcon from "../Home/sicon.png"; // Adjust path to your icon
import '../Home/home.css';
import Partners from '../Partners/partners'

const images = [
  ST1,
  ST2,
  ST3,
  // Add more image paths as needed
];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="slideshow-container">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="slideshow-image"
        />
        <div className="slideshow-text">Coventry University</div>
        <div className="search-bar-container">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            placeholder="Search our courses" 
            className="search-bar"
          />
          <img src={searchIcon} alt="search icon" className="search-icon" />
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why LUXN Card is awesome ?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <span className="feature-icon">🌍</span>
            <h3>Sustainable Solution</h3>
            <p>Forget about printing hundreds of business cards to share a limited amount of information.</p>
          </div>
          <div className="feature-card1">
            <span className="feature-icon">💰</span>
            <h3>No Monthly Fees</h3>
            <p>One LUXN card. Unlimited taps. No monthly subscription. Never buy business cards again.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💧</span>
            <h3>Water Resistant</h3>
            <p>LUXN card is a waterproof business card. So the durability of the LUXN card is remarkable.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⏱️</span>
            <h3>Save The Time</h3>
            <p>Share your information effortlessly with a single tap, saving valuable time for both you and the recipient.</p>
          </div>
        </div>
      </div>
      <Partners/>
      
    </div>
  );
}

export default Home;
