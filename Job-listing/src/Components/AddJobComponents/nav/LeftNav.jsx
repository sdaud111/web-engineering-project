import {FaHome, FaUser, FaEye, FaRobot,
    FaClipboard, FaSearchPlus, FaPlusCircle,
    FaCity, FaComment, FaList, FaArrowAltCircleRight} from "react-icons/fa";
import MenuHeading from "../menu/MenuHeading"
import MenuItem from "../menu/MenuItem"
import ProfilePage from "../../../Pages/ProfilePage";
import { colors } from "./colors";
import HomePage from "../../../Pages/HomePage";
import MyApplicationsPage from "../../../Pages/MyApplicationsPage";
import AddJobContainer from "../../../Pages/AddJob";
import AISearchPage from "../../../Pages/AISearchPage";

const LeftNav = ({ collapsed, setActiveComponent }) => {
  const user = JSON.parse(localStorage.getItem("user")).user;

  const isApplicant = user.userType.toLowerCase() === "applicant";
  const isEmployer = user.userType.toLowerCase() === "employer";

  function handleLogOut() {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
    window.location.href = "/login2";
  }

  return (
    <nav
      className={`row-span-12 rounded-br-lg grid grid-rows-12 grid-cols-1 p-4 transition-all duration-600 ${
        collapsed ? "col-span-1" : "col-span-3"
      }`}
      style={{ backgroundColor: colors.leftNavBgColor }}
    >
      <div className="row-span-1 col-span-1 flex justify-around">
        <div className="w-[75px] h-[75px] bg-black rounded-full p-1">
          <div className="w-full rounded-full h-full bg-blue-900"></div>
        </div>
        {!collapsed && (
          <div className="text-black w-[70%] flex flex-col justify-center">
            <h2
              className="text-2xl font-bold"
              style={{ color: colors.profileNameColor }}
            >
              {user.name}
            </h2>
            <p
              className="text-lg text-gray-600"
              style={{ color: colors.profileUserTypeColor }}
            >
              {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
            </p>
          </div>
        )}
      </div>

      <div className="row-span-11 col-span-1 flex flex-col gap-6 ml-8 mt-8">
        {isApplicant && (
                    <>
                        <MenuHeading text="Personal" collapsed={collapsed} color={colors.linkSectionsColor} />
                        <MenuItem Icon={FaHome} label="Home" collapsed={collapsed} color={colors.linksColor}  onClick={() => setActiveComponent({ component: <HomePage />, name: "Home" })} />
                        <MenuItem Icon={FaUser} label="Profile" collapsed={collapsed} color={colors.linksColor}  onClick={() => setActiveComponent({ component: <ProfilePage />, name: "Profile" })} />
                        <MenuItem Icon={FaComment} label="Messages" collapsed={collapsed} color={colors.linksColor} onClick={() => setActiveComponent({ component: <HomePage />, name: "Messages" })} />

                        <MenuHeading text="Find Jobs" collapsed={collapsed} color={colors.linkSectionsColor} />
                        <MenuItem Icon={FaSearchPlus} label="Jobs" collapsed={collapsed} color={colors.linksColor} onClick={() => setActiveComponent({ component: <HomePage />, name: "Jobs" })} />
                        <MenuItem Icon={FaClipboard} label="My Applications" collapsed={collapsed} color={colors.linksColor} onClick={() => setActiveComponent({ component: <MyApplicationsPage />, name: "My Applications" })} />

                        <MenuHeading text="Explore" collapsed={collapsed} color={colors.linkSectionsColor} />
                        <MenuItem Icon={FaList} label="My Feed" collapsed={collapsed} color={colors.linksColor}  onClick={() => setActiveComponent({ component: <HomePage />, name: "My Feed" })} />


                        <MenuItem Icon={FaArrowAltCircleRight} label="Sign Out" collapsed={collapsed} color={colors.linksColor} onClick={handleLogOut} />
                        
                    </>
                )}

                {isEmployer && (
                    <>
                        <MenuHeading text="Company Info" collapsed={collapsed} color={colors.linkSectionsColor} />
                        <MenuItem Icon={FaUser} label="Profile" collapsed={collapsed} color={colors.linksColor}  onClick={() => setActiveComponent({ component: <ProfilePage />, name: "Profile" })} />

                        <MenuHeading text="Jobs" collapsed={collapsed} color={colors.linkSectionsColor} />
                        <MenuItem Icon={FaPlusCircle} label="Add Job" collapsed={collapsed} color={colors.linksColor} onClick={() => setActiveComponent({ component: <AddJobContainer />, name: "Add Job" })} />
                        <MenuItem Icon={FaPlusCircle} label="Published Jobs" collapsed={collapsed} color={colors.linksColor} onClick={() => setActiveComponent({ component: <HomePage />, name: "Published Jobs" })} />
                        <MenuItem Icon={FaPlusCircle} label="Responses" collapsed={collapsed} color={colors.linksColor} onClick={() => setActiveComponent({ component: <HomePage />, name: "Responses" })} />

                        <MenuHeading text="Search" collapsed={collapsed} color={colors.linkSectionsColor} />
                        <MenuItem Icon={FaEye} label="Find talent" collapsed={collapsed} color={colors.linksColor} onClick={() => setActiveComponent({ component: <HomePage />, name: "Find Talent" })} />
                        <MenuItem Icon={FaRobot} label="AI search" collapsed={collapsed} color={colors.linksColor} onClick={() => setActiveComponent({ component: <AISearchPage />, name: "AI Search" })} />
                    </>
                )}
      </div>
    </nav>
  );
};

export default LeftNav;
