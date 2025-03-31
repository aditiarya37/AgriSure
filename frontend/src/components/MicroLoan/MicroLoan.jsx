// src/components/MicroLoan/MicroLoan.jsx
import React, { useState, useEffect } from 'react';
import './MicroLoan.css'; // Import the CSS file
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa'; // Example icons

const MicroLoan = () => {
  // --- Placeholder State ---
  // Replace with actual data fetching logic using useEffect and API calls
  const [currentLoan, setCurrentLoan] = useState(null); // null = no active loan, or an object with loan details
  const [loanOffers, setLoanOffers] = useState([]);

  // Simulate fetching data on component mount
  useEffect(() => {
    // --- Simulate API Call ---
    // In reality, fetch from '/api/loans/status' and '/api/loans/offers'
    const fetchLoanData = () => {
      // Example: Setting a mock active loan
      setCurrentLoan({
        status: 'Active',
        loanId: 'MLN-789123',
        amountBorrowed: 5000,
        amountDue: 2550.75,
        nextPaymentDate: '2024-08-15',
        interestRate: 7.7,
        statusIcon: <FaCheckCircle className="icon-active" />,
        statusColorClass: 'status-active'
      });

      // Example: Setting mock loan offers
      setLoanOffers([
        { id: 1, amount: 2000, rate: 6.6, term: 6, monthlyPayment: 350.50 },
        { id: 2, amount: 5000, rate: 6.7, term: 12, monthlyPayment: 451.25 },
        { id: 3, amount: 10000, rate: 5.8, term: 18, monthlyPayment: 609.80 },
        { id: 4, amount: 1500, rate: 8.1, term: 4, monthlyPayment: 401.10 },
      ]);

      // Example: Simulate no active loan
      // setCurrentLoan(null);
    };

    fetchLoanData(); // Call the simulated fetch
  }, []); // Empty dependency array ensures this runs only once on mount


  // Handler for applying (replace with actual navigation/API call)
  const handleApplyClick = (offerId) => {
    console.log(`Apply button clicked for offer ID: ${offerId}`);
    // TODO: Navigate to application form or initiate API call
    alert(`Initiating application for loan offer ID: ${offerId}`);
  };

  return (
    <div className="microloan-page-container">

      {/* --- Current Loan Status Section --- */}
      <section className="loan-status-section">
        <h2>Your Loan Status</h2>
        {currentLoan ? (
          <div className={`loan-status-card ${currentLoan.statusColorClass}`}>
            <div className="status-header">
              {currentLoan.statusIcon || <FaInfoCircle />}
              <span>Status: {currentLoan.status}</span>
            </div>
            <div className="status-details">
              <p><strong>Loan ID:</strong> {currentLoan.loanId}</p>
              <p><strong>Amount Due:</strong> ₹{currentLoan.amountDue?.toFixed(2)}</p> {/* Added currency symbol */}
              <p><strong>Next Payment Due:</strong> {currentLoan.nextPaymentDate}</p>
              <p><strong>Interest Rate:</strong> {currentLoan.interestRate}%</p>
              <p><strong>Original Amount:</strong> ₹{currentLoan.amountBorrowed?.toFixed(2)}</p>
            </div>
            {/* Optional: Add a payment button if loan is active */}
            {/* <button className="pay-button">Make Payment</button> */}
          </div>
        ) : (
          <div className="loan-status-card status-inactive">
             <div className="status-header">
               <FaInfoCircle className="icon-inactive" />
               <span>Status: No Active Loan</span>
            </div>
            <p className="no-loan-message">You currently don't have an active microloan. Explore the offers below to get started!</p>
          </div>
        )}
      </section>

      {/* --- Available Loan Offers Section --- */}
      <section className="loan-offers-section">
        <h2>Available Microloan Offers</h2>
        {loanOffers.length > 0 ? (
          <div className="offer-cards-container">
            {loanOffers.map((offer) => (
              <div key={offer.id} className="loan-offer-card">
                <h4>Loan Amount: ₹{offer.amount}</h4> {/* Added currency symbol */}
                <div className="offer-details">
                  <p><strong>Interest Rate:</strong> {offer.rate}% p.a.</p>
                  <p><strong>Term:</strong> {offer.term} months</p>
                  <p><strong>Est. Monthly Payment:</strong> ₹{offer.monthlyPayment?.toFixed(2)}</p> {/* Added currency symbol */}
                </div>
                <button
                  className="apply-button"
                  onClick={() => handleApplyClick(offer.id)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        ) : (
           // Optional: Show a message if no offers are available
           <p className="no-offers-message">No loan offers currently available. Please check back later.</p>
        )}
      </section>

    </div>
  );
};

export default MicroLoan;