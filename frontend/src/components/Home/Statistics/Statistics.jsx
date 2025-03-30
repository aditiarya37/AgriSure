import React from 'react';
import './Statistics.css';

const Statistics = () => {
  return (
    <div className="statistics-container">
      <div className="statistics-grid">
        <div className="stat-item">
          <div className="stat-value">99%</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">99%</div>
          <div className="stat-label">Loans Approved</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">99%</div>
          <div className="stat-label">Insurance Claims</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">99%</div>
          <div className="stat-label">Community Members</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;