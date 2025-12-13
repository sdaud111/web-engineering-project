import {
  FaHome, FaUser, FaEye, FaRobot, FaClipboard, FaSearchPlus,
  FaPlusCircle, FaComment, FaList, FaArrowAltCircleRight, FaArrowLeft, FaArrowRight
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import MenuItem from "../menu/MenuItem";
import { colors } from "./colors";
import { useNavigate } from "react-router-dom";

const LeftNav = ({ collapsed, setCollapsed, mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")).user;

  const isApplicant = user.userType.toLowerCase() === "applicant";
  const isEmployer = user.userType.toLowerCase() === "employer";

  function handleLogOut() {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
    window.location.href = "/login2";
  }

  const handleNavClick = (action) => {
    action();
    if (setMobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`h-full w-64 md:w-auto md:min-w-[250px] rounded-br-lg p-4 transition-all duration-300 flex flex-col justify-between shadow-lg ${
        collapsed ? "md:w-20" : "md:w-64"
      }`}
      style={{ backgroundColor: colors.leftNavBgColor, boxShadow: "4px 0 10px rgba(0,0,0,0.15)" }}
    >
        <div className="cursor-pointer p-4 flex items-center justify-center gap-4 bg-white w-fit rounded-full mx-auto">
        <button
          className="cursor-pointer rounded-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <FiMenu className="text-[30px] text-[#1a2f4e] font-extrabold" />
          ) : (
            <FaArrowLeft className="text-[30px] text-[#1a2f4e] font-extrabold" />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-10 ml-8 mt-8">
        {isApplicant && (
          <>
            {/* <MenuHeading text="Personal" collapsed={collapsed} color={colors.linkSectionsColor} /> */}
            <MenuItem Icon={FaHome} label="Home" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/"))} />
            <MenuItem Icon={FaUser} label="Profile" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/applicant-profile"))} />
            <MenuItem Icon={FaComment} label="Messages" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/messages"))} />

            {/* <MenuHeading text="Find Jobs" collapsed={collapsed} color={colors.linkSectionsColor} /> */}
            <MenuItem Icon={FaSearchPlus} label="Jobs" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/jobs"))} />
            <MenuItem Icon={FaClipboard} label="My Applications" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/my-applications"))} />

            {/* <MenuHeading text="Explore" collapsed={collapsed} color={colors.linkSectionsColor} /> */}
            <MenuItem Icon={FaList} label="My Feed" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/feed"))} />

            <MenuItem Icon={FaArrowAltCircleRight} label="Sign Out" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(handleLogOut)} />
          </>
        )}

        {/* 🏢 EMPLOYER MENU */}
        {isEmployer && (
          <>
            {/* <MenuHeading text="Company Info" collapsed={collapsed} color={colors.linkSectionsColor} /> */}
            <MenuItem Icon={FaUser} label="Profile" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/profile"))} />
            <MenuItem Icon={FaComment} label="Messages" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/messages"))} />

            {/* <MenuHeading text="Jobs" collapsed={collapsed} color={colors.linkSectionsColor} /> */}
            <MenuItem Icon={FaPlusCircle} label="Add Job" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/add-job"))} />
            <MenuItem Icon={FaPlusCircle} label="Published Jobs" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/jobs"))} />
            <MenuItem Icon={FaPlusCircle} label="Responses" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/responses"))} />

            {/* <MenuHeading text="Search" collapsed={collapsed} color={colors.linkSectionsColor} /> */}
            <MenuItem Icon={FaEye} label="Find talent" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/employer/find-talent"))} />
            <MenuItem Icon={FaRobot} label="AI search" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/ai-search"))} />
            
            <MenuItem Icon={FaArrowAltCircleRight} label="Sign Out" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(handleLogOut)} />
          </>
        )}

      </div>
      <div className="row-span-1 col-span-1 flex justify-around">
        <div className="w-[75px] h-[75px] bg-black rounded-full p-1">
          <div className="w-full rounded-full h-full bg-red-400"></div>
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
              className="text-lg"
              style={{ color: colors.profileUserTypeColor }}
            >
              {user.userType[0].toUpperCase() + user.userType.slice(1)}
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LeftNav;
