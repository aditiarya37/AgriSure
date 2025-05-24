import React from 'react';
import './Dashboard.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  FaHome, FaBook, FaStore, FaRobot, FaLightbulb, FaChartLine, 
  FaMoneyCheckAlt
} from 'react-icons/fa';
import { IoGrid } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import ChatBot from '../ChatBot/ChatBot';

// --- Import Card Images ---
import loanIcon from '/src/assets/loan-icon.png';
import cartIcon from '/src/assets/cart-icon.png';
import productsIcon from '/src/assets/delicious-food-background.png';
import cibilIcon from '/src/assets/credit-card.png';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className="dashboard-loading-container">
        <div>Loading Dashboard...</div>
      </div>
    );
  }

  const displayName = user?.fullName || 'User';
  const displayCibilScore = user?.cibilScore || 750;

  const handleNavigate = (path) => navigate(path);

  return (
    <div className="dashboard-layout">
      {/* --- Sidebar --- */}
      <aside className="dashboard-sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="/" end>
                <FaHome className="nav-icon" /> <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/knowledge-hub">
                <FaBook className="nav-icon" /> <span>Knowledge Hub</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/store">
                <FaStore className="nav-icon" /> <span>Kissan Store</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="#" onClick={(e) => { e.preventDefault(); document.querySelector('.chat-icon')?.click(); }}>
                <FaRobot className="nav-icon" /> <span>AI Assistant</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/crop-suggest">
                <FaLightbulb className="nav-icon" /> <span>Crop Suggest</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/gov-schemes">
                <FaMoneyCheckAlt className="nav-icon" /> <span>Gov. Schemes</span>
              </NavLink>
            </li>
            <li>
              <a href="https://agrisure-price-prediction.streamlit.app/" target="_blank" rel="noopener noreferrer">
                <FaChartLine className="nav-icon" /> <span>Market Analysis</span>
              </a>
            </li>
            <li>
              <NavLink to="/crop-assistance">
                <MdNotificationsActive className="nav-icon" /> <span>Crop Assistance</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* --- Main Content --- */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Welcome, {displayName}</h2>
        </header>

        <section className="dashboard-content">
          <div className="dashboard-cards">
            {/* Card 1: Loan */}
            <div className="dashboard-card" onClick={() => handleNavigate('/microloan')}>
              <img src={loanIcon} alt="Loan" className="card-image card-image-left" />
              <div className="card-content">
                <FaMoneyCheckAlt className="card-icon" />
                <h3>Loan</h3>
                <p>Apply Now</p>
              </div>
            </div>

            {/* Card 2: Cart */}
            <div className="dashboard-card" onClick={() => handleNavigate('/cart')}>
              <img src={cartIcon} alt="Your Cart" className="card-image" />
              <div className="card-content">
                <IoGrid className="card-icon" />
                <h3>Your Cart</h3>
                <p>View</p>
              </div>
            </div>

            {/* Card 3: Products */}
            <div className="dashboard-card" onClick={() => handleNavigate('/store')}>
              <img src={productsIcon} alt="Products" className="card-image card-image-left" />
              <div className="card-content">
                <FaStore className="card-icon" />
                <h3>Products</h3>
                <p>Browse</p>
              </div>
            </div>

            {/* Card 4: CIBIL Score */}
            <div className="dashboard-card">
              <img src={cibilIcon} alt="CIBIL Score" className="card-image" />
              <div className="card-content">
                <MdNotificationsActive className="card-icon" />
                <h3>CIBIL Score</h3>
                <p className="cibil-score">{displayCibilScore}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ChatBot component with floating button */}
      <ChatBot />
    </div>
  );
};

export default Dashboard;