const express = require('express');
const router = express.Router();
const AudioEntry = require('../models/Audio-entry.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const mongoose = require('mongoose');
const fileUploader = require('../config/multer.config');
// router.post('/', isAuthenticated, (req, res) => {
//   const { audio } = req.body;
//   const userId = req.payload._id;

//   const newAudioEntry = new AudioEntry({
//     audio,
//     user: userId,
//   });

//   newAudioEntry
//     .save()
//     .then((entry) => res.status(201).json(entry))
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: 'Error creating Audio Dream entry' });
//     });
// });

router.post(
  '/',
  isAuthenticated,
  fileUploader.single('soundURL'),
  (req, res) => {
    console.log('uploaded file', req.file);
    console.log(req.body);
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    return;
    const { audio, transcript } = req.body;
    const userId = req.payload._id;

    const newAudioEntry = new AudioEntry({
      audio,
      transcript,
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
      res.json(entry);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error fetching audio entry' });
    });
});

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
