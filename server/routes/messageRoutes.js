const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/messageController");

// Send message
router.post("/", sendMessage);

// Get conversation between two users
router.get("/:userId1/:userId2", getMessages);

module.exports = router;
