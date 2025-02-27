const express = require('express');
const router = express.Router();
const MoodExtensive = require('../models/Mood-Extensive.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// Create a new Mood Extensive entry
router.post('/', isAuthenticated, (req, res) => {
  const moods = req.body; // Expecting an array of mood objects

  if (!Array.isArray(moods) || moods.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing required fields or invalid data' });
  }

  // Map through the array and create MoodExtensive entries
  const moodEntries = moods.map((mood) => ({
    moodCategoryId: mood.moodCategoryId,
    mood: mood.mood,
  }));

  MoodExtensive.insertMany(moodEntries) // Insert multiple entries at once
    .then((createdMoods) => res.status(201).json(createdMoods))
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Error creating mood extensive entries' });
    });
});

// Get all Mood Extensive entries
router.get('/', isAuthenticated, (req, res) => {
  MoodExtensive.find()
    .populate('moodCategoryId') // Populate only the moodCategoryId field
    .then((moodEntries) => {
      if (!moodEntries) {
        return res
          .status(404)
          .json({ message: 'No mood extensive entries found' });
      }
      res.json(moodEntries); // Send the populated entries as response
    })
    .catch((error) => {
      console.error(error); // Log the error
      res
        .status(500)
        .json({ message: 'Error fetching mood extensive entries', error }); // Return error message
    });
});

// Get Mood Extensive entry by ID
router.get('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;

  MoodExtensive.findById(id)
    .populate('moodCategoryId')
    .then((moodExtensive) => {
      if (!moodExtensive)
        return res
          .status(404)
          .json({ message: 'Mood extensive entry not found' });
      res.json(moodExtensive);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error fetching mood extensive entry' });
    });
});

module.exports = router;
