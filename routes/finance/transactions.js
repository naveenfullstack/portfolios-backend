const express = require("express");
const router = express.Router();
const Transaction = require("../../models/finance/transactions");
const User = require("../../models/finance/user");
const Category = require("../../models/finance/categories");

router.post("/add", async (req, res) => {
  try {
    const { userId, categoryId, title, date, category, amount, is_income } =
      req.body;

    // Find the user by their userId
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res
        .status(404)
        .json({ error: "No user found to add the transaction" });
    }

    // Find the category based on categoryId and userId
    const categoryToUpdate = await Category.findOne({
      _id: categoryId,
      userId,
    });

    if (!categoryToUpdate) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Create a new user transaction
    const newTransaction = new Transaction({
      userId,
      categoryId,
      title,
      date,
      category,
      amount,
      is_income,
    });

    if (is_income) {
      // Update the User's income
      user.thisWeekIncome =
        (parseFloat(user.thisWeekIncome) || 0) + parseFloat(amount);
      user.thisMonthIncome =
        (parseFloat(user.thisMonthIncome) || 0) + parseFloat(amount);
      user.balance = (parseFloat(user.balance) || 0) + parseFloat(amount);
    } else {
      // Update the User's Expenses
      user.todayExpenses =
        (parseFloat(user.todayExpenses) || 0) + parseFloat(amount);
      user.thisWeekExpenses =
        (parseFloat(user.thisWeekExpenses) || 0) + parseFloat(amount);
      user.thisMonthExpenses =
        (parseFloat(user.thisMonthExpenses) || 0) + parseFloat(amount);
      user.balance = (parseFloat(user.balance) || 0) - parseFloat(amount);
    }

    // Update the Category's amount
    categoryToUpdate.amount =
      (parseFloat(categoryToUpdate.amount) || 0) + parseFloat(amount);

    await user.save();
    await newTransaction.save();
    await categoryToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Transaction created successfully",
      userId,
      categoryId,
      title,
      date,
      category,
      amount,
      is_income,
    });
  } catch (error) {
    console.error("Error adding transaction", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get all transactions associated with a specific userId
router.get("/get/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find all transactions for the specified userId
      const transactions = await Transaction.find({ userId });
  
      res.status(200).json({
        success: true,
        transactions,
      });
    } catch (error) {
      console.error("Error fetching transactions", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
