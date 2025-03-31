import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(
      "mongodb+srv://aditiarya:agrisure@cluster0.lib9iuy.mongodb.net/agrisure?retryWrites=true&w=majority"
    );
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to DB');
  console.log("✅ Database name:", mongoose.connection.name);
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('⏏️  Mongoose connection closed due to app termination');
  process.exit(0);
});

export { connectDB };