import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import show from "./logs/show.js";
import User from "./models/user.js";
// const JobPosting = require("./models/JobPosting.js");

const app = express();
app.use(express.json());
app.use(cors());



// MongoDB connection
mongoose.connect("mongodb://localhost:27017/web-engineering-project")
    .then(() => show("server", "startup", `MongoDB connected`, "green"))
    .catch(err => show("server", "failure", err.message, "red"));

// ===== User Routes =====

// Signup
app.post("/signup", async (req, res) => {
    show("server", "request", `Request recieved at /signup`, "cyan")
    const { name, email, password, userType } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) { res.json({ error: "User already exists" }); 
        show("server", "auth failure", `User already exists`, "redBright")};

        await User.create({ name, email, password, userType });
        res.json({ message: "Signup OK" });
        show("server", "auth success", "Signup Successful", "greenBright");
    } catch (err) {
        res.status(500).json({ error: err.message });
        show("server", "failure", err.message, "red");
    }
});

// Login
app.post("/login", async (req, res) => {
    show("server", "request", `Request recieved at /login`, "cyan")
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) { 
            show("server", "auth failure", `User not found`, "redBright");
            res.json({ error: "User not found" });  
        };

        if (user.password !== password) {
            show("server", "auth failure", `Wrong Password`, "redBright");
            return res.json({ error: "Wrong password" });
        }

        res.json({ message: "Login OK" });
        show("server", "auth success", "Login Successful", "greenBright");
    } catch (err) {
        res.status(500).json({ error: err.message });
        show("server", "failure", err.message, "red");
    }
});

app.post("/jobs", async (req, res) => {
    show("server", "request", `Request recieved at /jobs`, "cyan")
    const job = req.body;
    try {
        res.json({ message: "Job recieved in backend: OK" });
        show("server", "recieved", "Job successfully recieved", "greenBright");
    } catch (err) {
        res.status(500).json({ error: err.message });
        show("server", "failure", err.message, "red");  
        
    }
});



const PORT = 5000;
app.listen(PORT, () => show("server", "startup", `Server started and running on port ${PORT}`, "green"));
