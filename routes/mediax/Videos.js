const express = require("express");
const router = express.Router();
const VideoList = require("../../models/mediax/videoList");

// Create a new video list
router.post('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { results } = req.body;
      
      // Check if the video list with the given ID already exists
      let videoList = await VideoList.findOne({ id });
  
      if (!videoList) {
        // If the video list doesn't exist, create a new one
        videoList = new VideoList({ id, results });
      } else {
        // If the video list exists, append the new videos to it
        videoList.results = videoList.results.concat(results);
      }
  
      await videoList.save();
      res.status(201).json(videoList);
    } catch (error) {
      res.status(500).json({ error: 'Could not create or update video list' });
    }
  });

// Get a video list by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const videoList = await VideoList.findOne({ id });
    if (!videoList) {
      res.status(404).json({ error: "Video list not found" });
    } else {
      res.json(videoList);
    }
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve video list" });
  }
});

module.exports = router;
