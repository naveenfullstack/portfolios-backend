const mongoose = require('mongoose');
const mediaxDB = require("../../databases/mediaxDb")

const userSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  oldpassword: { type: String},
  resetToken: {type: String},
  accessToken: {type: String},
  refreshToken: {type: String},
  lastLogin: {type: Date},
  failedLoginAttempts: {type: String},
  mylist: { type: [String] },
  is_blocked : {type: Boolean}
});

const User = mediaxDB.model('User', userSchema);

module.exports = User;