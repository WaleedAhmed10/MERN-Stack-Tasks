import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const feedbackSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comments: {
    type: String
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).send(feedback);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.send(feedbacks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/feedbacks/:subject', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ subject: req.params.subject });
    res.send(feedbacks);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});