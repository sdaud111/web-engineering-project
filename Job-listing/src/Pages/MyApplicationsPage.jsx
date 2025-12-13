import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaClock, FaCheckCircle, FaTimesCircle, FaFileDownload } from 'react-icons/fa';
import axios from 'axios';

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?._id;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!userId) {
          setError("You must be logged in to view your applications");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/applications/user/${userId}`);
        setApplications(response.data.applications || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications");
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-blue-500" />;
      case 'accepted':
        return <FaCheckCircle className="text-green-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      case 'shortlisted':
        return <FaClipboardList className="text-yellow-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      case 'shortlisted': return 'Shortlisted';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-xl">Loading your applications...</p>
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
    <section className="bg-[#f5f7fa] bg-opacity-50 min-h-screen">
      <div className="container m-auto max-w-4xl py-24 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#1a2f4e] sm:text-5xl">
            My Job Applications
          </h1>
          <p className="mt-4 text-xl text-[#4a5f7f]">
            Track the status of all your applications in one place.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-lg text-center">
            <p className="text-gray-500 text-lg mb-4">You haven't applied to any jobs yet.</p>
            <a href="/jobs" className="text-[#1a2f4e] font-bold hover:underline">
              Browse Jobs →
            </a>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-[#4a5f7f] mb-4">Total Applications: {applications.length}</p>
            <div className="space-y-4">
              {applications.map(app => (
                <div key={app._id} className="p-4 border border-[#d4a574] rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1a2f4e]">{app.job?.jobName || 'Job Title'}</h3>
                      <p className="text-md text-[#4a5f7f]">{app.job?.city} • {app.job?.jobType}</p>
                      <p className="text-sm text-gray-500 mt-1">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(app.status)}
                      <span className="font-semibold text-[#1a2f4e]">{getStatusLabel(app.status)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <p className="text-sm text-gray-600 mb-2"><strong>Cover Letter:</strong></p>
                    <p className="text-sm text-gray-700">{app.coverLetter?.substring(0, 150)}...</p>
                    
                    {app.resumePath && (
                      <a 
                        href={`http://localhost:5000/${app.resumePath}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-[#1a2f4e] hover:underline"
                      >
                        <FaFileDownload className="mr-1" />
                        View My Resume
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyApplicationsPage;
