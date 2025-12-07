import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { colors } from "./colors";

const TopNav = ({ collapsed, setCollapsed, pageName }) => {
    const userType = JSON.parse(localStorage.getItem("user"))["user"]["userType"];
  return (
    <nav
      className="col-span-13 row-span-1 flex justify-between p-4 text-[22px]"
      style={{ backgroundColor: colors.topNavBgColor, color: colors.topNavColor }}
    >
      <div className="flex gap-6 w-1/5 h-full items-center">
        <button
          className="cursor-pointer rounded-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <FaArrowRight className="text-[20px]" /> : <FaArrowLeft className="text-[20px]" />}
        </button>
        <h2 className="font-bold">
            {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </h2>
        <p>/</p>
        <p className="font-normal" style={{ color: colors.topNavColor }}>
          {pageName}
        </p>
      </div>
      <div className="flex items-center"></div>
    </nav>
  );
};

export default TopNav;
