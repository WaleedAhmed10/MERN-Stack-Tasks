import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/products.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(console.error);