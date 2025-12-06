import {FaHome, FaUser, FaEye, FaRobot,
    FaClipboard, FaSearchPlus, FaPlusCircle,
    FaCity} from "react-icons/fa";
import MenuHeading from "../menu/MenuHeading"
import MenuItem from "../menu/MenuItem"


const LeftNav = ({ collapsed }) => {
    return (
        <nav className={`bg-gray-200 row-span-12 rounded-br-lg
            grid grid-rows-12 grid-cols-1 p-4 transition-all duration-600
            ${collapsed ? "col-span-1" : "col-span-3"}`}>
            {/*Profile card*/}
            <div className={"row-span-1 col-span-1 flex justify-around"}>
                <div className={"w-[75px] h-[75px] bg-black rounded-full p-1"}>
                    <div className={"w-full rounded-full h-full bg-blue-900"}></div>
                </div>
                {!collapsed && <div className={"text-black w-[70%] flex flex-col justify-center"}>
                    <h2 className={"text-2xl font-bold"}>
                        Daud Shafi Khan
                    </h2>
                    <p className={"text-lg text-gray-600"}>
                        Applicant
                    </p>
                </div>}
            </div>
            <div className={"row-span-11 col-span-1 flex flex-col gap-6 ml-8 mt-8 text-gray-600"}>
                <MenuHeading text="Personal" collapsed={collapsed} />
                <MenuItem Icon={FaHome} label="Home" collapsed={collapsed} />
                <MenuItem Icon={FaUser} label="Profile" collapsed={collapsed} />
                <MenuItem Icon={FaEye} label="Dashboard" collapsed={collapsed} />

                <MenuHeading text="Find Jobs" collapsed={collapsed} />
                <MenuItem Icon={FaSearchPlus} label="Jobs" collapsed={collapsed} />
                <MenuItem Icon={FaClipboard} label="My Applications" collapsed={collapsed} />
                <MenuItem Icon={FaRobot} label="AI Search" collapsed={collapsed} />

                <MenuHeading text="Employer" collapsed={collapsed} />
                <MenuItem Icon={FaPlusCircle} label="Add Job" collapsed={collapsed} />
                <MenuItem Icon={FaCity} label="Find talent" collapsed={collapsed} />
            </div>
        </nav>
    );
}

export default LeftNav;