// SignUp.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // useNavigate is removed as AppRoutes handles navigation now
import { useAuth } from "/src/context/AuthContext"; // Ensure path is correct
import "./SignUp.css";

// Accept onAuthSuccess as a prop
const SignUp = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate(); // Removed
  const { signup } = useAuth(); // Get signup function from context

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // --- Input Validations ---
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (formData.password.length < 6) {
       setError("Password must be at least 6 characters long!");
       return;
    }
    if (!formData.agreed) {
      setError("You must agree to the terms!");
      return;
    }
    // --- End Validations ---

    setLoading(true);

    try {
      // Prepare user data for the context function
      const userData = {
        fullName: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password
      };

      // Call the signup function from AuthContext
      // This function should handle the API call and token storage
      await signup(userData);

      console.log('Signup successful via context');

      // Call the success handler passed from AppRoutes
      // This will trigger the state change in AppRoutes, leading to dashboard view
      if (onAuthSuccess) {
        onAuthSuccess();
      } else {
        console.warn("SignUp: onAuthSuccess prop is missing!");
        // Fallback navigation if prop wasn't passed (not ideal)
        // navigate('/');
      }

    } catch (err) {
      // Catch errors from the context's signup function
      console.error('Signup error caught in component:', err);
      setError(err?.message || 'Signup failed. Please try again.'); // Use optional chaining
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Input Group: Full Name */}
          <div className="input-group">
            <span>👤</span>
            <input
              type="text"
              name="fullName"
              placeholder="Your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={loading} // Disable during loading
            />
          </div>
          {/* Input Group: Email */}
          <div className="input-group">
            <span>📧</span>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          {/* Input Group: Password */}
          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              minLength="6"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          {/* Input Group: Confirm Password */}
          <div className="input-group">
            <span>🔑</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          {/* Terms Agreement */}
          <div className="terms">
            <input
              type="checkbox"
              name="agreed"
              id="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <label htmlFor="agreed">
              I agree all statements in <Link to="/terms">Terms of service</Link>
            </label>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "REGISTER"}
          </button>
        </form>
        {/* Login Link */}
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;