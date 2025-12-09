import React from "react";
import Hero from "../Components/Hero";
import HomeCards from "../Components/HomeCards";
import Joblistings from "../Components/Joblistings";
import ViewAllJobs from "../Components/ViewAllJobs";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Cards Section */}
      <HomeCards />

      {/* Recent Jobs Section */}
      <Joblistings isHome={true} />

      {/* Button to view all jobs */}
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
