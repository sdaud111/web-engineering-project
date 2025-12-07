import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import show from "./logs/show.js"; // your logging helper
import User from "./models/user.js";
import JobPosting from "./models/JobPosting.js";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/web-engineering-project")
    .then(() => show("server", "startup", `MongoDB connected`, "green"))
    .catch(err => show("server", "failure", err.message, "red"));

// ===== User Routes =====

// Signup
app.post("/signup", async (req, res) => {
    show("server", "request", `Request recieved at /signup`, "cyan");
    const { name, email, password, userType } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            show("server", "auth failure", `User already exists`, "redBright");
            return res.json({ error: "User already exists" });
        }
        await User.create({ name, email, password, userType });
        show("server", "auth success", "Signup Successful", "greenBright");
        res.json({ message: "Signup OK" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        show("server", "failure", err.message, "red");
    }
});

// Login
app.post("/login", async (req, res) => {
    show("server", "request", `Request recieved at /login`, "cyan");
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            show("server", "auth failure", `User not found`, "redBright");
            return res.json({ error: "User not found" });
        }

        if (user.password !== password) {
            show("server", "auth failure", `Wrong Password`, "redBright");
            return res.json({ error: "Wrong password" });
        }

        show("server", "auth success", "Login Successful", "greenBright");
        res.json({
            message: "Login OK",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
        show("server", "failure", err.message, "red");
    }
});

// ===== Job Routes =====
app.post("/jobs", async (req, res) => {
    show("server", "request", `Request recieved at /jobs`, "cyan");
    const jobData = req.body;

    try {
        const job = await JobPosting.create({
            jobName: jobData.job_name,
            jobType: jobData.job_type,
            workArrangement: jobData.job_work_arrangement,
            jobPosition: jobData.job_position,
            currency: jobData.salary_currency,
            salary: jobData.salary,
            city: jobData.location_city,
            sectorArea: jobData.location_sector_area,
            street: jobData.location_street,
            postalCode: jobData.location_postal,
            additionalInformation: jobData.location_additional,
            jobDescription: jobData.job_description,
            phone: jobData.contact_phone,
            email: jobData.contact_email,
            website: jobData.contact_website,
            socialLinks: {
                twitter: jobData.contact_socials_twitter,
                instagram: jobData.contact_socials_instagram,
                linkedIn: jobData.contact_socials_linkedin,
                reddit: jobData.contact_socials_reddit,
                facebook: jobData.contact_socials_facebook
            }
        });

        show("server", "recieved", "Job successfully saved to DB", "greenBright");
        res.json({ message: "Job successfully saved!", job });
    } catch (err) {
        show("server", "failure", err.message, "red");
        res.status(500).json({ error: err.message });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => show("server", "startup", `Server started and running on port ${PORT}`, "green"));
