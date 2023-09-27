// profile.js
const express = require('express');
const router = express.Router();
const User = require('../../../models/portfolio/user'); // Import your User model

// Define a route to get a user's profile by email
router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    // Find the user by email in the database and select only specific fields
    const user = await User.findOne({ email }).select(
      '_id firstname lastname username email lastLogin is_blocked mylist'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const response = {
      message: 'success',
      results: [
        {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          mylist: user.mylist,
          is_blocked: user.is_blocked,
          lastLogin: user.lastLogin,
        },
      ],
    };

    // Send the formatted response
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;