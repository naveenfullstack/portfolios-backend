const express = require('express');
const router = express.Router();

// Import individual route files
const loginRoute = require('./login.js');
router.use('/login', loginRoute);

const UserDetails = require('./userdetails.js');
router.use('/userdetails', UserDetails);

const ForgotPassword = require('./forgotpassword.js');
router.use('/', ForgotPassword);

const SignUp = require('./signup.js');
router.use('/signup', SignUp);

const Upload = require('./uploadProfileImage.js');
router.use('/', Upload);

module.exports = router;
