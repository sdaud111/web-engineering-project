import React, { useState, useEffect } from "react";
import { FaUser, FaFileAlt, FaLightbulb, FaBrain } from "react-icons/fa";
import axios from "axios";

const ProfilePage = () => {
 const storedUser = JSON.parse(localStorage.getItem("user"));
const userId = storedUser.user._id; // use id from localStorage
console.log(userId);
  const [user, setUser] = useState(null);
  const [newSkill, setNewSkill] = useState("");

  // Fetch full user profile from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  // Add new skill
  const handleAddSkill = async () => {
    if (!newSkill || (user.skills && user.skills.includes(newSkill))) return;

    const updatedSkills = user.skills ? [...user.skills, newSkill] : [newSkill];
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${userId}`, {
        skills: updatedSkills,
      });
      setUser(res.data);
      setNewSkill("");
    } catch (err) {
      console.error("Failed to add skill:", err);
    }
  };

  // Upload resume
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/resume/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUser(res.data);
    } catch (err) {
      console.error("Resume upload failed:", err);
    }
  };

  if (!user) return <p className="text-center text-gray-500 mt-10">Loading profile...</p>;

  return (
    <section className="bg-[#D1F8EF] bg-opacity-50 min-h-screen">
      <div className="container m-auto max-w-4xl py-24 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#3674B5] sm:text-5xl">
            Your Professional Profile
          </h1>
          <p className="mt-4 text-xl text-[#578FCA]">
            Keep your details updated to get the best job matches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: User Details & Skills */}
          <div className="md:col-span-2 space-y-8">
            {/* User Details */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#3674B5]">
              <h2 className="text-2xl font-bold text-[#3674B5] mb-4 flex items-center">
                <FaUser className="mr-3" /> User Details
              </h2>
              <div className="space-y-2">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User Type:</strong> {user.userType}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-[#3674B5] mb-4 flex items-center">
                <FaLightbulb className="mr-3" /> Your Skills
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {user.skills && user.skills.length > 0
                  ? user.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-[#A1E3F9] text-[#3674B5] px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {skill}
                      </span>
                    ))
                  : <p className="text-gray-500">No skills added yet.</p>}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="border border-[#A1E3F9] rounded-lg w-full py-2 px-3 text-[#3674B5] focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-[#3674B5] text-white px-4 py-2 rounded-lg hover:bg-[#578FCA]"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Resume & AI Actions */}
          <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg min-h-[180px]">
  <h2 className="text-2xl font-bold text-[#3674B5] mb-4 flex items-center">
    <FaFileAlt className="mr-3" /> Resume
  </h2>
  <p className="text-[#578FCA] mb-4 break-words">
    Current file: <strong>{user.resume || "No resume uploaded"}</strong>
  </p>

  {/* Custom file input */}
  <div className="relative w-full">
    <input
      id="resumeUpload"
      type="file"
      accept=".pdf,.doc,.docx"
      onChange={handleResumeUpload}
      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
    />
    <label
      htmlFor="resumeUpload"
      className="w-full bg-[#578FCA] text-white py-2 px-4 rounded-lg text-center block cursor-pointer hover:bg-[#A1E3F9] hover:text-[#3674B5] transition-colors"
    >
      {user.resume ? "Update Selected File" : "Upload New Resume"}
    </label>
  </div>
</div>



            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#578FCA]">
              <h2 className="text-2xl font-bold text-[#3674B5] mb-4 flex items-center">
                <FaBrain className="mr-3" /> AI Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-[#3674B5] text-white py-2 rounded-lg hover:bg-[#2A5A8C]">
                  Generate AI Summary
                </button>
                <button className="w-full border-2 border-[#3674B5] text-[#3674B5] py-2 rounded-lg hover:bg-[#A1E3F9]">
                  Get Profile Suggestions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
