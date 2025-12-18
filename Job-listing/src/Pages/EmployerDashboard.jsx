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
    <section className="bg-[#f5f7fa] bg-opacity-50 min-h-screen">
      <div className="container m-auto max-w-6xl py-24 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#1a2f4e] sm:text-5xl">
            Employer Dashboard
          </h1>
          <p className="mt-4 text-xl text-[#4a5f7f]">
            Manage your recruitment pipeline efficiently.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaBriefcase className="text-4xl text-[#1a2f4e] mr-4" />
            <div>
              <p className="text-3xl font-bold text-[#1a2f4e]">{stats.activeJobs}</p>
              <p className="text-[#4a5f7f]">Active Jobs</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaUsers className="text-4xl text-[#1a2f4e] mr-4" />
            <div>
              <p className="text-3xl font-bold text-[#1a2f4e]">{stats.totalApplicants}</p>
              <p className="text-[#4a5f7f]">Total Applicants</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaCalendarCheck className="text-4xl text-[#1a2f4e] mr-4" />
            <div>
              <p className="text-3xl font-bold text-[#1a2f4e]">{stats.interviewsScheduled}</p>
              <p className="text-[#4a5f7f]">Interviews Scheduled</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-4 mb-12">
          <Link to="/add-job2" className="flex items-center bg-[#1a2f4e] text-white px-6 py-3 rounded-lg hover:bg-[#2A5A8C] transition-colors shadow-md">
            <FaPlus className="mr-2" /> Post a New Job
          </Link>
          <Link to="/employer/find-talent" className="flex items-center bg-[#4a5f7f] text-white px-6 py-3 rounded-lg hover:bg-[#d4a574] hover:text-[#1a2f4e] transition-colors shadow-md">
            <FaSearch className="mr-2" /> Find Talent with AI
          </Link>
        </div>

        {/* Active Jobs Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#1a2f4e] mb-6">Active Job Postings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#d4a574]">
                  <th className="text-left p-3 text-[#4a5f7f]">Job Title</th>
                  <th className="text-left p-3 text-[#4a5f7f]">Applicants</th>
                  <th className="text-left p-3 text-[#4a5f7f]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeJobs.map(job => (
                  <tr key={job.id} className="border-b border-[#d4a574] hover:bg-[#f5f7fa]/50">
                    <td className="p-3 font-semibold text-[#1a2f4e]">{job.title}</td>
                    <td className="p-3 text-[#4a5f7f]">{job.applicants}</td>
                    <td className="p-3">
                      <Link to={`/employer/jobs/${job.id}/applicants`} className="bg-[#1a2f4e] text-white px-4 py-2 rounded-lg hover:bg-[#4a5f7f] text-sm">
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
