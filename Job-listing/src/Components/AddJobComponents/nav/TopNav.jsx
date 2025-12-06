import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TopNav = ({ collapsed, setCollapsed }) => {
    return (
        <nav className={"bg-gray-200 col-span-13 row-span-1 flex justify-between p-4 text-black text-[22px]"}>
            <div className={"flex gap-6 w-1/5 h-full items-center"}>
                <button 
                className="cursor-pointer rounded-full"
                onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed && <FaArrowRight className="text-[20px]" />}
                    {!collapsed && <FaArrowLeft className="text-[20px]" />}
                </button>
                <h2 className={"font-bold"}>Employer</h2>
                <p className={""}>/</p>
                <p className={" text-gray-500 font-normal"}>Add Job</p>
            </div>
            <div className={"flex items-center"}>

            </div>
        </nav>
    );
}

export default TopNav;