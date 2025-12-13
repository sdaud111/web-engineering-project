import React from 'react'
import Joblistings from '../Components/Joblistings'
import EmployerJobListings from '../Components/EmployerJobListings'

const JobsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isEmployer = user?.user?.userType?.toLowerCase() === "employer";

  return (
   <section className="bg-[#f5f7fa] px-4 py-6">
      {isEmployer ? <EmployerJobListings /> : <Joblistings />}
   </section>
  )
}

export default JobsPage
