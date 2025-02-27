const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    profilePicture: {
      type: String,
    }, // URL to profile image
    habit: {
      type: String,
    }, // The habit user is tracking
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  },
);

const User = model('User', userSchema);

module.exports = User;
