const { Schema, model } = require('mongoose');

const MoodCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const MoodCategory = model('MoodCategory', MoodCategorySchema);

module.exports = MoodCategory;
