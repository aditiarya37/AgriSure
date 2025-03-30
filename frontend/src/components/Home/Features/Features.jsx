import React from "react";
import "./Features.css";

const featuresData = [
  {
    icon: "📈",
    title: "Crop Health",
    description:
      "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
  },
  {
    icon: "🌧️",
    title: "Weather Report",
    description:
      "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
  },
  {
    icon: "💰",
    title: "Kissan Finance",
    description:
      "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
  },
];

const Features = () => {
  return (
    <section className="features">
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
