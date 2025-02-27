const express = require('express');
const router = express.Router();
const HabitProgress = require('../models/Habit-Progress.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// Create a new habit progress entry
router.post('/', isAuthenticated, (req, res) => {
  const { userId, habitId, progress, date } = req.body;

  const newHabitProgress = new HabitProgress({
    userId,
    habitId,
    progress,
    date,
  });

  newHabitProgress
    .save()
    .then((progressEntry) => res.status(201).json(progressEntry))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error creating habit progress' });
    });
});

// Get all habit progress entries for a specific user
router.get('/user/:userId', isAuthenticated, (req, res) => {
  const { userId } = req.params;

  HabitProgress.find({ userId })
    .then((progressEntries) => res.json(progressEntries))
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Error fetching habit progress for user' });
    });
});

// Get habit progress by habit ID for a specific user
router.get('/user/:userId/habit/:habitId', isAuthenticated, (req, res) => {
  const { userId, habitId } = req.params;

  HabitProgress.find({ userId, habitId })
    .then((progressEntries) => res.json(progressEntries))
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Error fetching habit progress for habit' });
    });
});

// Update a habit progress entry
router.put('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const { progress, date } = req.body;

  HabitProgress.findByIdAndUpdate(id, { progress, date }, { new: true })
    .then((updatedProgress) => {
      if (!updatedProgress)
        return res.status(404).json({ message: 'Habit progress not found' });
      res.json(updatedProgress);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error updating habit progress' });
    });
});

// Delete a habit progress entry
router.delete('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;

  HabitProgress.findByIdAndDelete(id)
    .then((deletedProgress) => {
      if (!deletedProgress)
        return res.status(404).json({ message: 'Habit progress not found' });
      res.json({ message: 'Habit progress deleted successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error deleting habit progress' });
    });
});

module.exports = router;
