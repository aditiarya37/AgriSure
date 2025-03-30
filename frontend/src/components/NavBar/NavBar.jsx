import React, { useState, useEffect } from "react";
import "./NavBar.css";
import logo from '/src/assets/AgriSure_logo.svg';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <img src={logo} alt="AgriSure Logo" className="logo-img" />
          <h1 className="logo">AGRI SURE</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
          <li><a href="#community" onClick={(e) => { e.preventDefault(); scrollToSection('community'); }}>Community</a></li>
          <li><a href="#store" onClick={(e) => { e.preventDefault(); scrollToSection('store'); }}>Kissan Store</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
        </ul>
        <button className="get-started">Get Started</button>
      </div>
    </nav>
  );
};

export default NavBar;