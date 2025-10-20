import React from 'react'

const Hero = () => {
  // Hero component with background image from Unsplash
  return (
    <section className="bg-[#3674B5] py-20 mb-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb" 
          alt="People in a professional meeting" 
          className="w-full h-full object-cover opacity-20"
        />
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#A1E3F9] opacity-20"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-[#578FCA] opacity-20"></div>
        <div className="absolute top-40 right-40 w-16 h-16 rounded-full bg-[#D1F8EF] opacity-20"></div>
      </div>
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10"
      >
        <div className="text-center">
          <h1
            className="text-4xl font-extrabold text-[#D1F8EF] sm:text-5xl md:text-6xl"
          >
            Find Your Dream <span className="text-[#A1E3F9]">Jobs</span>
          </h1>
          <p className="my-6 text-xl text-[#A1E3F9]">
            Discover opportunities that match your skills and aspirations
          </p>
          <div className="mt-4">
            <button className="px-6 py-3 bg-[#A1E3F9] text-[#3674B5] font-semibold rounded-lg hover:bg-[#578FCA] hover:text-white transition-colors duration-300 shadow-lg hover:shadow-xl">
              Browse Latest Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
