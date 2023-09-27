const express = require("express");
const router = express.Router();
const User = require("../../../models/mediax/user"); // Adjust the path as needed
const Shows = require("../../../models/mediax/shows");

// Define a route to add IDs to the user's mylist
router.post("/add-to-mylist", async (req, res) => {
  try {
    const { email, idsToAdd } = req.body;

    // Find the user based on their email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the new IDs to the user's mylist
    user.mylist.push(...idsToAdd);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Shows added to mylist successfully",
    });
  } catch (error) {
    console.error("Error adding shows to mylist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Shows in My List
router.post("/getmylist", async (req, res) => {
  try {
    const showIds = req.body.getshows;

    if (!showIds || !Array.isArray(showIds)) {
      return res.status(400).json({ message: "Invalid show IDs" });
    }

    // Find shows by their IDs
    const shows = await Shows.find({ id: { $in: showIds } });

    if (!shows || shows.length === 0) {
      return res.status(404).json({ message: "Shows not found" });
    }

    res.status(200).json({
      success: true,
      "shows in my list": shows.length,
      messege: "Successfully Recived Shows in My List",
      results: shows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Define a route to delete an ID from the user's mylist
router.delete("/delete-from-mylist", async (req, res) => {
  try {
    const { email, itemToDelete } = req.body;

    // Find the user based on their email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the itemToDelete exists in the user's mylist
    const indexToRemove = user.mylist.indexOf(itemToDelete);

    if (indexToRemove !== -1) {
      // Remove the item from the user's mylist
      user.mylist.splice(indexToRemove, 1);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Item deleted from mylist successfully",
      });
    } else {
      return res.status(404).json({ error: "Item not found in mylist" });
    }
  } catch (error) {
    console.error("Error deleting item from mylist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
