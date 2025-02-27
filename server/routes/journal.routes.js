const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// Create a new journal entry
router.post('/', isAuthenticated, (req, res) => {
  const { content, moodCategoryId, moodExtensiveId } = req.body;
  const userId = req.payload._id;

  const newJournalEntry = new Journal({
    userId,
    content,
    moodCategoryId,
    moodExtensiveId,
  });

  newJournalEntry
    .save()
    .then((entry) => res.status(201).json(entry))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error creating journal entry' });
    });
});

// Get all journal entries of the logged-in user with populated mood data
router.get('/', isAuthenticated, (req, res) => {
  const userId = req.payload._id;

  Journal.find({ userId })
    .populate('moodCategoryId moodExtensiveId') // Populates moodCategory and mood details
    .then((entries) => res.json(entries))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error fetching journal entries' });
    });
});

// Get a specific journal entry by its ID with populated mood data
router.get('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const userId = req.payload._id;

  Journal.findOne({ _id: id, userId })
    .populate('moodCategoryId moodExtensiveId')
    .then((entry) => {
      if (!entry)
        return res.status(404).json({ message: 'Journal entry not found' });
      res.json(entry);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error fetching journal entry' });
    });
});

// Update a journal entry and return the updated entry with populated mood data
router.put('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const { content, moodCategoryId, moodExtensiveId } = req.body;
  const userId = req.payload._id;

  Journal.findOneAndUpdate(
    { _id: id, userId },
    { content, moodCategoryId, moodExtensiveId },
    { new: true },
  )
    .populate('moodCategoryId moodExtensiveId')
    .then((updatedEntry) => {
      if (!updatedEntry)
        return res.status(404).json({ message: 'Journal entry not found' });
      res.json(updatedEntry);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error updating journal entry' });
    });
});

// Delete a journal entry
router.delete('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const userId = req.payload._id;

  Journal.findOneAndDelete({ _id: id, userId })
    .then((deletedEntry) => {
      if (!deletedEntry)
        return res.status(404).json({ message: 'Journal entry not found' });
      res.json({ message: 'Journal entry deleted successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error deleting journal entry' });
    });
});

module.exports = router;
