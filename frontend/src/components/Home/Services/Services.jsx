import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      title: "Soil Health Analysis",
      description: "Analyze soil quality with precision to understand nutrient levels, improve fertility, and make informed decisions for better crop yields.  ",
      icon: "🌱"
    },
    {
      title: "Kissan Store",
      description: "Shop trusted seeds, fertilizers, and tools at competitive prices—your reliable marketplace for all essential farming supplies.  ",
      icon: "🛒"
    },
    {
      title: "Crop Intelligence System",
      description: "Leverage AI-powered crop recommendations and an intelligent assistant to optimize farming practices and boost productivity effortlessly.",
      icon: "🧠"
    },
    {
      title: "Loan Facility",
      description: "Secure microloans at interest rates below 7%, designed to meet your agricultural needs and support your financial growth.",
      icon: "💰"
    },
    {
      title: "CIBIL Score Checker",
      description: "Track your CIBIL score easily to enhance creditworthiness and unlock better financial opportunities for your farming ventures.",
      icon: "🛡️"
    },
    {
      title: "Knowledge Hub",
      description: "Stay updated on local government schemes, subsidies, and agricultural policies to make the most of available resources and benefits.",
      icon: "📚"
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">OUR SERVICES</p>
          <h2 className="section-title">What Do We Do?</h2>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <a href="#" className="service-link">Learn More →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;