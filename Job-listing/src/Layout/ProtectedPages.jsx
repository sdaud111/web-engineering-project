import { colors } from "../Components/AddJobComponents/nav/colors";
import LeftNav from "../Components/AddJobComponents/nav/LeftNav";
import TopNav from "../Components/AddJobComponents/nav/TopNav";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const ProtectedPages = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main
      className="h-screen w-full font-[Nunito] flex flex-col md:flex-row relative"
      style={{ backgroundColor: colors.bgColor }}
    >
      {/* Mobile Menu Button (UNCHANGED) */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-3 rounded-full shadow-lg"
      >
        <FiMenu className="text-2xl text-[#1a2f4e]" />
      </button>

      {/* Sidebar */}
      <div className="fixed md:relative z-40 h-full">
        <LeftNav
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>

      {/* ❌ REMOVED DUPLICATE OVERLAY FROM HERE */}

      {/* Main Content */}
      <section
        className="flex-1 overflow-y-auto w-full pt-16 md:pt-0"
        style={{ backgroundColor: colors.mainBgColor }}
      >
        <div className="w-full h-full">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default ProtectedPages;
