const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/get-ip-details', async (req, res) => {
  try {
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const ipAddress = ipResponse.data.ip;

    const ipDetailsResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);
    const ipDetails = ipDetailsResponse.data;

    // Extract the desired information
    const { country, city, timezone, query } = ipDetails;

    res.json({
      ipAddress,
      ipDetails: ipDetails
    });
  } catch (error) {
    console.error('Error retrieving IP address:', error);
    res.status(500).json({ error: 'An error occurred while retrieving IP details' });
  }
});

module.exports = router;
