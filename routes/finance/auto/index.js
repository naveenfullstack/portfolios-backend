const express = require('express');
const router = express.Router();

// Import individual route files

const Today = require('./expencesUpdate');
router.use('/expence', Today);


module.exports = router;