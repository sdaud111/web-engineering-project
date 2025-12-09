import React, { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobList = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Use the correct field from backend
  let description = job.jobDescription ?? "No description available";
  if (!showFullDescription) {
    description = description.length > 90 ? description.substring(0, 90) + "..." : description;
  }

  // Combine city, sectorArea, street for location
  const location = `${job.city ?? ""}${job.sectorArea ? ", " + job.sectorArea : ""}${job.street ? ", " + job.street : ""}` || "Unknown location";

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-[#578FCA] my-2">{job.jobType ?? "N/A"}</div>
          <h3 className="text-xl font-bold text-[#3674B5]">{job.jobName ?? "No Title"}</h3>
        </div>

        <div className="mb-5">{description}</div>

        {job.jobDescription && job.jobDescription.length > 90 && (
          <button
            onClick={() => setShowFullDescription((prev) => !prev)}
            className="text-[#3674B5] mb-5 hover:text-[#578FCA]"
          >
            {showFullDescription ? "Less" : "More"}
          </button>
        )}

        <h3 className="text-[#3674B5] mb-2">{job.salary ?? "N/A"} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-[#578FCA] mb-3">
            <FaMapMarker className="mb-1 mr-1 inline text-[#A1E3F9]" />
            {location}
          </div>

          <Link
  to={`/jobs/${job._id}`}
  className="h-[36px] bg-[#3674B5] hover:bg-[#578FCA] text-white px-4 py-2 rounded-lg text-center text-sm"
>
  Read More
</Link>
        </div>
      </div>
    </div>
  );
};

export default JobList;
