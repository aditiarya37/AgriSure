import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initSocket } from './lib/socket.js';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 5001; // Changed to 5001 as per your setup

// 1. CORS Configuration (must come first)
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend
  credentials: true,               // Required for cookies/auth
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// 2. Essential Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);

// 3. Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

// 4. Socket.IO Server Setup
const server = createServer(app);
initSocket(server); // Make sure your socket.js also handles CORS

// 5. Error Handling Middleware (should be last)
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(err.status || 500).send(err.message || 'Something broke!');
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});