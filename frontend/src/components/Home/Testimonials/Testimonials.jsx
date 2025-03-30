import React from 'react';
import './Testimonials.css';
import "bootstrap-icons/font/bootstrap-icons.css"; // Add this import

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Cita erat ipsum et lorem et sit sed stet lorem sit cita duo justo.",
      name: "Client Name",
      role: "Profession",
      image: "path-to-client1-image.jpg"
    },
    {
      id: 2,
      quote: "Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Cita erat ipsum et lorem et sit sed stet lorem sit cita duo justo.",
      name: "Client Name",
      role: "Profession",
      image: "path-to-client2-image.jpg"
    },
    // Add more testimonials as needed
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">TESTIMONIAL</p>
          <h2 className="section-title">What Our Customers Say!</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <i className="bi bi-quote quote-icon"></i>
              <p className="testimonial-text">{testimonial.quote}</p>
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