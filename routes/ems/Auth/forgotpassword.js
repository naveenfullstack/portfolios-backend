const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); // Import Nodemailer
const User = require("../../../models/ems/user");
const fs = require("fs");
const path = require("path");

const emailTemplatePath = path.join(
  __dirname,
  "../../../emails/ems/passwordreset.html"
);
const emailTemplate = fs.readFileSync(emailTemplatePath, "utf8");

// Configure the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDING_EMAIL, // Your Gmail email address
    pass: process.env.EMAIL_PASSWORD, // Your Gmail password or an app-specific password
  },
});

// Define ANSI escape codes for green text color
const greenColor = "\x1b[32m";
const resetColor = "\x1b[0m";

router.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the user's username
    const firstName = user.firstname;
    const lastName = user.lastname;

    // Create a JWT token with user id as payload and set it to expire in 1 hour
    const resetToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    user.resetToken = resetToken;
    await user.save();

    // Replace placeholders in the email template
    const resetLink = `${process.env.BASE_DOMAIN}/reset-password/${resetToken}`;
    const emailContent = emailTemplate
      .replace("{{firstName}}", firstName)
      .replace("{{lastName}}", lastName)
      .replace("{{resetLink}}", resetLink)
      .replace("{{resetToken}}", resetToken)
      .replace("{{resetTokenUrl}}", resetToken);

    // Create the password reset email
    const resetEmail = {
      from: {
        name: process.env.COMPANY_NAME, // Sender's name
        address: process.env.SENDING_EMAIL, // Sender's email address
      },
      to: user.email, // Recipient's email address
      subject: "Reset your password",
      html: emailContent,
    };

    // Send the email using Nodemailer
    transporter.sendMail(resetEmail, (error, info) => {
      if (error) {
        console.error("Error sending the email:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const currentTime = new Date(); // Get the current timestamp
        console.log(
          `${resetColor} Email sent at${greenColor} ${currentTime}:${resetColor} ${info.response}`
        );
        res.status(200).json({ message: "Email has been sent to your email" });
      }
    });
  } catch (error) {
    console.error("Error sending password the email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/reset-password/:resetToken", async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { resetToken } = req.params;

    // Decode the token
    // const decodedToken = jwt.decode(token);
    const decodedToken = jwt.verify(resetToken, process.env.SECRET_KEY);

    // Find the user by decoded token (user id)
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ error });
    }

    user.oldpassword = user.password;

    // Generate hashed password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    user.resetToken = undefined; // Clear the reset token
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error });
  }
});

module.exports = router;
