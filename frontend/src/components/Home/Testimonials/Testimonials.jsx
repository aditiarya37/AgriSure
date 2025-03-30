import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Cita erat ipsum et lorem et sit sed stet lorem sit cita duo justo.",
      name: "Client Name",
      role: "Profession",
      image: "/src/assets/profile-icon.png"
    },
    {
      id: 2,
      quote: "Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Cita erat ipsum et lorem et sit sed stet lorem sit cita duo justo.",
      name: "Client Name",
      role: "Profession",
      image: "/src/assets/profile-icon.png"
    },
  ];

  // SVG Quote Icon Component (Top only)
  const QuoteIcon = () => (
    <svg 
      width="80" 
      height="80" 
      viewBox="0 0 24 24" 
      fill="#4CAF50" 
      opacity="0.3"
      style={{
        position: 'absolute',
        top: '-60px',
        left: '10px'
      }}
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );

  return (
    <section className="testimonials-section" id="contact">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">TESTIMONIAL</p>
          <h2 className="section-title">What Our Customers Say!</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="quote-container">
                <QuoteIcon />
                <p className="testimonial-text">{testimonial.quote}</p>
              </div>
              <div className="client-info">
                <div className="client-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="client-details">
                  <h4 className="client-name">{testimonial.name}</h4>
                  <p className="client-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;