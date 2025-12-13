const Application = require("../models/Application");
const JobPosting = require("../models/JobPosting");
const User = require("../models/User");

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, applicantId, applicantName, applicantEmail, applicantPhone, coverLetter } = req.body;

    // Validate required fields
    if (!jobId || !applicantId || !applicantName || !applicantEmail || !applicantPhone || !coverLetter) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF is required" });
    }

    // Check if job exists
    const job = await JobPosting.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({ job: jobId, applicant: applicantId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: applicantId,
      applicantName,
      applicantEmail,
      applicantPhone,
      coverLetter,
      resumePath: req.file.path,
      status: "pending"
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all applications for a specific job (for employer)
exports.getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .populate("job", "jobName jobType salary")
      .sort({ createdAt: -1 });

    res.json({
      count: applications.length,
      applications
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all applications for all jobs posted by employer
exports.getApplicationsByEmployer = async (req, res) => {
  try {
    const { employerId } = req.params;

    // Find all jobs posted by this employer
    const jobs = await JobPosting.find({ postedBy: employerId });
    const jobIds = jobs.map(job => job._id);

    // Find all applications for these jobs
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("applicant", "name email")
      .populate("job", "jobName jobType salary")
      .sort({ createdAt: -1 });

    res.json({
      count: applications.length,
      applications
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all applications by a specific user (for applicant)
exports.getApplicationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await Application.find({ applicant: userId })
      .populate("job", "jobName jobType salary city companyName")
      .sort({ createdAt: -1 });

    res.json({
      count: applications.length,
      applications
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single application details
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id)
      .populate("applicant", "name email skills")
      .populate("job", "jobName jobType salary city jobDescription");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update application status (for employer)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["pending", "accepted", "rejected", "shortlisted"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("job", "jobName");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({
      message: "Application status updated successfully",
      application
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Withdraw application (for applicant)
exports.withdrawApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application withdrawn successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get application count for a job
exports.getApplicationCount = async (req, res) => {
  try {
    const { jobId } = req.params;

    const count = await Application.countDocuments({ job: jobId });

    res.json({ count });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
