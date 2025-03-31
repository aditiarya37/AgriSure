import React from "react";
import "./Features.css";

const featuresData = [
  {
    icon: "📈",
    title: "Crop Health",
    description:
      "Monitor crop health with advanced AI, IoT sensors, and satellite imagery to detect diseases, optimize resources, and ensure healthier yields through real-time insights and proactive interventions.",
  },
  {
    icon: "🌧️",
    title: "Crop Suggestion",
    description:
      "Recommend the best crops for your farm with Agri Sure's Crop Recommendation System, powered by AI and machine learning. Tailored suggestions ensure optimal yields based on soil and environmental conditions.",
  },
  {
    icon: "💰",
    title: "Kissan Finance",
    description:
      "Kissan Finance offers farmers affordable microloans at 7% interest, with CIBIL score tracking to enhance financial health and creditworthiness.",
  },
];

const Features = () => {
  return (
    <section className="features" id="about">
      <p className="feature-subtitle">OUR FEATURES</p>
      <div className="features-container">
        {featuresData.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
