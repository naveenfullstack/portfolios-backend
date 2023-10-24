const mongoose = require('mongoose');
const mediaxDB = require("../../databases/financeDB");
const { Decimal128 } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  oldpassword: { type: String },
  profileImage: { type: String },
  resetToken: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
  lastLogin: { type: Date },
  failedLoginAttempts: { type: Decimal128 },
  is_blocked: { type: Boolean },
  todayExpenses: { type: Decimal128 },
  yesterdayExpenses: { type: Decimal128 },
  thisWeekExpenses: { type: Decimal128 },
  lastWeekExpenses: { type: Decimal128 },
  thisMonthExpenses: { type: Decimal128 },
  lastMonthExpenses: { type: Decimal128 },
  thisWeekIncome: { type: Decimal128 },
  lastWeekIncome: { type: Decimal128 },
  thisMonthIncome: { type: Decimal128 },
  lastMonthIncome: { type: Decimal128 },
  annualIncome: { type: Decimal128 },
  lastYearIncome: { type: Decimal128 },
  incomeResources: { type: [String] },
  expenseCategories: { type: [String] },
  currency: { type: String },
  balance: { type: Decimal128 },
  categories: { type: [String] },
});

const User = mediaxDB.model('User', userSchema);

module.exports = User;
