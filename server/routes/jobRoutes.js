const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
  updateJob
} = require("../controllers/jobController");

// GET all jobs
router.get("/", getAllJobs);

// GET job by ID
router.get("/:id", getJobById);

// POST create job
router.post("/", createJob);

// DELETE job
router.delete("/:id", deleteJob);

// UPDATE job
router.put("/:id", updateJob);

module.exports = router;
