import React from "react";
import "./Home.css";
import farmerImage from '/src/assets/farmer.png'

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="home-container">
        <div className="home-text">
          <h1>Welcome to AGRI SURE</h1>
          <p>
            Tempor reburn no at dolore lorem clita reburn ipsum reburn stet dolor
            sed justo kasd. Ut dolor sed magna dolor sea diam. Sit diam sit justo
            amet ipsum vero ipsum clita lorem.
          </p>
          <div className="home-buttons">
            <button className="read-more">Read More</button>
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
