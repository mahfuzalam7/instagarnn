// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI environment variable is not set!');
  console.log('Please add your MongoDB connection string to the Secrets tab');
} else {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));
}

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../client')));

// API route
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// Catch-all: serve index.html for frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});
