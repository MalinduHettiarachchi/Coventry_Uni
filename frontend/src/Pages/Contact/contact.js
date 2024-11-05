import React from "react";
import "../Contact/contact.css";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";

function Contact() {
  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <div className="contact-info">
          <p>
            <i className="fas fa-envelope"></i> <strong>Email:</strong>{" "}
            coventry@gmail.com
          </p>
          <p>
            <i className="fas fa-phone-alt"></i> <strong>Hotline:</strong> +94
            71 169 1008
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> <strong>Address:</strong>{" "}
            COVENTRY, Hakmana Road, Gabada Veediya, Matara, LK
          </p>
          
          <div className="social-media">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-tiktok"></i>
          </div>
        </div>
        <div className="contact-form">
          <h2>Contact Us</h2>
          <div className="form-row">
            <input type="text" placeholder="Your Name" className="form-input" />
            <input type="email" placeholder="Your Email" className="form-input" />
          </div>
          <input type="text" placeholder="Mobile" className="form-input" />
          <input type="text" placeholder="Subject" className="form-input" />
          <textarea
            placeholder="Your Message"
            className="form-input message-input"
          ></textarea>
          <button type="submit" className="submit-button">
            SUBMIT
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
