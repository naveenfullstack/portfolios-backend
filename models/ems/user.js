const mongoose = require('mongoose');
const emsDb = require("../../databases/emsDb");

const userSchema = new mongoose.Schema({
  firstname: {type: String},
  lastname: {type: String},
  profileImage: {type: String},
  companyName: {type: String},
  username: { type: String},
  email: { type: String, required: true },
  password: { type: String},
  oldpassword: { type: String},
  resetToken: {type: String},
  accessToken: {type: String},
  refreshToken: {type: String},
  lastLogin: {type: Date},
  failedLoginAttempts: {type: String},
  position: { type: String},
  department: { type: String},
  permission: { type: String },
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