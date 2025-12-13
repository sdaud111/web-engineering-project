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
            <NavLink className="flex flex-shrink-0 items-center mr-4 group" to="/">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4a574] to-[#f5f7fa] rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative h-14 w-14 bg-gradient-to-br from-[#1a2f4e] to-[#4a5f7f] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition duration-300">
                  <svg className="w-8 h-8 text-[#d4a574]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
              </div>
              <span className="hidden md:block text-[#f5f7fa] text-3xl font-extrabold ml-4 tracking-tight">
                Job<span className="text-[#d4a574]">-</span>Connect
              </span>
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
