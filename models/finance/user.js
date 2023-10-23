const mongoose = require('mongoose');
const mediaxDB = require("../../databases/financeDB")

const userSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  oldpassword: { type: String},
  profileImage: {type:String},
  resetToken: {type: String},
  accessToken: {type: String},
  refreshToken: {type: String},
  lastLogin: {type: Date},
  failedLoginAttempts: {type: Number},
  is_blocked : {type: Boolean},
  todayExpenses : {type:Number},
  yesterdayExpenses : {type:Number},
  thisWeekExpenses : {type:Number},
  lastWeekExpenses : {type:Number},
  thisWeekIncome : {type:Number},
  lastWeekIncome : {type:Number},
  thisMonthIncome : {type:Number},
  lastMonthIncome : {type:Number},
  annualIncome : {type:Number},
  lastYearIncome : {type:Number},
  incomeResources : { type: [String] },
  expenseCategories : {type : [String]},
  currency : {type:String},
  balance : {type:Number},
  categories : { type: [String] },
});

const User = mediaxDB.model('User', userSchema);

module.exports = User;