const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const JournalEntrySchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  moodCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MoodCategory',
    required: true,
  },
  moodExtensiveId: { type: mongoose.Schema.Types.ObjectId, ref: 'MoodExtensive', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Journal = model('Journal', JournalEntrySchema);

module.exports = Journal;
