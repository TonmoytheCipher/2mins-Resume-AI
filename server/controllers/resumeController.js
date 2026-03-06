const Resume = require('../models/Resume');

// @desc    Get ALL of the logged-in user's resumes
// @route   GET /api/resumes
// @access  Private (Requires Token)
const getResume = async (req, res) => {
  try {
    // UPGRADE: Changed .findOne() to .find() to return an ARRAY of all their resumes.
    // We also added .sort({ createdAt: -1 }) so the newest ones show up first!
    const resumes = await Resume.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    // We always return the array, even if it's empty. 
    res.status(200).json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching resumes' });
  }
};

// @desc    Create a NEW resume or UPDATE an existing one
// @route   POST /api/resumes
// @access  Private (Requires Token)
const saveResume = async (req, res) => {
  try {
    // UPGRADE: We now look for an '_id' in the request body
    const { _id, personalInfo, summary, experience, education, skills } = req.body;

    if (_id) {
      // UPDATE: If the frontend sent an _id, they are editing an existing resume.
      // We find that specific resume and update it.
      const updatedResume = await Resume.findByIdAndUpdate(
        _id,
        { personalInfo, summary, experience, education, skills },
        { new: true } // This tells Mongoose to return the newly updated document
      );
      
      if (!updatedResume) {
        return res.status(404).json({ message: 'Resume not found to update.' });
      }
      return res.status(200).json(updatedResume);
      
    } else {
      // CREATE: If there is no _id, they clicked "Create New Resume".
      // We make a brand new document linked to this user.
      const newResume = new Resume({
        userId: req.user.id,
        personalInfo,
        summary,
        experience,
        education,
        skills
      });
      
      const savedResume = await newResume.save();
      return res.status(201).json(savedResume);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving resume' });
  }
};

// @desc    Fetch a single resume by its ID
// @route   GET /api/resumes/:id
// @access  Private (Requires Token or Public depending on your routes)
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ message: 'Server error while fetching resume' });
  }
};
// Add this to your exports
exports.deleteResume = async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);
    if (!deletedResume) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { 
  saveResume,      
  getResume,       
  getResumeById 
};