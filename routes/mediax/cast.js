const express = require("express");
const router = express.Router();
const CastList = require("../../models/mediax/cast");

// Create a new video list
router.post('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { results } = req.body;
      
      // Check if the video list with the given ID already exists
      let castList = await CastList.findOne({ id });
  
      if (!castList) {
        // If the video list doesn't exist, create a new one
        castList = new CastList({ id, results });
      } else {
        // If the video list exists, append the new videos to it
        castList.results = castList.results.concat(results);
      }
  
      await castList.save();
      res.status(201).json(castList);
    } catch (error) {
      res.status(500).json({ error: 'Could not create or update cast list' });
    }
  });

// Get a video list by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const castList = await CastList.findOne({ id });
    if (!castList) {
      res.status(404).json({ error: "Cast list not found" });
    } else {
      res.json(castList);
    }
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve Cast list" });
  }
});

module.exports = router;
