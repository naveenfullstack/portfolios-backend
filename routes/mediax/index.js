const express = require('express');
const router = express.Router();

// Import individual route files
const getUserDetails = require('../mediax/auth/index');
router.use('/auth', getUserDetails);

const Cast = require('./cast');
router.use('/cast', Cast);

const Shows = require('./Shows');
router.use('/shows', Shows);

const Videos = require('./Videos');
router.use('/videos', Videos);

module.exports = router;
