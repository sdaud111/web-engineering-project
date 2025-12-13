const express = require("express");
const router = express.Router();
const { aiJobSearch, getSuggestions } = require("../controllers/aiSearchController");

// AI-powered job search
router.post("/search", aiJobSearch);

// Get search suggestions
router.get("/suggestions", getSuggestions);

module.exports = router;
