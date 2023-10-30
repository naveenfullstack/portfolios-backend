const express = require('express');
const router = express.Router();

// Import individual route files
const Auth = require('./auth/index');
router.use('/auth', Auth);

const Category = require('./categories');
router.use('/category', Category);

const Transaction = require('./transactions');
router.use('/transactions', Transaction);


module.exports = router;