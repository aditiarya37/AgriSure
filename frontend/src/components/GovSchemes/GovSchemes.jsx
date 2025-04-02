// src/components/GovSchemes/GovSchemes.jsx
import React, { useState, useEffect } from 'react';
import './GovSchemes.css';

const schemesData = [
  {
    id: 1,
    title: "PM Kisan Samman Nidhi",
    benefits: "Rs. 6,000 annually to eligible farmers",
    eligibility: "Small and marginal farmers",
    category: "financial",
    region: "all",
    link: "https://pmkisan.gov.in/"
  },
  {
    id: 2,
    title: "Soil Health Card Scheme",
    benefits: "Soil testing and nutrient management",
    eligibility: "Farmers with registered land",
    category: "crop",
    region: "all",
    link: "https://www.soilhealth.dac.gov.in/"
  },
  {
    id: 3,
    title: "Kisan Credit Card (KCC)",
    benefits: "Low-interest credit for farming expenses",
    eligibility: "All farmers including tenant farmers",
    category: "financial",
    region: "all",
    link: "https://pmkisan.gov.in/KCC.aspx"
  },
  {
    id: 4,
    title: "PM Fasal Bima Yojana",
    benefits: "Crop insurance against natural calamities",
    eligibility: "Farmers growing notified crops",
    category: "insurance",
    region: "all",
    link: "https://pmfby.gov.in/"
  },
  {
    id: 5,
    title: "National Agriculture Market (eNAM)",
    benefits: "Access to a unified online market for better crop prices",
    eligibility: "All farmers, traders, and buyers",
    category: "market",
    region: "all",
    link: "https://enam.gov.in/web/"
  },
  {
    id: 6,
    title: "Rashtriya Krishi Vikas Yojana (RKVY)",
    benefits: "Funds for modern farming techniques and innovation",
    eligibility: "Farmers adopting new technology",
    category: "innovation",
    region: "all",
    link: "https://rkvy.nic.in/"
  }
];

const GovSchemes = () => {
  const [filteredSchemes, setFilteredSchemes] = useState(schemesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let filtered = schemesData;

    if (searchQuery) {
      filtered = filtered.filter(scheme =>
        scheme.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }

    setFilteredSchemes(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="govschemes-container">
      <header className="govschemes-header">
        <h1>Government Schemes</h1>
        <p className="subtitle">Stay updated with the latest schemes relevant to you.</p>
      </header>

      {/* Filters */}
      <div className="govschemes-filters">
        <input
          type="text"
          placeholder="Search schemes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="financial">Financial Aid</option>
          <option value="crop">Crop Assistance</option>
          <option value="insurance">Insurance</option>
          <option value="market">Market Access</option>
          <option value="innovation">Innovation Support</option>
        </select>
      </div>

      {/* Scheme Listings */}
      <div className="govschemes-list">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="scheme-card">
            <h2>{scheme.title}</h2>
            <p><strong>Benefits:</strong> {scheme.benefits}</p>
            <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
            <a href={scheme.link} target="_blank" rel="noopener noreferrer">Learn More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovSchemes;
