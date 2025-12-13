const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  skills: { type: [String], default: [] },
  resume: { type: String, default: "" }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
