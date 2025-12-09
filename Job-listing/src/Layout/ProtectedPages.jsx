import { colors } from "../Components/AddJobComponents/nav/colors";
import LeftNav from "../Components/AddJobComponents/nav/LeftNav";
import TopNav from "../Components/AddJobComponents/nav/TopNav";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const ProtectedPages = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <main
      className={`bg-[${colors.bgColor}] min-h-screen w-full font-[Nunito] grid grid-cols-16 grid-rows-12`}
    >
      {/* Side Navigation */}
      <LeftNav collapsed={collapsed} />

      {/* Top Navigation */}
      <TopNav
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content Area */}
      <section
        className={`${
          !collapsed ? "col-span-13" : "col-span-15"
        } col-span-13 row-span-11 rounded-tl-4xl flex justify-center items-start p-12`}
        style={{ backgroundColor: colors.mainBgColor }}
      >
        {/* 🔥 Router injects the page here */}
        <div className="w-full h-full">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default ProtectedPages;
