import React from 'react'
import logo from '../assets/logo.png';
import {NavLink}  from 'react-router-dom'
const Navbar = () => {
  const linkClass = ({ isActive }) => {
    return isActive 
      ? 'text-white bg-[#4a5f7f] hover:bg-[#d4a574] hover:text-[#1a2f4e] rounded-md px-3 py-2 font-medium transition-all duration-200'
      : 'text-white hover:bg-[#d4a574] hover:text-[#1a2f4e] rounded-md px-3 py-2 font-medium transition-all duration-200';
  };

  return (
    <>
     <nav className="bg-[#1a2f4e] border-b border-[#d4a574] shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <div className="h-10 w-10 rounded-full bg-[#d4a574] flex items-center justify-center">
                <span className="text-[#1a2f4e] font-bold text-xl">JC</span>
              </div>
              <span className="hidden md:block text-[#f5f7fa] text-2xl font-bold ml-2"
                >Job Connect</span >
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/home"
                  className={linkClass}
                  >Home</NavLink
                >
                <NavLink
                  to="/jobs"
                  className={linkClass}
                  >Jobs</NavLink
                >
                <NavLink
                  to="/add-job"
                  className={linkClass}
                  >Add Job</NavLink
                >
                <NavLink
                  to="/ai-search"
                  className={linkClass}
                  >AI Search</NavLink
                >
                <NavLink
                  to="/profile"
                  className={linkClass}
                  >Profile</NavLink
                >
                <NavLink
                  to="/my-applications"
                  className={linkClass}
                  >My Applications</NavLink
                >
                <NavLink
                  to="/employer/find-talent"
                  className={linkClass}
                  >Find Talent</NavLink
                >
                <NavLink
                  to="/employer/dashboard"
                  className={linkClass}
                  >Dashboard</NavLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar
