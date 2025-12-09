const JobPosting = require("../models/JobPosting");

// GET all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobPosting.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job)
      return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE job
exports.createJob = async (req, res) => {
  try {
    const newJob = await JobPosting.create(req.body);
    res.json(newJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE job
exports.deleteJob = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job)
      return res.status(404).json({ message: "Job not found" });

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE job
exports.updateJob = async (req, res) => {
  try {
    const updated = await JobPosting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Job not found" });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
