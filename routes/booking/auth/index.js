const express = require('express');
const router = express.Router();

// Import individual route files
const GetIpDetails = require('./reqIp');
router.use('/', GetIpDetails);

const OtherAuth = require('./thirdPartyAuth');
router.use('/thirdparty', OtherAuth);

const Login = require('./login');
router.use('/login', Login);

const Signup = require('./signup');
router.use('/signup', Signup);

const Checkuser = require('./chechuserexist');
router.use('/checkuser', Checkuser);

const ForgotPassword = require('./forgotpassword');
router.use('/', ForgotPassword);


module.exports = router;
