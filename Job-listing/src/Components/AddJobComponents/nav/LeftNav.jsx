import {
  FaHome, FaUser, FaEye, FaRobot, FaClipboard, FaSearchPlus,
  FaPlusCircle, FaComment, FaList, FaArrowAltCircleRight, FaArrowLeft, FaArrowRight
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import MenuItem from "../menu/MenuItem";
import { colors } from "./colors";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

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
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4a574] to-[#f5f7fa] rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
              <div className="relative h-14 w-14 bg-gradient-to-br from-[#f5f7fa] to-[#d4a574] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition duration-300">
                <svg className="w-8 h-8 text-[#1a2f4e]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
            </div>
            {!collapsed && (
              <span className="text-2xl font-extrabold tracking-tight text-[#f5f7fa]">
                Job<span className="text-[#d4a574]">-</span>Connect
              </span>
            )}
          </div>
          <div className="cursor-pointer p-3 flex items-center justify-center gap-4 bg-white w-fit rounded-full mx-auto">
            <button
              className="cursor-pointer rounded-full"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <FiMenu className="text-[26px] text-[#1a2f4e] font-extrabold" />
              ) : (
                <FaArrowLeft className="text-[26px] text-[#1a2f4e] font-extrabold" />
              )}
            </button>
          </div>
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
            <MenuItem Icon={FaRobot} label="AI search" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/ai-search"))} />

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
