const express = require("express");
const router = express.Router();
const Multer = require("multer");
const User = require("../../../models/ems/user");
const upload = Multer({ storage: Multer.memoryStorage() });
const admin = require("../../../firebase/firebase");

router.post("/upload/:email", upload.single("file"), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const file = req.file;
  const { email } = req.params;
  const bucket = admin.storage().bucket(); 

  // Create a unique file name (e.g., use the original file name)
  const fileName = `${Date.now()}_${file.originalname}`;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // Create a file upload stream to Firebase Storage
  const uploadStream = bucket.file(fileName).createWriteStream();

  // Handle stream events
  uploadStream.on("error", (err) => {
    console.error("Error uploading file to Firebase Storage:", err);
    return res.status(500).json({ error: "Failed to upload file." });
  });

  uploadStream.on("finish", async () => {
    try {
      // Generate a view URL for the uploaded file
      const viewUrl = await bucket.file(fileName).getSignedUrl({
        action: "read",
        expires: "03-01-2500", // Set an appropriate expiration date
      });

      // Update the user's profileImage field
      user.profileImage = viewUrl[0];
      await user.save();

      return res.status(200).json({ viewUrl: viewUrl[0] });
    } catch (error) {
      console.error("Error updating user profile image:", error);
      return res.status(500).json({ error: "Failed to update user profile image." });
    }
  });

  // Pipe the uploaded file stream to Firebase Storage
  uploadStream.end(file.buffer);
});

module.exports = router;
