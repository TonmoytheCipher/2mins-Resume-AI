const express = require('express');
const router = express.Router();
// Update this line to import both functions
const { generateDescription, generateSummary } = require('../controllers/aiController');

router.post('/generate', generateDescription);
// Add this new route:
router.post('/generate-summary', generateSummary);

module.exports = router;