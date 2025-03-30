import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="section-header">
            <p className="section-subtitle">NEWSLETTER</p>
            <h2 className="section-title">Stay Always In Touch</h2>
          </div>
          <p className="newsletter-text">
            Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore. Citta erat ipsum et
            lorem et sit sed stet lorem sit citta duo justo
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