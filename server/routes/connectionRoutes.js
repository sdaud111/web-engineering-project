const express = require("express");
const router = express.Router();
const {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getAcceptedConnections,
  getPendingConnections,
  getConnectionStatus,
} = require("../controllers/connectionController");

router.post("/request", sendRequest);
router.put("/:id/accept", acceptRequest);
router.put("/:id/reject", rejectRequest);
router.get("/accepted/:userId", getAcceptedConnections);
router.get("/pending/:userId", getPendingConnections);
router.get("/status/:userId1/:userId2", getConnectionStatus);

module.exports = router;
