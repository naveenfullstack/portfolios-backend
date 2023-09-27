const express = require('express');
const router = express.Router();

// Import individual route files
const loginRoute = require('./Auth/index');
router.use('/auth', loginRoute);


module.exports = router;
