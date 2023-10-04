const express = require("express");
const router = express.Router();
const Announcement = require("../../models/ems/announcements");

router.post("/add", async (req, res) => {
  try {
    const {
      title,
      description,
      PublisherFirstName,
      PublisherLastName,
      Publisherid,
      companyId,
      PublisherPosition,
      PublisherDepartment,
      PublisherProfileImage,
    } = req.body;

    // Check if both title and description are present
    if (!title || !description || !companyId) {
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
      companyId,
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

// Modify your route to accept companyId as a parameter
router.get("/get-all/:companyId", async (req, res) => {
    try {
      const { companyId } = req.params;
  
      // Retrieve announcements with the specified companyId
      const matchingAnnouncements = await Announcement.find({ companyId });
  
      res.status(200).json({
        success: true,
        message: "Announcements retrieved successfully",
        announcements: matchingAnnouncements,
      });
    } catch (error) {
      console.error("Error fetching Announcements:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

// GET announcements by Publisherid
router.get('/:Publisherid/:companyId', async (req, res) => {
    try {
      const { Publisherid, companyId } = req.params;
  
      // Use Mongoose to find announcements with the provided Publisherid and companyId
      const announcements = await Announcement.find({ Publisherid, companyId });
  
      if (!announcements || announcements.length === 0) {
        return res.status(404).json({ message: 'No announcements found for this Publisherid and companyId.' });
      }
  
      res.status(200).json(announcements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
