import React from 'react'

const Hero = () => {
  // Hero component with background image from Unsplash
  return (
    <section className="h-[70vh] bg-[#1a2f4e]  mb-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb" 
          alt="People in a professional meeting" 
          className="w-full h-full object-cover opacity-20"
        />
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#d4a574] opacity-20"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-[#4a5f7f] opacity-20"></div>
        <div className="absolute top-40 right-40 w-16 h-16 rounded-full bg-[#f5f7fa] opacity-20"></div>
      </div>
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10"
      >
        <div className="text-center">
          <h1
            className="text-4xl font-extrabold text-[#f5f7fa] sm:text-5xl md:text-6xl"
          >
            Find Your Dream <span className="text-[#d4a574]">Jobs</span>
          </h1>
          <p className="my-6 text-xl text-[#d4a574]">
            Discover opportunities that match your skills and aspirations
          </p>
          <div className="mt-4">
            <button className="px-6 py-3 bg-[#d4a574] text-[#1a2f4e] font-semibold rounded-lg hover:bg-[#4a5f7f] hover:text-white transition-colors duration-300 shadow-lg hover:shadow-xl">
              Browse Latest Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
