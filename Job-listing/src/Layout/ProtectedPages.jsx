import { colors } from "../Components/AddJobComponents/nav/colors";
import LeftNav from "../Components/AddJobComponents/nav/LeftNav";
import TopNav from "../Components/AddJobComponents/nav/TopNav";
import React, { useState } from "react";
import HomePage from "../Pages/HomePage";

const ProtectedPages = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState({
    component: <HomePage />,
    name: "Home",
  });

  return (
    <main
      className={`bg-[${colors.bgColor}] min-h-screen w-full font-[Nunito] grid grid-cols-16 grid-rows-12`}
    >
      <LeftNav collapsed={collapsed} setActiveComponent={setActiveComponent} />
      <TopNav
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        pageName={activeComponent.name}
      />
      <section
        className={`${
          !collapsed ? "col-span-13" : "col-span-15"
        } col-span-13 row-span-11 rounded-tl-4xl flex justify-center items-center p-12`}
        style={{ backgroundColor: colors.mainBgColor }}
      >
        <div className="w-full h-full">{activeComponent.component}</div>
      </section>
    </main>
  );
};

export default ProtectedPages;
