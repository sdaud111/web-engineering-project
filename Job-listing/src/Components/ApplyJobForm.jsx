import React, { useState } from 'react';
import { FaFileUpload, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const ApplyJobForm = ({ jobId }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    coverLetter: ''
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));
  const applicantId = user?.user?._id;

  // Pre-fill with user data if available
  React.useEffect(() => {
    if (user?.user) {
      setFormData(prev => ({
        ...prev,
        applicantName: user.user.name || '',
        applicantEmail: user.user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        setResume(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        setResume(null);
        return;
      }
      setResume(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validation
      if (!applicantId) {
        setError('You must be logged in to apply');
        setLoading(false);
        return;
      }

      if (!formData.applicantName || !formData.applicantEmail || !formData.applicantPhone || !formData.coverLetter) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      if (!resume) {
        setError('Resume PDF is required');
        setLoading(false);
        return;
      }

      // Create FormData for multipart upload
      const submitData = new FormData();
      submitData.append('jobId', jobId);
      submitData.append('applicantId', applicantId);
      submitData.append('applicantName', formData.applicantName);
      submitData.append('applicantEmail', formData.applicantEmail);
      submitData.append('applicantPhone', formData.applicantPhone);
      submitData.append('coverLetter', formData.coverLetter);
      submitData.append('resume', resume);

      // Submit application
      const response = await axios.post('http://localhost:5000/api/applications', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          applicantName: '',
          applicantEmail: '',
          applicantPhone: '',
          coverLetter: ''
        });
        setResume(null);

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 border-l-4 border-[#3674B5]">
      <h3 className="text-2xl font-bold mb-6 text-[#3674B5]">Apply For This Job</h3>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 flex items-center">
          <FaCheckCircle className="mr-2" />
          Application submitted successfully! Good luck!
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {!applicantId && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md mb-4">
          Please log in to apply for this job.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="applicantName" className="block text-[#578FCA] font-bold mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="applicantEmail" className="block text-[#578FCA] font-bold mb-2">
            Email *
          </label>
          <input
            type="email"
            id="applicantEmail"
            name="applicantEmail"
            value={formData.applicantEmail}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required
            className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
          />
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label htmlFor="applicantPhone" className="block text-[#578FCA] font-bold mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="applicantPhone"
            name="applicantPhone"
            value={formData.applicantPhone}
            onChange={handleInputChange}
            placeholder="+92300123456"
            required
            className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
          />
        </div>

        {/* Cover Letter Field */}
        <div className="mb-4">
          <label htmlFor="coverLetter" className="block text-[#578FCA] font-bold mb-2">
            Cover Letter / Why You're a Good Fit *
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            placeholder="Tell us why you're the perfect fit for this role..."
            rows="5"
            required
            className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9] resize-none"
          />
        </div>

        {/* Resume Upload Field */}
        <div className="mb-6">
          <label htmlFor="resume" className="block text-[#578FCA] font-bold mb-2">
            Upload Resume (PDF) *
          </label>
          <div className="border-2 border-dashed border-[#3674B5] rounded-lg p-6 text-center bg-[#D1F8EF] bg-opacity-30 cursor-pointer hover:bg-opacity-50 transition-all">
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="hidden"
            />
            <label htmlFor="resume" className="cursor-pointer block">
              <FaFileUpload className="text-4xl text-[#3674B5] mx-auto mb-2" />
              <p className="text-[#578FCA] font-semibold">Click to upload or drag and drop</p>
              <p className="text-[#A1E3F9] text-sm">PDF files only (max 5MB)</p>
              {resume && <p className="text-green-600 font-semibold mt-2">✓ {resume.name}</p>}
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !applicantId}
          className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-200 ${
            loading || !applicantId
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-[#3674B5] hover:bg-[#578FCA] text-white cursor-pointer'
          }`}
        >
          {loading ? 'Submitting Application...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default ApplyJobForm;
