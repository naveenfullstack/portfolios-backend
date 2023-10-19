const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../models/booking/user");

router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if the email is already taken
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the encrypted password
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      is_blocked: false,
      oldpassword: "",
    });
    await newUser.save();

    // Generate an access token with a short expiration time
    const accessToken = jwt.sign(
      { userId: newUser._id },
      "your_access_token_secret",
      {
        expiresIn: "15m",
      }
    );

    // Generate a refresh token with a longer expiration time
    const refreshToken = jwt.sign(
      { userId: newUser._id },
      "your_refresh_token_secret",
      {
        expiresIn: "15d",
      }
    );

    res.status(200).json({
      accessToken,
      refreshToken,
      success: "true",
      message: "Account created successfully",
      firstname,
      lastname,
      email,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;