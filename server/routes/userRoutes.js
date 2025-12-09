// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { getAllApplicants, getUserById, updateUser, uploadResume } = require("../controllers/userController");

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.put("/resume/:id", upload.single("resume"), uploadResume);

router.get("/applicants/:excludeId", getAllApplicants);

module.exports = router;
