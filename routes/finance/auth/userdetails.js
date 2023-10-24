const express = require("express");
const router = express.Router();
const User = require("../../../models/finance/user");

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email }).select(
      "_id firstname lastname username email lastLogin is_blocked todayExpenses yesterdayExpenses thisWeekExpenses lastWeekExpenses thisWeekIncome lastWeekIncome thisMonthIncome lastMonthIncome annualIncome lastYearIncome balance thisMonthExpenses lastMonthExpenses"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const response = {
      success: true,
      message: "User data recived",
      results: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        is_blocked: user.is_blocked,
        lastLogin: user.lastLogin,
        todayExpenses: user.todayExpenses,
        yesterdayExpenses: user.yesterdayExpenses,
        thisWeekExpenses: user.thisWeekExpenses,
        lastWeekExpenses: user.lastWeekExpenses,
        thisMonthExpenses: user.thisMonthExpenses,
        lastMonthExpenses: user.lastMonthExpenses,
        thisWeekIncome: user.thisWeekIncome,
        lastWeekIncome: user.lastWeekIncome,
        thisMonthIncome: user.thisMonthIncome,
        lastMonthIncome: user.lastMonthIncome,
        annualIncome: user.annualIncome,
        lastYearIncome: user.lastYearIncome,
        balance: user.balance,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
