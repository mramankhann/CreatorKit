const express = require('express');
const router = express.Router();
const { extractMediaURL } = require('../controllers/downloadController');
const { protect } = require('../middleware/authMiddleware');

// The extraction endpoint applies token protection (guests and registered users can call it)
// It does NOT apply requireRegistered because Guests are allowed to download temporarily.
router.post('/extract', protect, extractMediaURL);

module.exports = router;
