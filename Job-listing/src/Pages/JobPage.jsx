import React, { useState } from 'react';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import ApplyJobForm from '../Components/ApplyJobForm';

const JobPage = () => {
  const job = useLoaderData();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userType = user?.user?.userType;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${job._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete job");
      navigate("/jobs");
    } catch (err) {
      alert(err.message);
      setDeleting(false);
    }
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link to="/jobs" className="text-[#4a5f7f] hover:text-[#1a2f4e] flex items-center transition-colors duration-200">
            <FaArrowLeft className='mr-2' />Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-[#f5f7fa] bg-opacity-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <main className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left border-l-4 border-[#1a2f4e]">
                <div className="text-[#4a5f7f] mb-4 font-medium">{job.jobType}</div>
                <h1 className="text-3xl font-bold mb-4 text-[#1a2f4e]">{job.jobName}</h1>
                <div className="mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className='mr-1 text-[#d4a574]'/>
                  <p className="text-[#4a5f7f]">{`${job.city}, ${job.sectorArea}, ${job.street}`}</p>
                </div>
                <p className="text-[#4a5f7f] mb-2 font-medium">Work Arrangement: {job.workArrangement}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-[#1a2f4e] text-lg font-bold mb-6">Job Description</h3>
                <p className="mb-4">{job.jobDescription}</p>

                <h3 className="text-[#1a2f4e] text-lg font-bold mb-2">Salary</h3>
                <p className="mb-4">{job.salary} {job.currency} / Year</p>
              </div>

              {/* Apply for Job Form - Only show to applicants */}
              {userType === 'applicant' && <ApplyJobForm jobId={job._id} />}
            </main>

            <aside className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Contact Info</h3>
                <p className="mb-2"><strong>Email:</strong> {job.email}</p>
                <p className="mb-2"><strong>Phone:</strong> {job.phone}</p>
                {job.website && <p className="mb-2"><strong>Website:</strong> <a href={job.website} className="text-[#1a2f4e]" target="_blank">{job.website}</a></p>}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/jobs/edits/${job._id}`}
                  className="bg-[#1a2f4e] hover:bg-[#4a5f7f] text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  {deleting ? "Deleting..." : "Delete Job"}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPage;
