const express = require('express');
const router = express.Router();

// Import individual route files

const Login = require('./login');
router.use('/login', Login);

const SignUp = require('./signUp');
router.use('/signup', SignUp);

const UploadImage = require('./uploadProfileImage');
router.use('/profileimage', UploadImage);

const Balance = require('./balance');
router.use('/balance', Balance);

const UserDetails = require('./userdetails');
router.use('/userdetails', UserDetails);


module.exports = router;