import React from 'react'
import {Outlet, Link} from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Footer = () => {
  return (
    <footer className="bg-[#3674B5] text-[#D1F8EF] py-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#A1E3F9]">Job Connect</h3>
            <p className="mb-4 text-sm">Find your dream <span className="text-[#A1E3F9] font-medium">jobs</span> with our comprehensive job listing platform.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#A1E3F9]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#A1E3F9] transition-colors duration-200">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-[#A1E3F9] transition-colors duration-200">Browse Jobs</Link></li>
              <li><Link to="/add-job" className="hover:text-[#A1E3F9] transition-colors duration-200">Post a Job</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#A1E3F9]">Contact</h3>
            <p className="text-sm">Email: info@jobconnect.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="border-t border-[#A1E3F9] border-opacity-20 mt-8 pt-6 text-center">
          <p>&copy; 2025 Job Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const Mainlayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-[#D1F8EF]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Mainlayout
