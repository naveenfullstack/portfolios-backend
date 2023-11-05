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

    // Calculate the current date and various dates in the past
    const currentDate = new Date();

    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);

    const oneDayAgo = new Date(currentDate);
    oneDayAgo.setDate(currentDate.getDate() - 1);

    // Convert amount to a valid number before using it
    const parsedAmount = parseFloat(amount);

    if (new Date(date) > oneMonthAgo) {
      if (is_income) {
        user.thisMonthIncome =
          (parseFloat(user.thisMonthIncome) || 0) + parsedAmount;
      } else {
        user.thisMonthExpenses =
          (parseFloat(user.thisMonthExpenses) || 0) + parsedAmount;
      }
    }

    if (new Date(date) > oneWeekAgo) {
      if (is_income) {
        user.thisWeekIncome =
          (parseFloat(user.thisWeekIncome) || 0) + parsedAmount;
      } else {
        user.thisWeekExpenses =
          (parseFloat(user.thisWeekExpenses) || 0) + parsedAmount;
      }
    }

    if (new Date(date) > oneDayAgo) {
      if (!is_income) {
        user.todayExpenses =
          (parseFloat(user.todayExpenses) || 0) + parsedAmount;
      }
    }

    // Update user's balance separately
    if (is_income) {
      user.balance = (parseFloat(user.balance) || 0) + parsedAmount;
    } else {
      user.balance = (parseFloat(user.balance) || 0) - parsedAmount;
    }

    // Convert categoryToUpdate.amount to a valid number before using it
    categoryToUpdate.amount =
      (parseFloat(categoryToUpdate.amount) || 0) + parsedAmount;

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
      amount: parsedAmount, // Send the parsed amount
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
