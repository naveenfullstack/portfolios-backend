const express = require("express");
const router = express.Router();
const User = require("../../../models/booking/user");
const admin = require("../../../firebase/firebase");

// Google Sign-up route
router.post("/signup/google", async (req, res) => {
  try {
    const { idToken } = req.body;

    // Verify the Google ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email } = decodedToken;

    // Check if the user already exists in MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      // User doesn't exist, create a new user
      user = new User({
        email,
      });

      await user.save();
    }

    res.status(200).json({ message: "Sign-up successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sign-up failed" });
  }
});

module.exports = router;
