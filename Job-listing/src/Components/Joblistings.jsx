import React, { useEffect, useState } from "react";
import JobList from "./JobList";
import axios from "axios";

const Joblistings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        let jobsData = res.data;

        if (isHome) {
          jobsData = jobsData.slice(0, 3); // show 5 recent jobs on homepage
        }

        setJobs(jobsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  if (loading)
    return <p className="text-center text-gray-500">Loading jobs...</p>;

  if (jobs.length === 0)
    return <p className="text-center text-gray-500">No jobs available.</p>;

  return (
    <section className="bg-[#f5f7fa] bg-opacity-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-[#1a2f4e] mb-6 text-center">
          {isHome ? "Recent Jobs" : "All Jobs"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
  <JobList key={job._id} job={job} />
))}

        </div>
      </div>
    </section>
  );
};

export default Joblistings;
