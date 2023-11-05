const express = require("express");
const router = express.Router();
const Category = require("../../models/finance/categories");

router.post("/", async (req, res) => {
  try {
    const { userId, title, is_income } = req.body;

    // Check if the 'title' is empty or undefined
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Category title is required" });
    }

    // Check if a category with the same title exists for any user
    const existingCategory = await Category.findOne({ title });

    if (existingCategory) {
      if (existingCategory.userId === userId) {
        return res.status(409).json({ error: "Category with the same title already exists for this user" });
      }
    }

    // Create a new category
    const newCategory = new Category({
      userId,
      title,
      amount: 0, // Set the amount to 0 here
      is_income,
    });

    await newCategory.save();

    res.status(200).json({
      success: true,
      message: "Category saved successfully",
      _id: newCategory._id,
      userId,
      title,
      is_income,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define a route to get categories by userId
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find categories with the specified userId and non-zero amount
    const categories = await Category.find({ userId, amount: { $ne: 0 } });

    if (categories.length === 0) {
      return res.status(200).json({ 
        success: true,
        messege : "no categories found",
        categories : []
       });
    }

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define a route to get categories by userId
router.get("/all/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find categories with the specified userId and non-zero amount
    const categories = await Category.find({ userId });

    if (categories.length === 0) {
      return res.status(200).json({ 
        success: true,
        messege : "no categories found",
        categories : []
       });
    }

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
