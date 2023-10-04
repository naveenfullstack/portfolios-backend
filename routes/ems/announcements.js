const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Announcement = require("../../models/ems/announcements");

router.post("/add", async (req, res) => {
  try {
    const {
      title,
      description,
      PublisherFirstName,
      PublisherLastName,
      Publisherid,
      PublisherPosition,
      PublisherDepartment,
      PublisherProfileImage,
    } = req.body;

    // Check if both title and description are present
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: "Both title and description are required",
      });
    }

    // Get the current date and time
    const currentDate = new Date();

    // Create a Announcement
    const newAnnouncement = new Announcement({
      title,
      description,
      PublisherFirstName,
      PublisherLastName,
      Publisherid,
      PublisherPosition,
      PublisherDepartment,
      PublisherProfileImage,
      date: currentDate,
    });
    await newAnnouncement.save();

    res.status(200).json({
      success: "true",
      message: "Announcement created successfully",
      title,
      description,
      PublisherFirstName,
      PublisherLastName,
      Publisherid,
      PublisherPosition,
      PublisherDepartment,
      PublisherProfileImage,
      date: currentDate,
    });
  } catch (error) {
    console.error("Error adding Announcement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-all", async (req, res) => {
  try {
    // Retrieve all shows from the database
    const allAnnouncements = await Announcement.find();

    res.status(200).json({
      success: true,
      message: "Announcements retrieved successfully",
      Announcements: allAnnouncements,
    });
  } catch (error) {
    console.error("Error fetching Announcements:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
