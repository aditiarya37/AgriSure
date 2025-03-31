// src/components/Dashboard/Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom'; // NavLink still used for internal links

// --- Import Icons ---
import {
  FaHome, FaBook, FaStore, FaRobot, FaLightbulb, FaChartLine, FaHeartbeat, FaCog, FaShoppingBag, FaMoneyCheckAlt
} from 'react-icons/fa';
import { IoGrid } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";

// --- Import Card Images --- (Ensure paths are correct)
import loanIcon from '/src/assets/loan-icon.png';
import cartIcon from '/src/assets/cart-icon.png';
import productsIcon from '/src/assets/delicious-food-background.png';
import cibilIcon from '/src/assets/credit-card.png';

// --- Placeholder Data ---
const cibilScorePlaceholder = 750;

// --- External Links ---
const cropAssistanceUrl = "https://agrisure-crop-assistance.streamlit.app/";
const marketAnalysisUrl = "https://agrisure-price-prediction.streamlit.app/";


const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // --- Handle Loading State ---
  if (authLoading) {
    return (
      <div className="dashboard-loading-container">
        <div>Loading Dashboard...</div>
      </div>
    );
  }

  // --- Determine Display Name & Score ---
  const displayName = user?.fullName || 'User';
  const displayCibilScore = user?.cibilScore || cibilScorePlaceholder;

  // --- Navigation Handler for Cards ---
  const handleNavigate = (path) => { navigate(path); };

  // --- Helper for NavLink className ---
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? "sidebar-link active" : "sidebar-link";
  };

  return (
    <div className="dashboard-layout">
      {/* --- Sidebar --- */}
      <aside className="dashboard-sidebar">
        <nav className="sidebar-nav">
          <ul>
            {/* Internal Links use NavLink */}
            <li> <NavLink to="/" end className={getNavLinkClass}> <FaHome /> <span>Home</span> </NavLink> </li>
            <li> <NavLink to="/knowledge-hub" className={getNavLinkClass}> <FaBook /> <span>Knowledge Hub</span> </NavLink> </li>
            <li> <NavLink to="/store" className={getNavLinkClass}> <FaStore /> <span>Kissan Store</span> </NavLink> </li>
            <li> <NavLink to="/ai-assistant" className={getNavLinkClass}> <FaRobot /> <span>AI Assistant</span> {user?.notifications > 0 && <span className="sidebar-badge">{user.notifications}</span>} </NavLink> </li>
            <li> <NavLink to="/crop-suggest" className={getNavLinkClass}> <FaLightbulb /> <span>Crop Suggest</span> </NavLink> </li>

            {/* --- External Link for Market Analysis --- */}
            <li>
              {/* Use standard <a> tag for external URLs */}
              <a href={marketAnalysisUrl} target="_blank" rel="noopener noreferrer" className="sidebar-link">
                 <FaChartLine /> <span>Market Analysis</span>
              </a>
            </li>
            {/* --- End External Link --- */}

            {/* --- External Link for Crop Assistance --- */}
            <li>
              {/* Use standard <a> tag for external URLs */}
              <a href={cropAssistanceUrl} target="_blank" rel="noopener noreferrer" className="sidebar-link">
                 <FaHeartbeat /> <span>Crop Assistance</span>
              </a>
            </li>
            {/* --- End External Link --- */}

          </ul>
        </nav>
        <div className="sidebar-footer">
           <ul>
             <li> <NavLink to="/setting" className={getNavLinkClass}> <FaCog /> <span>Setting</span> </NavLink> </li>
           </ul>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="dashboard-main">
        <section className="dashboard-content">
          <h2 className="welcome-heading">Welcome, {displayName}</h2>
          <div className="dashboard-cards">
             {/* Card 1: Loan */}
             <div className="dashboard-card loan-card clickable" onClick={() => handleNavigate('/microloan')} /*...*/ >
               <img src={loanIcon} alt="Apply for microloan" className="card-image" />
               <div className="card-content"> <FaMoneyCheckAlt className="card-icon" /> <h3>Loan</h3> <p>Apply Now</p> </div>
             </div>
             {/* Card 2: Your Cart */}
             <div className="dashboard-card cart-card clickable" onClick={() => handleNavigate('/cart')} /*...*/ >
                <img src={cartIcon} alt="View your shopping cart" className="card-image card-image-cart" />
                <div className="card-content"> <IoGrid className="card-icon" /> <h3>Your Cart</h3> <p>View</p> </div>
             </div>
             {/* Card 3: Products */}
             <div className="dashboard-card products-card clickable" onClick={() => handleNavigate('/store')} /*...*/ >
                <img src={productsIcon} alt="Browse agricultural products" className="card-image" />
                 <div className="card-content"> <FaShoppingBag className="card-icon" /> <h3>Products</h3> <p>View Products</p> </div>
             </div>
             {/* Card 4: CIBIL Score */}
             <div className="dashboard-card cibil-card">
                <img src={cibilIcon} alt="Check your CIBIL score" className="card-image card-image-cibil" />
                <div className="card-content"> <MdNotificationsActive className="card-icon" /> <h3>CIBIL Score</h3> <p className="cibil-score-value">{displayCibilScore}</p> </div>
             </div>
          </div>
          {/* ... other dashboard content ... */}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;