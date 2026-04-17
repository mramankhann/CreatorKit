const express = require('express');
const router = express.Router();
const { 
  getDownloads, addDownload, deleteDownload, 
  getBios, addBio, deleteBio, clearAllHistory 
} = require('../controllers/historyController');
const { protect, requireRegistered } = require('../middleware/authMiddleware');

router.use(protect); // All history routes require a valid token

router.route('/downloads')
  .get(getDownloads)
  .post(requireRegistered, addDownload);

router.delete('/downloads/:id', deleteDownload);

router.route('/bios')
  .get(getBios)
  .post(requireRegistered, addBio);

router.delete('/bios/:id', deleteBio);

router.delete('/clear', clearAllHistory);

module.exports = router;
