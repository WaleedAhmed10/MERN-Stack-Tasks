import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'node:dns';
import cors from 'cors';
import authRoutes from './routes/auth.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);
// Load environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  console.log('Request body:', req.body);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Authentication API is running' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    console.log('Database:', mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});