// models/JobPosting.js
const mongoose = require("mongoose");

const JobPostingSchema = new mongoose.Schema({
  jobName: String,
  jobType: String,
  workArrangement: String,
  jobPosition: String,
  currency: String,
  salary: Number,
  city: String,
  sectorArea: String,
  street: String,
  postalCode: String,
  additionalInformation: String,
  jobDescription: String,
  phone: String,
  email: String,
  website: String,
  socialLinks: {
    twitter: String,
    instagram: String,
    linkedIn: String,
    reddit: String,
    facebook: String
  }
}, { timestamps: true });

module.exports = mongoose.model("JobPosting", JobPostingSchema);
