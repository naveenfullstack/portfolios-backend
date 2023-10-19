const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../models/booking/user");

router.post("/", async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find the user by the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
      success: false,
      message: "Doesn't Have an account",
    });
    }

    res.status(200).json({
      success: true,
      message: "Have an account",
    });

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
