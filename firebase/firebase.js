const admin = require("firebase-admin");
const serviceAccount = require("./firebase-admin-key.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "portfolios-62a43.appspot.com",
});

module.exports = admin;
