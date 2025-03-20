const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require('../middleware/jwt.middleware.js');
// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;
const validator = require('validator');

// POST /auth/signup  - Creates a new user in the database
router.post('/signup', (req, res, next) => {
  const { email, password, name } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === '' || password === '' || name === '') {
    res.status(400).json({ message: 'Provide email, password and name' });
    return;
  }

  // This regular expression check that the email is of a valid format
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isEmailOk = validator.isEmail(email);
  if (!isEmailOk) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }

  const isPasswordStrong = validator.isStrongPassword(password, {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  });

  if (!isPasswordStrong) {
    res.status(400).json({
      message:
        'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
    });
    return;
  }

  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: 'User already exists.' });
        return;
      }
      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({ email, password: hashedPassword, name });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, name, _id } = createdUser;
      // Create a new object that doesn't expose the password
      const user = { email, name, _id };
      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  // Check if email or password are provided as empty string
  if (email === '' || password === '') {
    res.status(400).json({ message: 'Provide email and password.' });
    return;
  }
  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: 'User not found.' });
        return;
      }
      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name, avatar } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name, avatar };

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '6h',
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: 'Unable to authenticate the user' });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  // console.log(`req.payload`, req.payload);
  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

// POST /auth/logout - Logs out the user
router.post('/logout', isAuthenticated, (req, res) => {
  res.status(200).json({ message: 'User was logged out successfully' });
});

router.put('/change-password', isAuthenticated, async (req, res) => {
  const { previousPassword, newPassword } = req.body;
  const userId = req.payload._id;

  try {
    const foundUser = await User.findById(userId);
    // console.log('Previous Password:', previousPassword);
    // console.log('Found User:', foundUser);
    // console.log('Found User Password:', foundUser?.password);

    if (!foundUser) {
      return res.status(401).json({ message: 'User not found.' });
    }

    const passwordCorrect = bcrypt.compareSync(
      previousPassword,
      foundUser.password,
    );
    if (!passwordCorrect) {
      return res.status(401).json({ message: 'Wrong old password' });
    }

    const isPasswordStrong = validator.isStrongPassword(newPassword, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    });

    if (!isPasswordStrong) {
      return res.status(400).json({
        message:
          'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
      });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(401).json({ message: 'User not found.' });
    }

    res.json({ message: 'Password has been updated' });
  } catch (error) {
    console.log('Changing password Error!', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
