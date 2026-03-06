require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// --- ROUTE IMPORTS ---
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes'); // Restored!
const aiRoutes = require('./routes/aiRoutes');         // Restored!

// --- USE ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);                 // Restored!
app.use('/api/ai', aiRoutes);                          // Restored!

// A simple test route
app.get('/', (req, res) => {
  res.send('Resume AI Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});