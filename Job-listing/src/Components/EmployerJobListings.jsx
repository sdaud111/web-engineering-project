import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const EmployerJobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const employerId = user?.user?._id;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!employerId) {
          setError("You must be logged in as an employer");
          setLoading(false);
          return;
        }

        // Get all jobs
        const res = await axios.get("http://localhost:5000/api/jobs");
        
        // Filter jobs posted by this employer
        const employerJobs = res.data.filter(job => job.postedBy === employerId);
        
        setJobs(employerJobs);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs");
        setLoading(false);
      }
    };

    fetchJobs();
  }, [employerId]);

  if (loading) {
    return <p className="text-center text-gray-500 py-8">Loading your jobs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-8">{error}</p>;
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
        <a href="/add-job" className="text-[#3674B5] font-bold hover:underline">
          Post your first job →
        </a>
      </div>
    );
  }

  return (
    <section className="bg-[#D1F8EF] bg-opacity-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-[#3674B5] mb-6 text-center">
          My Published Jobs ({jobs.length})
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3674B5]">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#3674B5] mb-2">{job.jobName}</h3>
                  <p className="text-[#578FCA] mb-2">{job.city} • {job.jobType} • {job.workArrangement}</p>
                  <p className="text-gray-600 mb-2">Salary: {job.salary} {job.currency}</p>
                  <p className="text-sm text-gray-500">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/jobs/${job._id}/applications`}
                    className="flex items-center gap-2 bg-[#3674B5] hover:bg-[#578FCA] text-white px-4 py-2 rounded-md transition-colors text-sm"
                  >
                    <FaEye /> View Applications
                  </Link>
                  <Link
                    to={`/jobs/${job._id}`}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors text-sm"
                  >
                    <FaEdit /> View/Edit Job
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployerJobListings;
