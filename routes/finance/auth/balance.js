const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../../models/finance/user'); // Update the path to your User model

// GET request to fetch user balance by user ID
router.get('/view/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId).select('balance');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res
      .status(200)
      .json({
        success: "true",
        message: "Login Success",
        balance : user.balance,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;