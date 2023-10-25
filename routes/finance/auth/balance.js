const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../../models/finance/user'); // Update the path to your User model
const app = require('../../../index'); // Update the path accordingly
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

// GET request to fetch user balance by user ID from query parameter
router.get('/view', async (req, res) => {
  try {
    const userId = req.query.userId;
    
    if (!userId) {
      return res.status(400).json({ message: 'Missing userId query parameter' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
    const user = await User.findById(userId).select('balance');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Emit the balance update to connected clients
    io.sockets.emit('balanceUpdate', { userId, balance: user.balance });
    
    res.status(200).json({
      success: true,
      message: 'Login Success',
      balance: user.balance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;