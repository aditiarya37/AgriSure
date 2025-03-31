// src/components/NavBar.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import "./NavBar.css";
import logo from '/src/assets/AgriSure_logo.svg';

// Accept isAuthenticated and onLogout as props
const NavBar = ({ isAuthenticated, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Effect for handling navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function for smooth scrolling to sections (mainly for landing page)
  const scrollToSection = (sectionId) => {
    // Check if we are on the landing page route where sections exist
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`scrollToSection: Element with ID '${sectionId}' not found on current page.`);
      }
    } else {
      // If not on landing page, navigate first, then try to scroll
      navigate('/');
      // Use setTimeout to allow navigation and potential re-render before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
           console.warn(`scrollToSection: Element with ID '${sectionId}' not found after navigating to '/'.`);
        }
      }, 100); // Adjust timeout if needed
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo-container">
          {/* Use Link for the logo to navigate home */}
          <Link to="/" className="logo-link-wrapper">
            <img src={logo} alt="AgriSure Logo" className="logo-img" />
            <h1 className="logo">AGRISURE</h1>
          </Link>
        </div>
        <ul className="nav-links">
          {/* Use onClick handlers for smooth scrolling */}
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
          <li><a href="#community" onClick={(e) => { e.preventDefault(); scrollToSection('community'); }}>Community</a></li>
          <li><a href="#store" onClick={(e) => { e.preventDefault(); scrollToSection('store'); }}>Kissan Store</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
           {/* Example: Conditionally show a link only when logged in */}
           {/* {isAuthenticated && <li><Link to="/dashboard">Dashboard</Link></li>} */}
        </ul>

        {/* --- Conditional Button Rendering --- */}
        <div className="auth-actions"> {/* Optional wrapper div */}
          {isAuthenticated ? (
            // If authenticated, show Logout button
            // onClick should call the onLogout function passed from AppRoutes
            <button
              className="navbar-button logout-button" // Use a common class + specific class
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            // If not authenticated, show "Get Started" button
            // Use Link component for navigation to signup page
            <Link to="/signup" className="navbar-button get-started-button">
              Get Started
            </Link>
            // Alternatively, separate Login/Signup buttons:
            // <>
            //   <Link to="/login" className="navbar-button login-button">Login</Link>
            //   <Link to="/signup" className="navbar-button signup-button">Sign Up</Link>
            // </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;