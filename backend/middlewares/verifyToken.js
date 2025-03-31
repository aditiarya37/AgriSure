// middlewares/verifyToken.js (or middleware/verifyToken.js)
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Verify this path

export const verifyToken = async (req, res, next) => {
    console.log("\n--- Verifying Token Middleware ---"); // Add newline for clarity

    // Log incoming request details
    console.log("Request Path:", req.path);
    console.log("Cookies Received:", req.cookies); // Requires cookie-parser to be run first!
    console.log("Authorization Header:", req.headers.authorization);

    // --- Token Extraction ---
    let token = null;
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
        console.log("Token found in cookies.");
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
        console.log("Token found in Authorization header.");
    }

    if (!token) {
        console.log("Verification Failed: No token found in cookies or Authorization header.");
        // Ensure consistent response format if needed
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    console.log("Token Found:", token.substring(0, 10) + "..."); // Log first few chars

    // --- Token Verification ---
    try {
        // Check if JWT_SECRET is loaded
        if (!process.env.JWT_SECRET) {
             console.error("FATAL: JWT_SECRET environment variable is not set!");
             return res.status(500).json({ success: false, message: 'Internal Server Error: Missing secret key configuration.' });
        }
        console.log("Attempting to verify token...");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token Decoded Successfully:", decoded);

        // --- User Lookup ---
        // Ensure decoded payload has the user identifier (e.g., userId)
        if (!decoded.userId) {
             console.log("Verification Failed: Token payload does not contain 'userId'.");
             return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token payload.' });
        }
        console.log(`Looking up user with ID: ${decoded.userId}`);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            console.log("Verification Failed: User from token not found in database.");
            // Consider 404, but 401 might also be appropriate as the token *was* valid but user doesn't exist anymore
            return res.status(401).json({ success: false, message: 'Unauthorized: User associated with token not found.' });
        }

        // --- Success ---
        req.user = user; // Attach user to request
        console.log(`Verification Successful. User '${user.email}' attached to req.user.`);
        next(); // Proceed to the actual route handler (checkAuth controller)

    } catch (error) {
        console.error("Token Verification Error:", error.name, "-", error.message);
        if (error.name === 'TokenExpiredError') {
             return res.status(401).json({ success: false, message: 'Unauthorized: Token expired.' });
        }
        if (error.name === 'JsonWebTokenError') {
            // Provides more specific reasons like 'invalid signature', 'jwt malformed'
            return res.status(401).json({ success: false, message: `Unauthorized: ${error.message}.` });
        }
        // Generic catch-all for other verification errors
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token.' });
    }
    console.log("--- End Verify Token ---");
};