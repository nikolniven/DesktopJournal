const { Schema, model } = require('mongoose');

const HabitProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  habitStatus: { type: Boolean, required: true }, // true if habit was completed for the day
  createdAt: { type: Date, default: Date.now },
});

const HabitProgress = model('HabitProgress', HabitProgressSchema);

module.exports = HabitProgress;
