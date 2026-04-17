const express = require('express');
const router = express.Router();
const { generateBio } = require('../controllers/bioController');
const { protect } = require('../middleware/authMiddleware');

// Guests and registered users can hit this endpoint as long as they have a session token.
router.post('/generate', protect, generateBio);

module.exports = router;
