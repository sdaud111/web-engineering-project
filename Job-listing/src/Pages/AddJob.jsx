import React, {useState} from "react";
import TopNav from "../Components/AddJobComponents/nav/TopNav";
import LeftNav from "../Components/AddJobComponents/nav/LeftNav";
import AddJobLeftProgressBar from "../Components/AddJobComponents/main/AddJobLeftProgressBar";
import AddJobRightProgressBar from "../Components/AddJobComponents/main/AddJobRightProgressBar";
import { colors } from "../Components/AddJobComponents/nav/colors";

const AddJobContainer = () => {
  return (
    <div className="w-full h-full rounded-lg flex gap-2 text-black">
      <AddJobLeftProgressBar />
      <AddJobRightProgressBar />
    </div>
  );
};

const MainContent = ({collapsed}) => {
    return (
        <section className={`
        ${!collapsed ? "col-span-13" : "col-span-15"} col-span-13 row-span-11 
        rounded-tl-4xl flex justify-center items-center p-12`} style={{backgroundColor: colors.mainBgColor}}>
            <AddJobContainer/>
        </section>
    );
}

const AddJob = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <main className={`bg-[${colors.bgColor}] min-h-screen w-full font-[Nunito] grid grid-cols-16 grid-rows-12`}>
            <LeftNav collapsed = {collapsed}/>
            <TopNav collapsed = {collapsed} setCollapsed = {setCollapsed}/>
            <MainContent collapsed = {collapsed}/>
        </main>
    );
};

export default AddJobContainer;
