const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  // This links the resume directly to the user who created it
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  personalInfo: {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
  },
  summary: { type: String, default: '' },
  experience: [{
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    description: String,
  }],
  education: [{
    school: String,
    degree: String,
    fieldOfStudy: String,
    graduationYear: String,
  }],
  skills: [{ type: String }] // An array of text strings (e.g., ["JavaScript", "React", "Node.js"])
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);