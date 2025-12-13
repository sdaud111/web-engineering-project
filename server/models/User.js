const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  
  // Profile fields
  profilePhoto: { type: String, default: "" },
  bio: { type: String, default: "" },
  specialization: { type: String, default: "" },
  phone: { type: String, default: "" },
  location: { type: String, default: "" },
  
  // Skills and Languages
  skills: { type: [String], default: [] },
  languages: { type: [String], default: [] },
  
  // Education
  education: [{
    degree: String,
    institution: String,
    fieldOfStudy: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  
  // Work Experience
  workExperience: [{
    jobTitle: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    currentlyWorking: Boolean,
    description: String
  }],
  
  // Social Links
  socialLinks: {
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    twitter: { type: String, default: "" }
  },
  
  resume: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
