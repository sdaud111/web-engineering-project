const express = require("express");
const router = express.Router();
const { aiJobSearch, aiCandidateSearch, getSuggestions } = require("../controllers/aiSearchController");

// AI-powered job search
router.post("/search", aiJobSearch);

// Employer candidate search
router.post("/search-candidates", aiCandidateSearch);

// Get search suggestions
router.get("/suggestions", getSuggestions);

module.exports = router;
