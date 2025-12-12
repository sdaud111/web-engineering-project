import { FaSearch, FaEllipsisH } from "react-icons/fa";
import { colors } from "./colors";

const TopNav = ({ collapsed }) => {
    const userType = JSON.parse(localStorage.getItem("user"))["user"]["userType"];
  return (
    <nav
      className={`bg-gray-100 row-span-1 flex justify-between px-10 py-4 text-[22px] ${collapsed ? "col-span-15" : "col-span-13"}`}
      style={{ 
        color: colors.topNavColor
       }}
    >
      <div className="flex gap-6 w-1/5 h-full items-center">
        <h2 className="font-bold">
            {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </h2>
        <p className="">/</p>
        <p className="font-semibold">
          Profile Page
        </p>
      </div>
      <div className="flex gap-6 items-center">
         <FaSearch/>
         <FaEllipsisH/>
      </div>
    </nav>
  );
};

export default TopNav;
