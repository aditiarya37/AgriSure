// src/AppRoutes.jsx

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// --- Import Your Components ---

// Common Layout/Features
import NavBar from './components/NavBar/NavBar'; // Ensure path is correct
import ChatBot from './components/ChatBot/ChatBot'; // Ensure path is correct
import Translator from './Translator'

// Landing Page Sections (when logged out)
import Home from "./components/Home/Hero Section/Home";
import Features from './components/Home/Features/Features';
import AboutUs from './components/Home/About Us/AboutUs';
import Statistics from './components/Home/Statistics/Statistics';
import Services from './components/Home/Services/Services';
import Newsletter from './components/Home/Newsletter/Newsletter';
import Testimonials from './components/Home/Testimonials/Testimonials';
import Footer from './components/Home/Footer/Footer';

// Specific Pages
import MicroLoan from './components/MicroLoan/MicroLoan'; 

// Authentication Pages
import Login from './components/LoginSignup/Login'; // Ensure path is correct
import SignUp from './components/LoginSignup/SignUp'; // Ensure path is correct

// Authenticated Content
import Dashboard from './components/Dashboard/Dashboard';
import CropSuggestion from "./components/Crop Suggestion/CropSuggestion";
import GovSchemes from "./components/GovSchemes/GovSchemes";
import KissanStore from "./components/Kissan Store/KissanStore";
import ProductDetails from "./components/Kissan Store/ProductDetails";
import CropAssistance from "./components/Crop Assitance/CropAssistance";
// Import other authenticated components if needed
// import ProfilePage from "./components/profilePage/ProfilePage";

// --- AppRoutes Component ---

const AppRoutes = () => {
  // WARNING: Using localStorage directly is insecure and limited. Replace with AuthContext.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Handle initial check
  const navigate = useNavigate();

  // Check authentication status on initial load
  useEffect(() => {
    const token = localStorage.getItem("token"); // Use the key your context sets
    if (token) {
      // TODO: Ideally, validate token with backend here via context's checkAuth
      setIsAuthenticated(true);
      console.log("AppRoutes (useEffect): Token found, assuming authenticated.");
    } else {
      setIsAuthenticated(false);
      console.log("AppRoutes (useEffect): No token found, assuming unauthenticated.");
    }
    setIsLoadingAuth(false); // Done checking
  }, []);

  // Function called by Login/SignUp components on successful authentication
  const handleAuthSuccess = () => {
    console.log("AppRoutes: handleAuthSuccess called.");
    setIsAuthenticated(true);
    // Context's login/signup should handle setting the token.
    navigate("/"); // Navigate to the root (which will show Dashboard now)
  };

  // Function called by NavBar on logout
  const handleLogout = () => {
    console.log("AppRoutes: handleLogout called.");
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Clear the token
    // TODO: Call context's logout function to potentially invalidate token on backend
    navigate("/"); // Navigate to the root (which will show Landing Page now)
  };

  // --- Handler to navigate to login page ---
  // Called when a protected action is attempted while logged out (e.g., clicking Kissan Store)
  const handleLoginRequest = () => {
      console.log("Login requested from NavBar.");
      // Option 1: Navigate to login page (Current implementation)
      navigate("/login");
      // Option 2: If using AuthModal, trigger modal here instead
      // setAuthModalType("login");
      // setShowAuthModal(true);
   };

  // --- Render Logic ---

  // Show loading indicator while checking auth status
  if (isLoadingAuth) {
    // Replace with a more visually appealing loading component if desired
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <>
      {/* Render common components outside conditional routes */}
      {/* Pass necessary state and handlers to NavBar */}
      <NavBar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLoginRequest={handleLoginRequest} // Pass the function to trigger login
      />
      <ChatBot />
      <Translator/>
      <Routes>
        {!isAuthenticated ? (
          // --- Unauthenticated Routes ---
          <>
            {/* Route for the landing page */}
            <Route
              path="/"
              element={
                <>
                  {/* Render all landing page sections */}
                  <Home />
                  <Features />
                  <AboutUs />
                  <Statistics />
                  <Services />
                  <Newsletter />
                  <Testimonials />
                  <Footer />
                </>
              }
            />
            {/* Authentication routes */}
            <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/signup" element={<SignUp onAuthSuccess={handleAuthSuccess} />} />

            {/* Redirect any other paths back to landing page when logged out */}
            {/* Kissan Store, Microloan etc. will redirect to '/' */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          // --- Authenticated Routes ---
          <>
            {/* Route for the dashboard (root when logged in) */}
            <Route path="/" element={<Dashboard />} />

            {/* Route for MicroLoan page */}
            <Route path="/microloan" element={<MicroLoan/>} />

            {/* Add other authenticated routes here */}
            {/* Example: <Route path="/profile" element={<ProfilePage />} /> */}

            {/* Redirect login/signup attempts back to dashboard if already logged in */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />

            {/* Redirect any other unknown paths back to dashboard when logged in */}
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/crop-suggest" element={<CropSuggestion/>} />
            <Route path="/gov-schemes" element={<GovSchemes />} />
            <Route path="/store" element={<KissanStore />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/crop-assistance" element={<CropAssistance/>} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;