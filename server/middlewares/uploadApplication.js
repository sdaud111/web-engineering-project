const multer = require("multer");
const path = require("path");

// Storage configuration for application resumes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/applications/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${req.body.jobId}_${req.body.applicantId}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter - only accept PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;
