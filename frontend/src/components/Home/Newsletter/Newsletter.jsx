import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="section-header">
            <p className="section-subtitle-ns">NEWSLETTER</p>
            <h2 className="section-title-ns">Stay Always In Touch</h2>
          </div>
          <p className="newsletter-text">
          Join Agri Sure to access expert farming solutions, financial support, and real-time agricultural insights.
          </p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="newsletter-input" 
              required 
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;