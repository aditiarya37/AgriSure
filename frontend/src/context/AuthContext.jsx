import { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../services/api'; // Make sure this path is correct

// 1. Create the context
const AuthContext = createContext();

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  // --- State Variables ---
  // Ensure these lines exist and are not commented out
  const [user, setUser] = useState(null);        // State for holding the logged-in user object (or null)
  const [loading, setLoading] = useState(true); // State to track if the initial auth check is loading

  // --- Effects ---
  // Run checkAuth once when the component mounts to see if user is already logged in
  useEffect(() => {
    console.log("AuthProvider mounted. Attempting initial checkAuth...");
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means run only on mount

  // --- Async Functions ---
  // Function to check authentication status (e.g., verify existing token)
  const checkAuth = async () => {
    console.log("checkAuth: Attempting to call authAPI.checkAuth()");
    try {
      // The request interceptor in api.js should automatically add the token
      const { data } = await authAPI.checkAuth();
      console.log("checkAuth successful. User data received:", data);
      setUser(data); // Set user state if token is valid
    } catch (err) {
      // Log the specific error structure from your api.js rejection
      console.error("checkAuth failed:", err?.message || err);
      setUser(null); // Clear user state if token is invalid or not present
      localStorage.removeItem('token'); // Clear potentially invalid token
      console.log("Token removed from localStorage due to checkAuth failure.");
    } finally {
      setLoading(false); // Stop loading indicator regardless of success/failure
    }
  };

  // Function to handle user signup
  const signup = async (userData) => {
    // No try/catch here; let the error propagate to the calling component (SignUp.jsx)
    // so it can handle UI updates (e.g., showing error messages)
    console.log("Signup function called with:", userData);
    const { data } = await authAPI.signup(userData); // Use api.js wrapper
    console.log("Signup API Response Data:", data);

    // Validate response structure from backend
    if (data && data.token && data.user) {
      console.log("Signup successful, received token:", data.token.substring(0, 10) + "...");
      localStorage.setItem('token', data.token); // Store token
      console.log("Token stored in localStorage.");
      setUser(data.user); // Update user state
      console.log("User state set:", data.user);
    } else {
      console.error("Signup Context Error: Invalid response structure or missing token/user.", data);
      // Throw an error that the SignUp component's catch block will receive
      throw new Error(data?.message || "Signup response missing token or user data.");
    }
    return data; // Return data in case the calling component needs it
  };

  // Function to handle user login
  const login = async (credentials) => {
    // No try/catch here; let error propagate to the calling component (Login.jsx)
    console.log("Login function called with:", credentials);
    const { data } = await authAPI.login(credentials); // Use api.js wrapper
    console.log("Login API Response Data:", data);

    // Validate response structure
    if (data && data.token && data.user) {
      console.log("Login successful, received token:", data.token.substring(0, 10) + "...");
      localStorage.setItem('token', data.token); // Store token
      console.log("Token stored in localStorage.");
      setUser(data.user); // Update user state
      console.log("User state set:", data.user);
    } else {
      console.error("Login Context Error: Invalid response structure or missing token/user.", data);
      throw new Error(data?.message || "Login response missing token or user data.");
    }
    return data; // Return data for the calling component
  };

  // Function to handle user logout
  const logout = async () => {
    console.log("Logout function called.");
    try {
      await authAPI.logout(); // Call backend logout endpoint (optional but good practice)
      console.log("Logout API call successful (or skipped if not implemented).");
    } catch (error) {
      // Log error but proceed with frontend logout anyway
      console.error("Error calling backend logout endpoint:", error?.message || error);
    } finally {
      localStorage.removeItem('token'); // Always remove token from storage
      console.log("Token removed from localStorage.");
      setUser(null); // Clear user state
      console.log("User state set to null.");
      // Optional: Redirect to login page
      // window.location.href = '/login';
    }
  };

  // --- Provide Context Value ---
  // Memoize the value object to prevent unnecessary re-renders of consumers
  // (Only include stable functions directly, state variables trigger re-render anyway)
  const contextValue = {
    user,
    loading,
    signup,
    login,
    logout,
    checkAuth // Expose checkAuth if needed externally, e.g., after profile update
  };

  // This is the critical part related to the error (should be around line 87)
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};