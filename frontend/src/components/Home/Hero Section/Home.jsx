import React from "react";
import "./Home.css";
import farmerImage from '/src/assets/farmer.png'

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="home-container">
        <div className="home-text">
          <h1>Welcome to AgriSure</h1>
          <p>
          AgriSure empowers farmers with microloans under 7%, AI assistance, crop recommendations, health monitoring, and the Kissan Store—your one-stop solution for smarter farming and better harvests.
          </p>
          <div className="home-buttons">
            <button className="read-more-home">Read More</button>
            <button className="contact-us">Contact Us</button>
          </div>
        </div>
        <div className="home-image">
          <img src={farmerImage} alt="Farmer" />
        </div>
      </div>
    </section>
  );
};

export default Home;
