// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const uploadProfilePhoto = require("../middlewares/uploadProfile");
const { getAllApplicants, getUserById, updateUser, uploadResume, uploadProfilePhoto: uploadProfilePhotoController, getAllUsers } = require("../controllers/userController");

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.put("/:id/photo", uploadProfilePhoto.single("profilePhoto"), uploadProfilePhotoController);
router.put("/resume/:id", upload.single("resume"), uploadResume);

router.get("/applicants/:excludeId", getAllApplicants);
router.get("/all/:excludeId", getAllUsers);

module.exports = router;
