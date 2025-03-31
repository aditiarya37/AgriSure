// routes/auth.routes.js
import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Enhanced signup route
router.post("/signup", async (req, res) => {
    try {
      // ... (validation) ...
      const { fullName, email, password } = req.body; // Use fullName
      // Call the signup controller function which should now return { token, user }
      const authResult = await signup(fullName, email, password); // Make sure signup controller returns { token, user }
  
      // Set cookie if needed (can also be done in controller)
      res.cookie('token', authResult.token, { httpOnly: true, /* other options */ });
  
      // Respond with success AND the data expected by frontend
      return res.status(201).json({
        success: true,
        token: authResult.token, // Include token
        user: authResult.user    // Include user
      });
    } catch (error) {
      // ... (error handling) ...
    }
  });


// Enhanced login route
router.post('/login', async (req, res) => {
    try {
      // ... (validation) ...
      const { email, password } = req.body;
      // Call the login controller function which should now return { token, user }
      const authResult = await login(email, password); // Make sure login controller returns { token, user }
  
      // Set cookie if needed (can also be done in controller)
      res.cookie('token', authResult.token, { httpOnly: true, /* other options */ });
  
      // Respond with the data expected by frontend
      res.status(200).json({
          token: authResult.token, // Include token
          user: authResult.user    // Include user
      });
    } catch (error) {
        // ... (error handling - make sure it sends JSON) ...
        res.status(400).json({
           error: 'Authentication Failed',
           message: error.message
        });
    }
  });

router.get('/check', verifyToken, (req, res) => {
    // If verifyToken middleware succeeds, req.user will be populated
    res.status(200).json(req.user);
});

export default router;