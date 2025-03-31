// controllers/auth.controller.js
import User from "../models/user.model.js"; // Ensure this path is correct
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// Utility to generate JWT token string
const generateTokenString = (userId) => {
  // Ensure JWT_SECRET is loaded - crucial for token generation
  if (!process.env.JWT_SECRET) {
    console.error("FATAL: JWT_SECRET environment variable is not set!");
    // In a real app, you might throw an error here or handle it more gracefully
    // For now, logging is important. The function might return an invalid token if secret is missing.
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'default_secret_for_safety', { // Added fallback for safety, but WARN if missing
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

// --- SIGNUP FUNCTION --- (With added logging)
export const signup = async (fullName, email, password) => {
  // Log entry point and incoming data
  console.log(`[Signup Controller] Initiating signup for email: ${email}`);
  console.log(`[Signup Controller] Received data:`, { fullName, email, password: '***' }); // Mask password in logs

  try {
    // 1. Check if user already exists
    console.log(`[Signup Controller] Checking database for existing user with email: ${email}...`);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.warn(`[Signup Controller] User already exists with email: ${email}. Signup aborted.`);
      // Throw specific error for existing user
      const error = new Error("Email already exists");
      error.code = 409; // Conflict
      error.isOperational = true;
      throw error;
    }
    console.log(`[Signup Controller] No existing user found. Proceeding to create new user.`);

    // 2. Prepare new user data
    const userData = { fullName, email, password };
    console.log('[Signup Controller] Preparing user object with data:', { fullName, email, password: '***' }); // Re-log masked data before creating model instance
    const newUser = new User(userData);
    // Note: Password hashing should occur in a pre-save hook in user.model.js

    // 3. Attempt to save the new user to the database
    console.log(`[Signup Controller] Attempting to save new user for email: ${email} to database...`);
    let savedUser;
    try {
      savedUser = await newUser.save(); // *** CRITICAL STEP ***
      // Check if save returned a valid user object with an _id
      if (!savedUser || !savedUser._id) {
          console.error(`[Signup Controller] !!! User.save() completed but returned invalid data (no _id?):`, savedUser);
          throw new Error("Database save operation failed to return valid user data.");
      }
    } catch (dbError) {
      // Catch errors specifically from the .save() operation
      console.error(`[Signup Controller] !!! DATABASE SAVE ERROR for email ${email}:`, dbError.message);
      console.error(`[Signup Controller] Full DB Error:`, dbError); // Log the full error object for details (like validation errors)
      // Rethrow a more specific error, possibly including details if safe
      const saveError = new Error(`Database error during user creation: ${dbError.message}`);
      saveError.code = 500; // Internal Server Error
      throw saveError; // This will be caught by the outer catch block
    }

    // Log success if save didn't throw and returned a user with an ID
    console.log(`[Signup Controller] User SAVED successfully to database! User ID: ${savedUser._id}`);

    // 4. Generate JWT token
    console.log(`[Signup Controller] Generating JWT token for user ID: ${savedUser._id}`);
    const token = generateTokenString(savedUser._id);
    console.log(`[Signup Controller] Token generated: ${token.substring(0, 10)}...`);

    // 5. Prepare user response object (excluding password)
    const userResponse = savedUser.toObject(); // Use the saved user data
    delete userResponse.password;
    console.log(`[Signup Controller] Preparing user response object:`, userResponse);

    // 6. Return success object
    console.log(`[Signup Controller] Signup process successful for email: ${email}. Returning token and user data.`);
    return { token, user: userResponse };

  } catch (error) {
    // Catch errors from initial check, save operation, or token generation
    console.error(`[Signup Controller] --- ERROR Caught in Signup Process for email ${email} ---`);
    console.error(`[Signup Controller] Error Message:`, error.message);
    if (error.code) {
      console.error(`[Signup Controller] Error Code:`, error.code);
    }
    if (error.isOperational) {
      console.error(`[Signup Controller] Error Type: Operational`);
    } else {
      console.error(`[Signup Controller] Error Type: Unexpected/Server`);
    }
    // Log full error if it's not operational and might be unexpected
    if (!error.isOperational) {
        console.error("[Signup Controller] Full Unexpected Error:", error);
    }

    // Re-throw the error for the route handler to manage the HTTP response
    // Ensure code property is preserved if it exists
    const thrownError = new Error(error.message || "Signup failed due to an unexpected error.");
    if (error.code) thrownError.code = error.code;
    throw thrownError;
  }
};

// --- LOGIN FUNCTION --- (No changes needed based on the problem description)
export const login = async (email, password) => {
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) { /* ... error handling ... */ throw new Error("Invalid credentials"); }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) { /* ... error handling ... */ throw new Error("Invalid credentials"); }
    const token = generateTokenString(user._id);
    const userResponse = user.toObject();
    delete userResponse.password;
    return { token, user: userResponse };
  } catch (error) { /* ... error handling ... */ throw error; }
};

// --- LOGOUT FUNCTION --- (No changes needed)
export const logout = (req, res) => {
  try { /* ... clear cookie ... */ res.status(200).json({ message: "Logged out successfully" }); }
  catch (error) { /* ... error handling ... */ res.status(500).json({ message: "Internal Server Error" }); }
};

// --- CHECKAUTH FUNCTION --- (No changes needed)
export const checkAuth = (req, res) => {
  if (req.user) { res.status(200).json(req.user); }
  else { res.status(401).json({ message: 'Unauthorized: User data not found after token check.' }); }
};