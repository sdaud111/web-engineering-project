import React from 'react';
import { FaBriefcase, FaUsers, FaCalendarCheck, FaPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
  const stats = {
    activeJobs: 4,
    totalApplicants: 128,
    interviewsScheduled: 12,
  };

  const activeJobs = [
    { id: 1, title: 'Senior Frontend Developer', applicants: 32 },
    { id: 2, title: 'Node.js Backend Engineer', applicants: 45 },
    { id: 3, title: 'UI/UX Designer', applicants: 21 },
    { id: 4, title: 'DevOps Specialist', applicants: 30 },
  ];

  return (
    <section className="bg-[#D1F8EF] bg-opacity-50 min-h-screen">
      <div className="container m-auto max-w-6xl py-24 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#3674B5] sm:text-5xl">
            Employer Dashboard
          </h1>
          <p className="mt-4 text-xl text-[#578FCA]">
            Manage your recruitment pipeline efficiently.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaBriefcase className="text-4xl text-[#3674B5] mr-4" />
            <div>
              <p className="text-3xl font-bold text-[#3674B5]">{stats.activeJobs}</p>
              <p className="text-[#578FCA]">Active Jobs</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaUsers className="text-4xl text-[#3674B5] mr-4" />
            <div>
              <p className="text-3xl font-bold text-[#3674B5]">{stats.totalApplicants}</p>
              <p className="text-[#578FCA]">Total Applicants</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaCalendarCheck className="text-4xl text-[#3674B5] mr-4" />
            <div>
              <p className="text-3xl font-bold text-[#3674B5]">{stats.interviewsScheduled}</p>
              <p className="text-[#578FCA]">Interviews Scheduled</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-4 mb-12">
          <Link to="/add-job" className="flex items-center bg-[#3674B5] text-white px-6 py-3 rounded-lg hover:bg-[#2A5A8C] transition-colors shadow-md">
            <FaPlus className="mr-2" /> Post a New Job
          </Link>
          <Link to="/employer/find-talent" className="flex items-center bg-[#578FCA] text-white px-6 py-3 rounded-lg hover:bg-[#A1E3F9] hover:text-[#3674B5] transition-colors shadow-md">
            <FaSearch className="mr-2" /> Find Talent with AI
          </Link>
        </div>

        {/* Active Jobs Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#3674B5] mb-6">Active Job Postings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#A1E3F9]">
                  <th className="text-left p-3 text-[#578FCA]">Job Title</th>
                  <th className="text-left p-3 text-[#578FCA]">Applicants</th>
                  <th className="text-left p-3 text-[#578FCA]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeJobs.map(job => (
                  <tr key={job.id} className="border-b border-[#A1E3F9] hover:bg-[#D1F8EF]/50">
                    <td className="p-3 font-semibold text-[#3674B5]">{job.title}</td>
                    <td className="p-3 text-[#578FCA]">{job.applicants}</td>
                    <td className="p-3">
                      <Link to={`/employer/jobs/${job.id}/applicants`} className="bg-[#3674B5] text-white px-4 py-2 rounded-lg hover:bg-[#578FCA] text-sm">
                        Manage Applicants
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployerDashboard;
