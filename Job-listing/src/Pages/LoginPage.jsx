import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginPage = () => {
  // Pre-fill email from localStorage if available from signup
  const [email, setEmail] = useState(localStorage.getItem("lastEmail") || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Trim whitespace from inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // For development: Use local authentication when server is not available
    if (trimmedEmail === "test@example.com" && trimmedPassword === "password123") {
      // Set the authentication flag
      localStorage.setItem("isAuth", "true");
      console.log("Authentication successful, navigating to home page");
     navigate("/home");
 // redirect to home page
      return;
    }

    // Try server authentication if local authentication fails
    axios.post('http://localhost:3001/login', {
      email: trimmedEmail,
      password: trimmedPassword
    })
    .then(result => {
      console.log(result);
      if(result.data == "Success"){
        // Set the authentication flag
        localStorage.setItem("isAuth", "true");
        console.log("Authentication successful, navigating to home page");
       navigate("/home");

// redirect to home page
      } else {
        alert(result.data); // Show error message from server
      }
    })
    .catch(err => {
      console.log(err);
      alert("Login failed. Please check if the server is running.");
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#D1F8EF]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#3674B5]">
        <h2 className="text-2xl font-bold text-center text-[#3674B5] mb-6">
          Login to Your Account
        </h2>
        <div className="mb-4 p-3 bg-[#A1E3F9] bg-opacity-20 rounded-lg border border-[#A1E3F9]">
          <p className="text-sm text-[#3674B5] mb-2">
            <strong>Test Account Available:</strong> You can use the test credentials below.
          </p>
          <button 
            type="button"
            className="text-sm bg-[#578FCA] text-white px-3 py-1 rounded hover:bg-[#A1E3F9] hover:text-[#3674B5] transition-colors duration-200"
            onClick={() => {
              setEmail("test@example.com");
              setPassword("password123");
            }}
          >
            Use Test Account
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#578FCA] text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#A1E3F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A1E3F9] text-[#3674B5]"
            />
          </div>
          <div>
            <label className="block text-[#578FCA] text-sm mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#A1E3F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A1E3F9] text-[#3674B5]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#3674B5] hover:bg-[#578FCA] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#578FCA]">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#A1E3F9] hover:text-[#3674B5] font-medium transition-colors duration-200">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
