import React, { useState, useEffect } from "react";
import "./NavBar.css";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <h1 className="logo">AGRI SURE</h1>
        <ul className="nav-links">
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#store">Kissan Store</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="get-started">Get Started</button>
      </div>
    </nav>
  );
};

export default NavBar;
