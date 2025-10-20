import React from 'react'
import Card from './Card'
import {Link} from 'react-router-dom'
const HomeCards = () => {
  return (
      <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card>
            <h2 className="text-2xl font-bold text-[#3674B5]">For Applicants</h2>
            <p className="mt-2 mb-4 text-[#578FCA]">
              Browse our <span className="font-bold text-[#578FCA]">jobs</span> and start your career journey today
            </p>
            <Link
              to="/jobs"
              className="inline-block bg-[#3674B5] text-white rounded-lg px-5 py-2 hover:bg-[#578FCA] transition-colors duration-200 shadow-md"
            >
              Browse Jobs
            </Link>
          </Card>
          <Card bg='bg-[#D1F8EF] bg-opacity-70'>
            
            <h2 className="text-2xl font-bold text-[#3674B5]">For Employers</h2>
            <p className="mt-2 mb-4 text-[#578FCA]">
              List your <span className="font-bold text-[#578FCA]">jobs</span> to find the perfect candidate for the role
            </p>
            <Link
              to="/add-job"
              className="inline-block bg-[#578FCA] text-white rounded-lg px-5 py-2 hover:bg-[#A1E3F9] hover:text-[#3674B5] transition-colors duration-200 shadow-md"
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
