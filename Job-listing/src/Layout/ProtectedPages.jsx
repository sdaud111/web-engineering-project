import { colors } from "../Components/AddJobComponents/nav/colors";
import LeftNav from "../Components/AddJobComponents/nav/LeftNav";
import TopNav from "../Components/AddJobComponents/nav/TopNav";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const ProtectedPages = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <main
      className={`h-screen w-full font-[Nunito] grid grid-cols-16 grid-rows-12`}
      style={{backgroundColor: colors.bgColor}}
    >
      <LeftNav collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* <TopNav
        collapsed={collapsed}
      /> */}
      <section
        className={`${
          !collapsed ? "col-span-13" : "col-span-15"
        } overflow-y-auto col-span-13 row-span-12 overflow-hidden flex justify-center items-start`}
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
