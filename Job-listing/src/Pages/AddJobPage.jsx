import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddJobPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    jobName: "",
    jobType: "Full-Time",
    workArrangement: "On-site",
    jobPosition: "",
    salary: 50000,
    currency: "USD",
    city: "",
    sectorArea: "",
    street: "",
    postalCode: "",
    jobDescription: "",
    additionalInformation: "",
    email: "",
    phone: "",
    website: ""
  });

  // Get employer ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const employerId = user?.user?._id;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "salary" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!employerId) {
        setError("You must be logged in as an employer to post a job");
        setLoading(false);
        return;
      }

      // Add postedBy field
      const jobData = {
        ...formData,
        postedBy: employerId
      };

      const response = await axios.post("http://localhost:5000/api/jobs", jobData);

      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        setFormData({
          jobName: "",
          jobType: "Full-Time",
          workArrangement: "On-site",
          jobPosition: "",
          salary: 50000,
          currency: "USD",
          city: "",
          sectorArea: "",
          street: "",
          postalCode: "",
          jobDescription: "",
          additionalInformation: "",
          email: "",
          phone: "",
          website: ""
        });

        // Redirect to published jobs after 2 seconds
        setTimeout(() => {
          navigate("/jobs");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-[#A1E3F9] bg-opacity-30">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-gradient-to-br from-[#D1F8EF] to-[#A1E3F9] bg-opacity-95 px-6 py-8 mb-4 shadow-md rounded-md border-t-4 border-[#3674B5] m-4 md:m-0">
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
                ✓ Job posted successfully! Redirecting...
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl text-center font-semibold mb-6 text-[#3674B5]">
                Post a New Job
              </h2>

              {/* Job Name */}
              <div className="mb-4">
                <label className="block text-[#578FCA] font-bold mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="jobName"
                  value={formData.jobName}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior React Developer"
                  required
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                />
              </div>

              {/* Job Type */}
              <div className="mb-4">
                <label htmlFor="jobType" className="block text-[#578FCA] font-bold mb-2">
                  Job Type *
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Work Arrangement */}
              <div className="mb-4">
                <label htmlFor="workArrangement" className="block text-[#578FCA] font-bold mb-2">
                  Work Arrangement *
                </label>
                <select
                  id="workArrangement"
                  name="workArrangement"
                  value={formData.workArrangement}
                  onChange={handleInputChange}
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                >
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* Job Position */}
              <div className="mb-4">
                <label className="block text-[#578FCA] font-bold mb-2">
                  Job Position *
                </label>
                <input
                  type="text"
                  name="jobPosition"
                  value={formData.jobPosition}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Developer"
                  required
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                />
              </div>

              {/* Salary */}
              <div className="mb-4">
                <label className="block text-[#578FCA] font-bold mb-2">
                  Salary ({formData.currency}) *
                </label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  required
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                />
              </div>

              {/* Location Info */}
              <h3 className="text-2xl font-bold text-[#3674B5] mb-4">Location Details</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#578FCA] font-bold mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Lahore"
                    required
                    className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  />
                </div>
                <div>
                  <label className="block text-[#578FCA] font-bold mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="e.g. 54000"
                    className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#578FCA] font-bold mb-2">
                    Sector/Area *
                  </label>
                  <input
                    type="text"
                    name="sectorArea"
                    value={formData.sectorArea}
                    onChange={handleInputChange}
                    placeholder="e.g. Technology"
                    required
                    className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  />
                </div>
                <div>
                  <label className="block text-[#578FCA] font-bold mb-2">
                    Street *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="e.g. 123 Main St"
                    required
                    className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  />
                </div>
              </div>

              {/* Job Description */}
              <h3 className="text-2xl font-bold text-[#3674B5] mb-4">Job Details</h3>

              <div className="mb-4">
                <label className="block text-[#578FCA] font-bold mb-2">
                  Job Description *
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the job, responsibilities, and requirements..."
                  rows="6"
                  required
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9] resize-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#578FCA] font-bold mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInformation"
                  value={formData.additionalInformation}
                  onChange={handleInputChange}
                  placeholder="Any additional details about the job..."
                  rows="3"
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9] resize-none"
                />
              </div>

              {/* Contact Info */}
              <h3 className="text-2xl font-bold text-[#3674B5] mb-4">Contact Information</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#578FCA] font-bold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contact@company.com"
                    required
                    className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  />
                </div>
                <div>
                  <label className="block text-[#578FCA] font-bold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +92 300 123 4567"
                    className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[#578FCA] font-bold mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://company.com"
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-3 px-4 rounded-full transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-[#3674B5] hover:bg-[#578FCA] text-white cursor-pointer'
                }`}
              >
                {loading ? 'Posting Job...' : 'Post Job'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddJobPage;
