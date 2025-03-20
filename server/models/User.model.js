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
    avatar: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  },
);

const User = model('User', userSchema);

module.exports = User;
