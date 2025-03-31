// src/AppRoutes.jsx

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// --- Import Your Components ---

// Common Layout/Features
import NavBar from './components/NavBar/NavBar'; // *** Import NavBar ***
import ChatBot from './components/ChatBot/ChatBot';

// Landing Page Sections (when logged out)
import Home from "./components/Home/Hero Section/Home";
import Features from './components/Home/Features/Features';
import AboutUs from './components/Home/About Us/AboutUs';
import Statistics from './components/Home/Statistics/Statistics';
import Services from './components/Home/Services/Services';
import Newsletter from './components/Home/Newsletter/Newsletter';
import Testimonials from './components/Home/Testimonials/Testimonials';
import Footer from './components/Home/Footer/Footer';

// Authentication Pages
import Login from './components/LoginSignup/Login';
import SignUp from './components/LoginSignup/SignUp';

// Authenticated Content
import Dashboard from './components/Dashboard/Dashboard';
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

  // --- Render Logic ---

  // Show loading indicator while checking auth status
  if (isLoadingAuth) {
    return <div>Loading...</div>; // Replace with a proper spinner/component if desired
  }

  return (
    <>
      {/* Render common components outside conditional routes */}
      {/* Pass auth state and logout handler to NavBar */}
      {/* NavBar will use these props to decide which button to show */}
      <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <ChatBot />

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
            {/* Pass the function to call upon successful auth */}
            <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
            <Route path="/signup" element={<SignUp onAuthSuccess={handleAuthSuccess} />} />

            {/* Redirect any other paths back to landing page when logged out */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          // --- Authenticated Routes ---
          <>
            {/* Route for the dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Add other authenticated routes here */}
            {/* Example: */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            {/* <Route path="/courses" element={<CoursesList />} /> */}

            {/* Redirect login/signup attempts back to dashboard if already logged in */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />

            {/* Redirect any other unknown paths back to dashboard when logged in */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;