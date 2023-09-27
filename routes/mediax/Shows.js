const express = require("express");
const router = express.Router();
const Shows = require("../../models/mediax/shows");
//const requireLogin = require("../../middlewares/auth")
//const signupMail = require('@sendgrid/mail');
//signupMail.setApiKey(process.env.SENDGRID_KEY);

router.post("/add-shows", async (req, res) => {
  try {
    // Extract the array of show objects from the request body
    const showDataArray = req.body;

    // Check if showDataArray is an array
    if (!Array.isArray(showDataArray)) {
      return res
        .status(400)
        .json({
          error: "Invalid request body. Expected an array of show objects.",
        });
    }

    // Create an array to store new show documents
    const newShows = [];

    // Iterate through the show data and create new show documents
    for (const showData of showDataArray) {
      const existingShow = await Shows.findOne({ id: showData.id });
      if (existingShow) {
        return res
          .status(409)
          .json({ error: `Show with ID ${showData.id} already exists` });
      }

      const newShow = new Shows(showData);
      await newShow.save();
      newShows.push(newShow);
    }

    res.status(200).json({
      success: true,
      message: "Shows added successfully",
      newShows,
    });
  } catch (error) {
    console.error("Error adding shows:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-all-shows", async (req, res) => {
  try {
    // Retrieve all shows from the database
    const allShows = await Shows.find();

    res.status(200).json({
      success: true,
      message: "Shows retrieved successfully",
      shows: allShows,
    });
  } catch (error) {
    console.error("Error fetching shows:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search shows by title and return matched shows first
router.get('/search', async (req, res) => { 
  const { title } = req.query;

  try {
    // Find the shows that match the search criteria
    const regexTitle = new RegExp(title, 'i'); 
    const matchedShows = await Shows.find({ title: regexTitle });

    // Extract unique categories from the matched shows
    const categories = [...new Set(matchedShows.map(show => show.category))];

    // Find related shows based on the categories of the matched shows
    const relatedShows = await Shows.find({
      category: { $in: categories },
      _id: { $nin: matchedShows.map(show => show._id) }, 
    });

    // Combine matched and related shows into a single array
    const allShows = [...matchedShows, ...relatedShows];

    res.json(allShows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
