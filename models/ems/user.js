const mongoose = require('mongoose');
const emsDb = require("../../databases/emsDb");

const userSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  image: {type: String, required: true},
  companyName: {type: String, required: true},
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  oldpassword: { type: String},
  resetToken: {type: String},
  accessToken: {type: String},
  refreshToken: {type: String},
  lastLogin: {type: Date},
  failedLoginAttempts: {type: String},
  permission: { type: [String] },
  emplyees: { type: [String] },
  projects: { type: [String] },
  announcements: { type: [String] },
  approval: { type: [String] },
  appointments: { type: [String] },
  Candidates: { type: [String] },
  is_blocked : {type: Boolean},
  is_paid : {type: Boolean}
});

const User = emsDb.model('User', userSchema);

module.exports = User;