import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      title: "Soil Health Analysis",
      description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
      icon: "🌱"
    },
    {
      title: "Kissan Store",
      description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
      icon: "🛒"
    },
    {
      title: "Crop Intelligence System",
      description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
      icon: "🧠"
    },
    {
      title: "Loan Facility",
      description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
      icon: "💰"
    },
    {
      title: "Insurance",
      description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
      icon: "🛡️"
    },
    {
      title: "Knowledge Hub",
      description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
      icon: "📚"
    }
  ];

  return (
    <section className="services-section">
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