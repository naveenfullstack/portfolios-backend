const express = require("express");
const router = express.Router();
const User = require("../../../models/booking/user");
const admin = require("../../../firebase/firebase");
const jwt = require("jsonwebtoken");

// Google Sign-up route
router.post("/signup/google", async (req, res) => {
  try {
    const { IdToken, firstname, lastname, profileImage } = req.body; // Use the Google ID token from the response

    if (!IdToken) {
      return res
        .status(400)
        .json({ message: "Google ID token is missing in the request." });
    }

    // Verify the Google ID token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(IdToken);
    const { email } = decodedToken;

    // Check if the user already exists in MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      // User doesn't exist, create a new user
      user = new User({
        email,
        firstname,
        lastname,
        profileImage,
        oldpassword: "",
      });

      await user.save();
    }

    // Generate an access token with a short expiration time
    const accessToken = jwt.sign(
      { userId: user._id },
      "your_access_token_secret",
      {
        expiresIn: "15m",
      }
    );

    // Generate a refresh token with a longer expiration time
    const refreshToken = jwt.sign(
      { userId: user._id },
      "your_refresh_token_secret",
      {
        expiresIn: "15d",
      }
    );

    res.status(200).json({
      success: "true",
      email,
      firstname,
      lastname,
      profileImage,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sign-up failed" });
  }
});

module.exports = router;
