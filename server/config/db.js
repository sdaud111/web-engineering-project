const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/web-engineering-project");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Mongo Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
