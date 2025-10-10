import React from 'react'
import Hero from '../Components/Hero'
import HomeCards from '../Components/HomeCards'
import Joblistings from '../Components/Joblistings'
import ViewAllJobs from '../Components/ViewAllJobs'

const HomePage = () => {
  return (
   <>
   <Hero />
   <HomeCards />
   <Joblistings isHome={true} />
   <ViewAllJobs />
   </>
  )
}

export default HomePage
