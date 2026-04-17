const mongoose = require('mongoose');

const bioItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    niche: {
      type: String,
      required: true,
    },
    platforms: {
      type: [String],
      required: true,
    },
    tone: {
      type: String,
      default: 'Professional'
    },
    generatedBios: [
      {
        platform: { type: String, required: true },
        text: { type: String, required: true },
      }
    ],
  },
  {
    timestamps: true,
  }
);

const BioItem = mongoose.model('BioItem', bioItemSchema);
module.exports = BioItem;
