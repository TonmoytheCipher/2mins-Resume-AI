const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // Ensures no duplicate accounts
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt dates

module.exports = mongoose.model('User', userSchema);