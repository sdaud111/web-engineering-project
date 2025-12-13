const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static serving for uploaded files (resumes, applications)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/connections", require("./routes/connectionRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
