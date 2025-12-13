const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadApplication");
const {
  applyForJob,
  getApplicationsByJob,
  getApplicationsByEmployer,
  getApplicationsByUser,
  getApplicationById,
  updateApplicationStatus,
  withdrawApplication,
  getApplicationCount
} = require("../controllers/applicationController");

// Apply for a job (with PDF upload)
router.post("/", upload.single("resume"), applyForJob);

// Get all applications for a specific job (employer view)
router.get("/job/:jobId", getApplicationsByJob);

// Get all applications for all jobs by an employer
router.get("/employer/:employerId", getApplicationsByEmployer);

// Get all applications by a user (applicant view)
router.get("/user/:userId", getApplicationsByUser);

// Get single application details
router.get("/:id", getApplicationById);

// Update application status
router.put("/:id/status", updateApplicationStatus);

// Withdraw application
router.delete("/:id", withdrawApplication);

// Get application count for a job
router.get("/job/:jobId/count", getApplicationCount);

module.exports = router;
