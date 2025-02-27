// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// 👇 Start handling routes here

// Index route
const indexRoutes = require('./routes/index.routes');
app.use('/api', indexRoutes);

// Auth routes
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

// User routes
const userRoutes = require('./routes/user.routes');
app.use('/user', userRoutes);

// Journal routes
const journalRoutes = require('./routes/journal.routes');
app.use('/journal', journalRoutes);

// Mood category routes
const moodCategoryRoutes = require('./routes/moodCategory.routes');
app.use('/mood-categories', moodCategoryRoutes);

// Mood extensive routes (fixed moods list)
const moodExtensiveRoutes = require('./routes/moodExtensive.routes');
app.use('/moods-extensive', moodExtensiveRoutes);

// Habit progress routes
const habitProgressRoutes = require('./routes/habitProgress.routes');
app.use('/habit-progress', habitProgressRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
