// routes/moodCategory.routes.js
const express = require('express');
const router = express.Router();
const MoodCategory = require('../models/Mood-Category.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// Create a new mood category
router.post('/', isAuthenticated, (req, res) => {
  const { name } = req.body;

  const newMoodCategory = new MoodCategory({ name });

  newMoodCategory
    .save()
    .then((category) => res.status(201).json(category))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error creating mood category' });
    });
});

// Get all mood categories
router.get('/', isAuthenticated, (req, res) => {
  MoodCategory.find()
    .then((categories) => res.json(categories))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error fetching mood categories' });
    });
});

// Get a specific mood category by ID
router.get('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;

  MoodCategory.findById(id)
    .then((category) => {
      if (!category)
        return res.status(404).json({ message: 'Mood category not found' });
      res.json(category);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error fetching mood category' });
    });
});

module.exports = router;
