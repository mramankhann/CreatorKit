const youtubedl = require('youtube-dl-exec');

// @desc    Extract direct media URL from a social video link
// @route   POST /api/download/extract
// @access  Private (Registered & Guests permitted, no DB save)
const extractMediaURL = async (req, res) => {
  try {
    const { url, quality } = req.body;
    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    // Determine basic formatting based on quality. yt-dlp tries to find best matching.
    let format = 'bestvideo[height<=720]+bestaudio/best';
    if (quality === '1080p') format = 'bestvideo[height<=1080]+bestaudio/best';
    if (quality === 'Audio') format = 'bestaudio/best';

    // Execute yt-dlp binary silently returning JSON
    const output = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      format: format
    });

    // yt-dlp outputs a highly complex JSON object.
    // The immediate 'url' property works for basic extractors, but for complex sites (IG/TikTok),
    // it's often nestled in 'formats' or 'requested_formats'.
    let directUrl = output.url;
    
    if (!directUrl && output.formats && output.formats.length > 0) {
      directUrl = output.formats[output.formats.length - 1].url;
    }

    if (!directUrl) {
      return res.status(400).json({ message: 'Could not extract direct media URL. Link may be private.' });
    }

    res.json({
      title: output.title || 'Video',
      thumbnail: output.thumbnail || null,
      directUrl: directUrl,
      platform: output.extractor_key || 'Unknown',
      duration: output.duration || 0
    });

  } catch (error) {
    console.error('Download Extraction Error:', error.message || error);
    res.status(500).json({ message: 'Failed to extract video. The link may be private, invalid, or unsupported.' });
  }
};

module.exports = { extractMediaURL };
