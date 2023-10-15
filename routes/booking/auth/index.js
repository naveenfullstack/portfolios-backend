const express = require('express');
const router = express.Router();

// Import individual route files
const GetIpDetails = require('./reqIp');
router.use('/', GetIpDetails);

const OtherAuth = require('./thirdPartyAuth');
router.use('/thirdparty', OtherAuth);


module.exports = router;
