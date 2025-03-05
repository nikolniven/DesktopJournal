const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const AudioEntrySchema = new Schema({
  audio: {
    type: String, // Cloudinary URL
    required: true,
  },
  transcript: {
    type: String, // Speech-to-text result
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AudioEntry = model('AudioEntry', AudioEntrySchema);

module.exports = AudioEntry;
