const express = require('express');
const router = express.Router();

// Import individual route files
const getUserDetails = require('./getuserdetails');
router.use('/userdetails', getUserDetails);

const Login = require('./Login');
router.use('/login', Login);

const Signup = require('./signup');
router.use('/signup', Signup);

const Mylist = require('./mylist');
router.use('/', Mylist);

const ForgotPassword = require('./forgetpassword');
router.use('/', ForgotPassword);

module.exports = router;