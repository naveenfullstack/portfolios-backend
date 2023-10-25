const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
app.use(express.json());
app.use(cors());
const socketIo = require("socket.io"); // Add this line to import socket.io
require("dotenv").config();
const server = http.createServer(app); // Create an HTTP server using Express app
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000","http://192.168.1.8:3000"],
    methods: ["GET", "POST"],
  },
}); // Initialize socket.io on the server

// Database
const connectToDatabase = require("./databases/mainmongodb");
connectToDatabase();

// Middlewares

const Headers = require("./middlewares/header");

const ReqDomain = require("./middlewares/reqdomain");
app.use(ReqDomain);

//Routes

// Add redirection to naveenportfolio.site
app.get("/", (req, res) => {
  res.redirect("https://naveenportfolio.site");
});

const TestData = require("./routes/testdata");
app.use("/", TestData);

const EMS = require("./routes/ems/index");
app.use("/ems", EMS), Headers;

const MediaX = require("./routes/mediax/index");
app.use("/mediax", MediaX), Headers;

const Portfolio = require("./routes/portfolio/index");
app.use("/portfolio", Portfolio), Headers;

const Booking = require("./routes/booking/index");
app.use("/booking", Booking), Headers;

const Finance = require("./routes/finance/index");
app.use("/finance", Finance), Headers;

// connection
const port = process.env.PORT || 9001;
server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

// Now, you can use io to handle socket.io events.
io.on("connection", (socket) => {
  console.log(`A user connected to socket.io ${socket.id}`);
  // Handle socket.io events here
});
