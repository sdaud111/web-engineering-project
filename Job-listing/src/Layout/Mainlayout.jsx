import React from 'react'
import {Outlet, Link} from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Footer = () => {
  return (
    <footer className="bg-[#1a2f4e] text-[#f5f7fa] py-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#d4a574]">Job Connect</h3>
            <p className="mb-4 text-sm">Find your dream <span className="text-[#d4a574] font-medium">jobs</span> with our comprehensive job listing platform.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#d4a574]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#d4a574] transition-colors duration-200">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-[#d4a574] transition-colors duration-200">Browse Jobs</Link></li>
              <li><Link to="/add-job" className="hover:text-[#d4a574] transition-colors duration-200">Post a Job</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#d4a574]">Contact</h3>
            <p className="text-sm">Email: info@jobconnect.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="border-t border-[#d4a574] border-opacity-20 mt-8 pt-6 text-center">
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
      <main className="flex-grow ">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Mainlayout
