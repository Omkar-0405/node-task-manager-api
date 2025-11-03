// Express + Middleware
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load variables from .env

const app = express();

app.use(cors()); // Allow frontend access
app.use(express.json()); //parse json req body

app.use('/api/auth', require("./routes/authRoutes"))

// Test route
app.get("/test", (req, res) => {
  res.send("Task Manager API is running...");
});

module.exports = app;
