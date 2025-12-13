import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaFileDownload, FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobApplicationsPage = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch job details
        const jobRes = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
        setJob(jobRes.data);

        // Fetch applications for this job
        const appRes = await axios.get(`http://localhost:5000/api/applications/job/${jobId}`);
        setApplications(appRes.data.applications || []);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications");
        setLoading(false);
      }
    };

    if (jobId) {
      fetchData();
    }
  }, [jobId]);

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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-xl">Loading applications...</p>
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500 text-xl">{error}</p>
    </div>;
  }

  return (
    <section className="bg-[#f5f7fa] bg-opacity-50 min-h-screen py-10">
      <div className="container m-auto max-w-6xl px-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold text-[#1a2f4e] mb-2">
            Applications for: {job?.jobName}
          </h1>
          <p className="text-[#4a5f7f]">
            {job?.city} • {job?.jobType} • {applications.length} Application{applications.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <p className="text-gray-500 text-lg">No applications yet for this job.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app._id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#1a2f4e]">
                {/* Applicant Info */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1a2f4e]">{app.applicantName}</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-[#f5f7fa] bg-opacity-30 p-4 rounded-md">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-[#1a2f4e]" />
                    <a href={`mailto:${app.applicantEmail}`} className="text-[#1a2f4e] hover:underline">
                      {app.applicantEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-[#1a2f4e]" />
                    <a href={`tel:${app.applicantPhone}`} className="text-[#1a2f4e] hover:underline">
                      {app.applicantPhone}
                    </a>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="mb-4">
                  <h4 className="font-bold text-[#4a5f7f] mb-2">Cover Letter:</h4>
                  <p className="text-gray-700 whitespace-pre-line">{app.coverLetter}</p>
                </div>

                {/* Resume Download */}
                {app.resumePath && (
                  <a
                    href={`http://localhost:5000/${app.resumePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1a2f4e] hover:bg-[#4a5f7f] text-white px-4 py-2 rounded-md transition-colors"
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

export default JobApplicationsPage;
