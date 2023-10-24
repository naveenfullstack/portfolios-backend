const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../models/finance/user");

router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, username, currency, email, password } = req.body;

    // Check if the email is already taken
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: "email already exists" });
    }

    // Check if the username is already taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the encrypted password
    const newUser = new User({
      firstname,
      lastname,
      email,
      username,
      currency,
      password: hashedPassword,
      is_blocked: false,
      oldpassword: "",
      balance: 0,
      todayExpenses: 0,
      yesterdayExpenses: 0,
      thisWeekExpenses: 0,
      lastWeekExpenses: 0,
      thisWeekIncome: 0,
      lastWeekIncome: 0,
      thisMonthIncome: 0,
      lastMonthIncome: 0,
      annualIncome: 0,
      lastYearIncome: 0,
    });
    await newUser.save();

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);

    res.status(200).json({
      token,
      success: "true",
      message: "Account created successfully",
      firstname,
      lastname,
      username,
      email,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
