const { Schema, model } = require('mongoose');
// const MoodCategory = require('./Mood-Category.model'); // Reference the MoodCategory model

const MoodExtensiveSchema = new Schema({
  moodCategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'MoodCategory', // Reference the MoodCategory model
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
});

const MoodExtensive = model('MoodExtensive', MoodExtensiveSchema);

module.exports = MoodExtensive;
