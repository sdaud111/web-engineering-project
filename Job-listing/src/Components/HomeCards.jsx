import React from 'react'
import Card from './Card'
import {Link} from 'react-router-dom'
const HomeCards = () => {
  return (
      <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card>
            <h2 className="text-2xl font-bold text-[#1a2f4e]">For Applicants</h2>
            <p className="mt-2 mb-4 text-[#4a5f7f]">
              Browse our <span className="font-bold text-[#4a5f7f]">jobs</span> and start your career journey today
            </p>
            <Link
              to="/jobs"
              className="inline-block bg-[#1a2f4e] text-white rounded-lg px-5 py-2 hover:bg-[#4a5f7f] transition-colors duration-200 shadow-md"
            >
              Browse Jobs
            </Link>
          </Card>
          <Card bg='bg-[#f5f7fa] bg-opacity-70'>
            
            <h2 className="text-2xl font-bold text-[#1a2f4e]">For Employers</h2>
            <p className="mt-2 mb-4 text-[#4a5f7f]">
              List your <span className="font-bold text-[#4a5f7f]">jobs</span> to find the perfect candidate for the role
            </p>
            <Link
              to="/add-job"
              className="inline-block bg-[#4a5f7f] text-white rounded-lg px-5 py-2 hover:bg-[#d4a574] hover:text-[#1a2f4e] transition-colors duration-200 shadow-md"
            >
              Add Job
            </Link>
          </Card>
          </div>
        </div>
      
    </section>
  )
}

export default HomeCards
