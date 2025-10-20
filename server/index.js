const express=require("express")
const mongoose=require("mongoose")
const cors =require("cors")
const EmployeeModel=require('./models/Employee')

const app=express()
app.use(express.json())
app.use(cors())


mongoose.connect("mongodb://127.0.0.1:27017/job_listing", {
    // Automatically create database if doesn't exist
    autoCreate: true
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    
    // Check if we have any users, create a test user if empty
    return EmployeeModel.countDocuments();
  })
  .then(count => {
    if (count === 0) {
      console.log("Creating test user...");
      return EmployeeModel.create({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });
    }
    return null;
  })
  .then(result => {
    if (result) {
      console.log("Test user created successfully:", result);
    } else {
      console.log("Database already has users, skipping test user creation");
    }
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  })

app.post('/login',(req,res)=>{
  const {email,password}=req.body;
  console.log("Login request received:", { email, password });
  
  EmployeeModel.findOne({email: email})
  .then(user=>{
    if(user){
        console.log("User found:", { 
          userEmail: user.email, 
          userPassword: user.password, 
          attemptedPassword: password,
          passwordsMatch: user.password === password,
          passwordLength: user.password.length,
          attemptedPasswordLength: password.length
        });
        
        if(user.password === password){
            console.log("Login successful!");
            res.json("Success")
        }
        else{
            console.log("Password comparison failed!");
            res.json("the password is incorrect")
        }
    } else{
        console.log("No user found with email:", email);
        res.json("No record existed")
    }
  })
  .catch(err => {
    console.error("Error during login:", err);
    res.status(500).json("Server error during login");
  })

})

app.post('/signup',(req,res)=>{
   console.log("Signup request received:", req.body);
   EmployeeModel.create(req.body) 
   .then(employees=>{
      console.log("User created successfully:", employees);
      res.json(employees)
   })
   .catch(err=>{
      console.error("Error creating user:", err);
      res.json(err)
   })
})
  
// Force create test user for easy login
const createTestUser = async () => {
  try {
    // Check if test user exists
    const existingUser = await EmployeeModel.findOne({ email: "test@example.com" });
    
    if (!existingUser) {
      // Create test user if it doesn't exist
      const testUser = await EmployeeModel.create({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });
      console.log("Test user created:", testUser);
    } else {
      console.log("Test user already exists:", existingUser);
    }
  } catch (error) {
    console.error("Error managing test user:", error);
  }
};

// Create test user when server starts
createTestUser();

app.listen(3001,()=>{
    console.log("server is running")
})