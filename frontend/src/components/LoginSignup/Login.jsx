// Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // useNavigate is removed
import { useAuth } from "/src/context/AuthContext"; // Import useAuth
import "./SignUp.css"; // Assuming shared CSS

// Accept onAuthSuccess as a prop
const Login = ({ onAuthSuccess }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate(); // Removed
  const { login } = useAuth(); // Get login function from context

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
  };

  // Renamed handler for clarity
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    try {
      // Prepare credentials in the format expected by the context's login function
      const credentials = {
        email: loginData.email.toLowerCase().trim(),
        password: loginData.password
      };

      // Call the login function from AuthContext
      // This function should handle the API call and token storage
      await login(credentials);

      console.log('Login successful via context');

      // Call the success handler passed from AppRoutes
      if (onAuthSuccess) {
        onAuthSuccess();
      } else {
         console.warn("Login: onAuthSuccess prop is missing!");
         // Fallback navigation if prop wasn't passed (not ideal)
         // navigate('/');
      }

    } catch (err) {
      // Catch errors from the context's login function
      console.error('Login error caught in component:', err);
      setError(err?.message || "Login failed. Please check your credentials."); // Use optional chaining
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container"> {/* Use login-container if specific styles exist */}
      <div className="signup-box"> {/* Use login-box if specific styles exist */}
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLoginSubmit}>
          {/* Input Group: Email */}
          <div className="input-group">
            <span>📧</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
              required
              disabled={loading} // Disable during loading
            />
          </div>
          {/* Input Group: Password */}
          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="register-btn" // Use login-btn if specific styles exist
            disabled={loading}
          >
            {loading ? "Logging In..." : "LOGIN"}
          </button>
        </form>
        {/* Signup Link */}
        <p className="login-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;