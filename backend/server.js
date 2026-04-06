const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
app.use("/api", userRoutes);

connectDB()
// Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});