const express = require('express');
const router = express.Router();

// 1. IMPORT YOUR MODEL (Check your folder path, usually '../models/Resume')
const Resume = require('../models/Resume'); 

const { saveResume, getResume, getResumeById } = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getResume)     
  .post(protect, saveResume);  

router.get('/:id', protect, getResumeById);

// 2. ADD 'protect' middleware here too for security
router.delete('/:id', protect, async (req, res) => {
  try {
    const resumeId = req.params.id;
    
    // Now 'Resume' will be defined because of the import above
    const deletedResume = await Resume.findByIdAndDelete(resumeId);

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found in database" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;