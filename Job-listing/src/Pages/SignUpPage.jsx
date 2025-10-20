import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    // Trim whitespace from inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
   
    axios.post('http://localhost:3001/signup', {
      name: trimmedName,
      email: trimmedEmail, 
      password: trimmedPassword
    })
    .then(result => {
      console.log(result);
      // Store credentials for auto-fill (optional)
      localStorage.setItem("lastEmail", trimmedEmail);
      
      navigate("/login"); // redirect to login page after signup
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#D1F8EF]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-md border-t-4 border-[#3674B5]">
        <h2 className="text-3xl font-bold text-center text-[#3674B5]">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[#578FCA]">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-[#3674B5] border border-[#A1E3F9] rounded-lg focus:ring-2 focus:ring-[#A1E3F9] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#578FCA]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-[#3674B5] border border-[#A1E3F9] rounded-lg focus:ring-2 focus:ring-[#A1E3F9] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#578FCA]">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-[#3674B5] border border-[#A1E3F9] rounded-lg focus:ring-2 focus:ring-[#A1E3F9] focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-[#3674B5] rounded-lg hover:bg-[#2A5A8C] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-sm text-center text-[#578FCA] mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#A1E3F9] hover:text-[#3674B5] font-medium transition-colors duration-200">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
