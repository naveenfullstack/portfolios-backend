const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const User = require("../../../models/finance/user");

// Schedule a task to run every day at 7:55 PM
cron.schedule("59 23 * * *", async () => {
  // Find and update the user records as needed
  const users = await User.find({}); // Get all users

  for (const user of users) {
    const todayExpenses = 0;
    const yesterdayExpenses = user.todayExpenses; // Set it to the previous value of todayExpenses

    // Update the user record
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          todayExpenses,
          yesterdayExpenses,
        },
      }
    );
  }

  console.log("Daily update completed at 8:00 PM");
});

// Schedule a task to run every Sunday at 11:59 PM
cron.schedule("59 23 * * 0", async () => {
  // 0 represents Sunday
  // Find and update the user records as needed
  const users = await User.find({}); // Get all users

  for (const user of users) {
    const thisWeekExpenses = 0;
    const lastWeekExpenses = user.thisWeekExpenses; // Set it to the previous value of thisWeekExpenses

    // Update the user record
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          thisWeekExpenses,
          lastWeekExpenses,
        },
      }
    );
  }

  console.log("Weekly update completed every Sunday at 11:59 PM");
});

// Schedule a task to run every Sunday at 11:59 PM to set this Week Income
cron.schedule("59 23 * * 0", async () => {
  // 0 represents Sunday
  // Find and update the user records as needed
  const users = await User.find({}); // Get all users

  for (const user of users) {
    const thisWeekIncome = 0;
    const lastWeekIncome = user.thisWeekIncome; // Set it to the previous value of thisWeekIncome

    // Update the user record
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          thisWeekIncome,
          lastWeekIncome,
        },
      }
    );
  }

  console.log("Weekly income update completed every Sunday at 11:59 PM");
});

// Schedule a task to run every last day of the month at 11:59 PM
cron.schedule("59 23 28-31 * *", async () => {
  // Find and update the user records as needed
  const users = await User.find({}); // Get all users

  for (const user of users) {
    const thisMonthExpenses = 0;
    const lastMonthExpenses = user.thisMonthExpenses; // Set it to the previous value of thisMonthExpenses

    // Update the user record
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          thisMonthExpenses,
          lastMonthExpenses,
        },
      }
    );
  }

  console.log(
    "Monthly update completed on the last day of the month at 11:59 PM"
  );
});

// Schedule a task to run every last day of the month at 11:59 PM to update monthly income
cron.schedule("59 23 28-31 * *", async () => {
  // Find and update the user records as needed
  const users = await User.find({}); // Get all users

  for (const user of users) {
    const thisMonthIncome = 0;
    const lastMonthIncome = user.thisMonthIncome; // Set it to the previous value of this Month Income

    // Update the user record
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          thisMonthIncome,
          lastMonthIncome,
        },
      }
    );
  }

  console.log(
    "Monthly Income update completed on the last day of the month at 11:59 PM"
  );
});

module.exports = router;
