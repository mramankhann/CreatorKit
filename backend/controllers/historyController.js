const DownloadItem = require('../models/DownloadItem');
const BioItem = require('../models/BioItem');

// @desc    Get user's download history
// @route   GET /api/history/downloads
// @access  Private
const getDownloads = async (req, res) => {
  try {
    const downloads = await DownloadItem.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(downloads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add to download history
// @route   POST /api/history/downloads
// @access  Private (Registered Only)
const addDownload = async (req, res) => {
  try {
    if (req.user.isGuest) {
      return res.status(403).json({ message: 'Guests cannot save data' });
    }

    const { url, platform, videoQuality, thumbnailUrl } = req.body;
    
    const download = await DownloadItem.create({
      userId: req.user._id,
      url,
      platform,
      videoQuality,
      thumbnailUrl
    });

    res.status(201).json(download);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a single download item
// @route   DELETE /api/history/downloads/:id
// @access  Private
const deleteDownload = async (req, res) => {
  try {
    const download = await DownloadItem.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!download) {
      return res.status(404).json({ message: 'Download not found or unauthorized' });
    }

    await download.deleteOne();
    res.json({ message: 'Download removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's bio history
// @route   GET /api/history/bios
// @access  Private
const getBios = async (req, res) => {
  try {
    const bios = await BioItem.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(bios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add to bio history
// @route   POST /api/history/bios
// @access  Private (Registered Only)
const addBio = async (req, res) => {
  try {
    if (req.user.isGuest) {
      return res.status(403).json({ message: 'Guests cannot save data' });
    }

    const { niche, platforms, tone, generatedBios } = req.body;
    
    const bio = await BioItem.create({
      userId: req.user._id,
      niche,
      platforms,
      tone,
      generatedBios
    });

    res.status(201).json(bio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a single bio item
// @route   DELETE /api/history/bios/:id
// @access  Private
const deleteBio = async (req, res) => {
  try {
    const bio = await BioItem.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!bio) {
      return res.status(404).json({ message: 'Bio not found or unauthorized' });
    }

    await bio.deleteOne();
    res.json({ message: 'Bio removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear all history for a user
// @route   DELETE /api/history/clear
// @access  Private
const clearAllHistory = async (req, res) => {
  try {
    await DownloadItem.deleteMany({ userId: req.user._id });
    await BioItem.deleteMany({ userId: req.user._id });
    res.json({ message: 'All history cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDownloads,
  addDownload,
  deleteDownload,
  getBios,
  addBio,
  deleteBio,
  clearAllHistory
};
