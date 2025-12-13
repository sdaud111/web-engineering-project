const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPosting",
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  applicantName: {
    type: String,
    required: true
  },
  applicantEmail: {
    type: String,
    required: true
  },
  applicantPhone: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  resumePath: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "shortlisted"],
    default: "pending"
  }
}, { timestamps: true });

// Prevent duplicate applications
ApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model("Application", ApplicationSchema);
