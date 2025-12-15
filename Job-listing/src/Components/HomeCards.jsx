import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

const HomeCards = ({ type }) => {
  return (
    <section className="py-8 bg-gradient-to-b from-[#f5f7fa] to-[#e2e8f0]">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">

          {type === "applicant" && (
            <Card bg="bg-white hover:bg-gradient-to-r hover:from-[#d4a574] hover:to-[#f5f7fa] transition-all duration-300">
              <h2 className="text-3xl font-bold text-[#1a2f4e]">For Applicants</h2>
              <p className="mt-3 mb-5 text-[#4a5f7f]">
                Explore the <span className="font-bold text-[#1a2f4e]">latest jobs</span> and start your career journey today.
              </p>
              <Link
                to="/jobs"
                className="inline-block bg-[#1a2f4e] text-white rounded-lg px-6 py-3 font-semibold hover:bg-[#4a5f7f] transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Browse Jobs
              </Link>
            </Card>
          )}

          {type === "employer" && (
            <Card bg="bg-[#f5f7fa] bg-opacity-70 hover:bg-[#e2e8f0] transition-all duration-300">
              <h2 className="text-3xl font-bold text-[#1a2f4e]">For Employers</h2>
              <p className="mt-3 mb-5 text-[#4a5f7f]">
                Post your <span className="font-bold text-[#1a2f4e]">job listings</span> and find the perfect candidates effortlessly.
              </p>
              <Link
                to="/add-job"
                className="inline-block bg-[#4a5f7f] text-white rounded-lg px-6 py-3 font-semibold hover:bg-[#d4a574] hover:text-[#1a2f4e] transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Add Job
              </Link>
            </Card>
          )}

        </div>
      </div>
    </section>
  );
};

export default HomeCards;
