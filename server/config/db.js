const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/web-engineering-project";
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected:", mongoURI.includes("mongodb.net") ? "Atlas" : "Local");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
