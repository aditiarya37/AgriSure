import React from 'react';
import './Footer.css';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Address Section */}
          <div className="footer-column">
            <h3 className="footer-title">ADDRESS</h3>
            <ul className="footer-list">
              <li>Gharuan, Mohali, Punjab</li>
              <li>+91-7004x300xx</li>
              <li>info@agrisure.com</li>
            </ul>
            <div className="social-icons">
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-column">
            <h3 className="footer-title">QUICK LINK</h3>
            <ul className="footer-list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Condition</a></li>
              <li><a href="#">Help</a></li>
            </ul>
          </div>

          {/* Info Section */}
          <div className="footer-column">
            <h3 className="footer-title">INFO</h3>
            <p className="footer-text">
            Agri Sure empowers farmers with microloans under 7%, AI assistance, crop recommendations, health monitoring, and the Kissan Store—your one-stop solution for smarter farming and better harvests.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="footer-column">
            <h3 className="footer-title">NEWSLETTER</h3>
            <p className="footer-text">
            Join Agri Sure to access expert farming solutions, financial support, and real-time agricultural insights.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="newsletter-input" 
              />
              <button type="submit" className="newsletter-button-f">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  style={{ transform: 'translateX(-8px)'}}
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <div className="copyright">
            &copy; Agri Sure, All Right Reserved.
          </div>
          <div className="footer-links">
            <a href="#">Home</a>
            <a href="#">Cookies</a>
            <a href="#">Help</a>
            <a href="#">FAQs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;