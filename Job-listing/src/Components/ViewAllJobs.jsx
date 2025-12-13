import React from 'react'
import {Link} from 'react-router-dom'
const ViewAllJobs = () => {
  return (
     <section className="m-auto max-w-lg my-10 px-6">
      <Link
        to="/jobs"
        className="block bg-[#1a2f4e] text-white text-center py-4 px-6 rounded-xl hover:bg-[#4a5f7f] transition-all duration-300 shadow-md hover:shadow-lg"
        >View All Jobs</Link
      >
    </section>

  )
}

export default ViewAllJobs
