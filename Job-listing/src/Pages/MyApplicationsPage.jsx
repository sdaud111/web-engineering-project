import React, { useState } from 'react';
import { FaClipboardList, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([
    { id: 1, jobTitle: 'Senior Frontend Developer', company: 'Tech Solutions Inc.', status: 'Under Review' },
    { id: 2, jobTitle: 'UI/UX Designer', company: 'Creative Minds LLC', status: 'Applied' },
    { id: 3, jobTitle: 'Node.js Backend Engineer', company: 'Server-Side Systems', status: 'Interview Scheduled' },
    { id: 4, jobTitle: 'DevOps Specialist', company: 'CloudNet', status: 'Rejected' },
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Applied':
        return <FaClock className="text-blue-500" />;
      case 'Under Review':
        return <FaClipboardList className="text-yellow-500" />;
      case 'Interview Scheduled':
        return <FaCheckCircle className="text-green-500" />;
      case 'Rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClipboardList />;
    }
  };

  return (
    <section className="bg-[#D1F8EF] bg-opacity-50 min-h-screen">
      <div className="container m-auto max-w-4xl py-24 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#3674B5] sm:text-5xl">
            My Job Applications
          </h1>
          <p className="mt-4 text-xl text-[#578FCA]">
            Track the status of all your applications in one place.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="p-4 border border-[#A1E3F9] rounded-lg flex justify-between items-center hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-bold text-[#3674B5]">{app.jobTitle}</h3>
                  <p className="text-md text-[#578FCA]">{app.company}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusIcon(app.status)}
                  <span className="font-semibold text-[#3674B5]">{app.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyApplicationsPage;
