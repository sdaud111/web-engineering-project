import {
  FaHome, FaUser, FaEye, FaRobot, FaClipboard, FaSearchPlus,
  FaPlusCircle, FaComment, FaList, FaArrowAltCircleRight, FaArrowLeft
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import MenuItem from "../menu/MenuItem";
import { colors } from "./colors";
import { useNavigate } from "react-router-dom";

const LeftNav = ({ collapsed, setCollapsed, mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = storedUser?.user || {};

  const isApplicant = user.userType?.toLowerCase() === "applicant";
  const isEmployer = user.userType?.toLowerCase() === "employer";

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login2");
    window.location.reload();
  };

  const handleNavClick = (action) => {
    action();
    if (setMobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <nav
        className={`
          fixed md:static top-0 left-0
          h-full w-64
          pt-16 md:pt-0   /* ✅ FIX: space for mobile hamburger */
          transition-transform duration-300 ease-in-out
          flex flex-col justify-between
          shadow-lg z-50
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${collapsed ? "md:w-20" : "md:w-64"}
        `}
        style={{ backgroundColor: colors.leftNavBgColor }}
      >

        {/* HEADER */}
        <div className="flex md:flex-col flex-row items-center justify-between gap-4 p-4 border-b border-white/20 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-14 w-14 bg-gradient-to-br from-[#f5f7fa] to-[#d4a574] rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-[#1a2f4e]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2z" />
              </svg>
            </div>

            {!collapsed && (
              <span className="text-2xl font-extrabold text-white whitespace-nowrap hidden md:block">
                Job<span className="text-[#d4a574]">-</span>Connect
              </span>
            )}
          </div>

          {/* Desktop collapse button */}
          <button
            className="bg-white p-3 rounded-full hidden md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <FiMenu className="text-[22px] text-[#1a2f4e]" />
            ) : (
              <FaArrowLeft className="text-[22px] text-[#1a2f4e]" />
            )}
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-6 px-6 pt-6 flex-grow overflow-y-auto pr-3">
          {isApplicant && (
            <>
              <MenuItem Icon={FaHome} label="Home" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/"))} />
              <MenuItem Icon={FaUser} label="Profile" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/applicant-profile"))} />
              <MenuItem Icon={FaComment} label="Messages" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/messages"))} />
              <MenuItem Icon={FaSearchPlus} label="Jobs" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/jobs"))} />
              <MenuItem Icon={FaClipboard} label="My Applications" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/my-applications"))} />
              <MenuItem Icon={FaRobot} label="AI Search" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/ai-search"))} />
              <MenuItem Icon={FaList} label="My Feed" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/feed"))} />
              <MenuItem Icon={FaArrowAltCircleRight} label="Sign Out" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(handleLogOut)} />
            </>
          )}

          {isEmployer && (
            <>
              <MenuItem Icon={FaUser} label="Profile" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/profile"))} />
              <MenuItem Icon={FaComment} label="Messages" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/messages"))} />
              <MenuItem Icon={FaPlusCircle} label="Add Job" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/add-job"))} />
              <MenuItem Icon={FaPlusCircle} label="Published Jobs" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/jobs"))} />
              <MenuItem Icon={FaPlusCircle} label="Responses" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/responses"))} />
              <MenuItem Icon={FaEye} label="Find Talent" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(() => navigate("/employer/find-talent"))} />
              <MenuItem Icon={FaArrowAltCircleRight} label="Sign Out" collapsed={collapsed} color={colors.linksColor} onClick={() => handleNavClick(handleLogOut)} />
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex items-center gap-4 p-4 shrink-0 border-t border-white/20">
          <div className="w-12 h-12 bg-red-400 rounded-full" />
          {!collapsed && (
            <div className="overflow-hidden">
              <h2 className="font-bold text-lg truncate" style={{ color: colors.profileNameColor }}>
                {user.name}
              </h2>
              <p className="text-sm truncate" style={{ color: colors.profileUserTypeColor }}>
                {user.userType}
              </p>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default LeftNav;
