const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// Get user profile
router.get('/profile', isAuthenticated, (req, res) => {
  const userId = req.payload._id; // Extract user ID from JWT payload
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      console.log(user);
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
});

// Update user profile
router.put('/profile', isAuthenticated, (req, res) => {
  const userId = req.payload._id; // Extract user ID from JWT payload
  const { password } = req.body; // Update fields

  User.findByIdAndUpdate(userId, { password }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
});

module.exports = router;
