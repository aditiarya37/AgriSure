import React, { useEffect, useState, useRef } from "react";
import "./AboutUs.css";
import farmerImage from "/src/assets/farmer2.png";

const progressData = [
  {
    title: "Crop Analysis",
    label: "Accurate",
    progress: 90,
    color: "green-dark", // Changed from #073B3A
  },
  {
    title: "Kissan Store",
    label: "Buy & Sale",
    progress: 85,
    color: "green-medium", // Changed from #0B6E4F
  },
  {
    title: "Kissan Finance",
    label: "Loan & Insurance",
    progress: 95,
    color: "green-light", // Changed from #08A045
  },
];

const AboutUs = () => {
  const [progress, setProgress] = useState(progressData.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
          setProgress(progressData.map((item) => item.progress));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-us-wrapper" ref={sectionRef}>
      <div className="about-us-content">
        <h1 className="title">#1 Platform for Farmers</h1>
        <p className="description">
          Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
          Clita erat ipsum et lorem et sit, sed stet no labore lorem sit clita duo justo
          eirmod magna dolore erat amet.
        </p>

        {progressData.map((item, index) => (
          <div key={index} className="progress-card">
            <div className="progress-title">{item.title}</div>
            <div className="progress-bar">
              <div
                className={`progress-fill progress-${item.color}`}
                style={{ width: `${progress[index]}%` }}
              ></div>
            </div>
            <div className="progress-label">{item.label}</div>
          </div>
        ))}

        <button className="read-more">Read More</button>
      </div>
      
      <div className="about-us-image">
        <img src={farmerImage} alt="Farmer" />
      </div>
    </div>
  );
};

export default AboutUs;