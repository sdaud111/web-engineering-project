import React from 'react'
import {Link} from 'react-router-dom'
const ViewAllJobs = () => {
  return (
     <section className="m-auto max-w-lg my-10 px-6">
      <Link
        to="/jobs"
        className="block bg-[#3674B5] text-white text-center py-4 px-6 rounded-xl hover:bg-[#578FCA] transition-all duration-300 shadow-md hover:shadow-lg"
        >View All Jobs</Link
      >
    </section>

  )
}

export default ViewAllJobs
