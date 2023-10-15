const mongoose = require('mongoose');
const emsDb = require("../../databases/bookDb");

const userSchema = new mongoose.Schema({
  firstname: {type: String},
  lastname: {type: String},
  profileImage: {type: String},
  username: { type: String},
  email: { type: String, required: true },
  password: { type: String},
  oldpassword: { type: String},
  resetToken: {type: String},
  accessToken: {type: String},
  refreshToken: {type: String},
  lastLogin: {type: Date},
  failedLoginAttempts: {type: Number},
});

const User = emsDb.model('User', userSchema);

module.exports = User;