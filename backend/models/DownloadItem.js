const mongoose = require('mongoose');

const downloadItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    url: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    videoQuality: {
      type: String,
      default: '720p',
    },
    thumbnailUrl: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
  }
);

const DownloadItem = mongoose.model('DownloadItem', downloadItemSchema);
module.exports = DownloadItem;
