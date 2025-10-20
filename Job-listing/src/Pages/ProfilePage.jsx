import React, { useState } from 'react';
import { FaUser, FaFileAlt, FaLightbulb, FaBrain } from 'react-icons/fa';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    resume: 'resume_final_v2.pdf',
    skills: ['React', 'Node.js', 'Tailwind CSS', 'MongoDB'],
  });
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill && !user.skills.includes(newSkill)) {
      setUser(prevUser => ({ ...prevUser, skills: [...prevUser.skills, newSkill] }));
      setNewSkill('');
    }
  };

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
          {/* Left Column: Main Info */}
          <div className="md:col-span-2 space-y-8">
            {/* User Details */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#3674B5]">
              <h2 className="text-2xl font-bold text-[#3674B5] mb-4 flex items-center">
                <FaUser className="mr-3" /> User Details
              </h2>
              <div className="space-y-2">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-[#3674B5] mb-4 flex items-center">
                <FaLightbulb className="mr-3" /> Your Skills
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {user.skills.map(skill => (
                  <span key={skill} className="bg-[#A1E3F9] text-[#3674B5] px-3 py-1 rounded-full text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="border border-[#A1E3F9] rounded-lg w-full py-2 px-3 text-[#3674B5] focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                />
                <button onClick={handleAddSkill} className="bg-[#3674B5] text-white px-4 py-2 rounded-lg hover:bg-[#578FCA]">
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Actions & Resume */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-[#3674B5] mb-4 flex items-center">
                <FaFileAlt className="mr-3" /> Resume
              </h2>
              <p className="text-[#578FCA] mb-4">Current file: <strong>{user.resume}</strong></p>
              <button className="w-full bg-[#578FCA] text-white py-2 rounded-lg hover:bg-[#A1E3F9] hover:text-[#3674B5] transition-colors">
                Upload New Resume
              </button>
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
