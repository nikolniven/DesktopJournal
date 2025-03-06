const express = require('express');
const router = express.Router();
const AudioEntry = require('../models/Audio-entry.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const mongoose = require('mongoose');
const fileUploader = require('../config/multer.config');

// get all audio files
router.get('/', isAuthenticated, async (req, res) => {
  const userId = req.payload._id;
  const { startDate, endDate } = req.query;

  let filterOptions = { user: userId };

  // Add date range filter if dates are provided
  if (startDate && endDate) {
    filterOptions.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  try {
    const entries = await AudioEntry.find(filterOptions).sort({
      createdAt: -1,
    });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching audio entries:', error);
    res.status(500).json({ message: 'Error fetching audio entries' });
  }
});

// post a new audio file
router.post(
  '/',
  isAuthenticated,
  fileUploader.single('soundURL'),
  (req, res) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }

    const { transcript } = req.body;
    const userId = req.payload._id;

    const newAudioEntry = new AudioEntry({
      audio: req.file.path,
      transcript: transcript,
      user: userId,
    });

    newAudioEntry
      .save()
      .then((entry) => res.status(201).json(entry))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error creating Audio Dream entry' });
      });
  },
);

// get an audio file based on its ID
router.get('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid audio entry ID' });
  }

  AudioEntry.findById(id)
    .then((audioEntry) => {
      if (!audioEntry) {
        return res.status(404).json({ message: 'Audio entry not found' });
      }
      res.json(audioEntry);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error fetching audio entry' });
    });
});

// delete an audio file based on its ID
router.delete('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;

  AudioEntry.findOneAndDelete({ _id: id })
    .then((deletedAudioEntry) => {
      if (!deletedAudioEntry) {
        return res.status(404).json({ message: 'Audio entry not found' });
      }
      res.json({ message: 'Audio entry deleted successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error deleting audio entry' });
    });
});

module.exports = router;
