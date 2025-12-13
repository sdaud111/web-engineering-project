import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaFileDownload, FaCheckCircle, FaTimesCircle, FaStar, FaBriefcase } from 'react-icons/fa';
import axios from 'axios';

const ResponsesPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected, shortlisted

  const user = JSON.parse(localStorage.getItem("user"));
  const employerId = user?.user?._id;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!employerId) {
          setError("You must be logged in as an employer");
          setLoading(false);
          return;
        }

        // Get all applications for all jobs posted by this employer
        const response = await axios.get(`http://localhost:5000/api/applications/employer/${employerId}`);
        setApplications(response.data.applications || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications");
        setLoading(false);
      }
    };

    fetchApplications();
  }, [employerId]);

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/applications/${applicationId}/status`, {
        status: newStatus
      });

      // Update local state
      setApplications(prev =>
        prev.map(app =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusCounts = () => {
    return {
      all: applications.length,
      pending: applications.filter(a => a.status === 'pending').length,
      shortlisted: applications.filter(a => a.status === 'shortlisted').length,
      accepted: applications.filter(a => a.status === 'accepted').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
    };
  };

  const counts = getStatusCounts();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-xl">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-[#D1F8EF] bg-opacity-50 min-h-screen py-10">
      <div className="container m-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#3674B5] mb-2">
            All Job Applications
          </h1>
          <p className="text-[#578FCA]">
            Manage applications across all your job postings
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-[#3674B5] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              filter === 'pending'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending ({counts.pending})
          </button>
          <button
            onClick={() => setFilter('shortlisted')}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              filter === 'shortlisted'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Shortlisted ({counts.shortlisted})
          </button>
          <button
            onClick={() => setFilter('accepted')}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              filter === 'accepted'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Accepted ({counts.accepted})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              filter === 'rejected'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Rejected ({counts.rejected})
          </button>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <p className="text-gray-500 text-lg mb-4">
              {filter === 'all' 
                ? "No applications received yet."
                : `No ${filter} applications.`}
            </p>
            {filter === 'all' && (
              <Link to="/add-job" className="text-[#3674B5] font-bold hover:underline">
                Post a job to start receiving applications →
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div key={app._id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3674B5]">
                {/* Job Info */}
                <div className="flex items-center gap-2 mb-3 text-[#578FCA]">
                  <FaBriefcase />
                  <Link 
                    to={`/jobs/${app.job?._id}`}
                    className="font-semibold hover:underline"
                  >
                    {app.job?.jobName || 'Job Title'}
                  </Link>
                </div>

                {/* Applicant Info */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#3674B5]">{app.applicantName}</h3>
                    <p className="text-sm text-gray-500">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateApplicationStatus(app._id, 'shortlisted')}
                      className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md text-sm"
                    >
                      <FaStar /> Shortlist
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(app._id, 'accepted')}
                      className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm"
                    >
                      <FaCheckCircle /> Accept
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(app._id, 'rejected')}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
                    >
                      <FaTimesCircle /> Reject
                    </button>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-[#D1F8EF] bg-opacity-30 p-4 rounded-md">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-[#3674B5]" />
                    <a href={`mailto:${app.applicantEmail}`} className="text-[#3674B5] hover:underline">
                      {app.applicantEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-[#3674B5]" />
                    <a href={`tel:${app.applicantPhone}`} className="text-[#3674B5] hover:underline">
                      {app.applicantPhone}
                    </a>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="mb-4">
                  <h4 className="font-bold text-[#578FCA] mb-2">Cover Letter:</h4>
                  <p className="text-gray-700 whitespace-pre-line">{app.coverLetter}</p>
                </div>

                {/* Resume Download */}
                {app.resumePath && (
                  <a
                    href={`http://localhost:5000/${app.resumePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#3674B5] hover:bg-[#578FCA] text-white px-4 py-2 rounded-md transition-colors"
                  >
                    <FaFileDownload />
                    Download Resume
                  </a>
                )}

                {/* Status Badge */}
                <div className="mt-4 pt-4 border-t">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    app.status === 'shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    Status: {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResponsesPage;
