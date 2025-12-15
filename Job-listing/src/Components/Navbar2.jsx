import React from "react";
import { FaCogs, FaEnvelope, FaHome, FaInfoCircle, FaTimes } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const Navbar2 = ({
    logoColor = "#000000",
    navButtonColor = "#ffffff",
    navIconColor = "#432dd7",
    menuBackgroundColor = "#ffffff",
    activeTextColor = "#432dd7",
    activeIconBgColor = "#4f39f6",
    activeIconTextColor = "#ffffff",
    inactiveTextColor = "#1e2939",
    inactiveTextHoverColor = "#4f39f6",
    inactiveIconBgColor = "#ffffff",
    inactiveIconTextColor = "#4f39f6",
    inactiveIconBorderColor = "#a3b3ff"
}) => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const linkBaseStyle = {
        color: inactiveTextColor,
        transition: "color 0.3s ease"
    };

    const iconBaseStyle = {
        backgroundColor: inactiveIconBgColor,
        color: inactiveIconTextColor,
        border: `1px solid ${inactiveIconBorderColor}`,
        transition: "all 0.3s ease"
    };

    // Simple navigation function
    const goTo = (path) => {
        // In a real application, you'd use react-router-dom or similar
        console.log(`Navigating to: ${path}`);
        // window.location.href = path; // Uncomment for actual navigation
        setMenuOpen(false); // Close menu after navigation attempt
    };

    return (
        <>
            <nav
                className="absolute top-0 left-0 w-full p-6 sm:p-8 tracking-wider z-50"
                style={{ color: logoColor }}
            >
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2 sm:gap-4 fjalla group">
                        {/* Logo Icon */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#d4a574] to-[#1a2f4e] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                            <div className="relative h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-[#1a2f4e] to-[#4a5f7f] rounded-xl flex items-center justify-center shadow-xl group-hover:scale-105 transition duration-300">
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4a574]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                </svg>
                            </div>
                        </div>
                        {/* Logo Text */}
                        <span className="text-2xl sm:text-4xl font-extrabold tracking-tight" style={{ color: logoColor }}>
                            Job<span className="text-[#d4a574]">-</span>Connect
                        </span>
                    </div>

                    {/* Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                        style={{ backgroundColor: navButtonColor }}
                    >
                        {menuOpen ? (
                            <FaTimes className="text-xl sm:text-3xl" style={{ color: navIconColor }} />
                        ) : (
                            <FiMenu className="text-xl sm:text-3xl" style={{ color: navIconColor }} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Panel */}
            {menuOpen && (
                <div className="fixed inset-0 backdrop-blur-[2px] flex justify-end items-start pt-[68px] sm:pt-24 pr-4 sm:pr-8 z-40 transition-all duration-600 text-indigo-950">
                    <div
                        // **Updated Responsive Classes**
                        className="w-[85%] max-w-[320px] sm:w-[280px] sm:max-w-xs max-h-[90vh] rounded-2xl shadow-2xl p-4 sm:p-6 animate-slideIn flex flex-col justify-between overflow-y-auto"
                        style={{ backgroundColor: menuBackgroundColor }}
                    >
                        <div className="flex justify-between items-center mb-2">
                            {/* **Updated Font Size** */}
                            <h3 className="text-xl sm:text-2xl font-semibold">Menu</h3>
                        </div>

                        <hr className="border-gray-300 mb-4 sm:mb-6" />

                        <div className="flex flex-col gap-3 mb-4 sm:gap-4 sm:mb-6">

                            {/* Active Link */}
                            <a
                                onClick={() => goTo("/landing")}
                                // **Updated Font Size**
                                className="flex items-center gap-3 text-xl sm:text-2xl font-semibold cursor-pointer"
                                style={{ color: activeTextColor }}
                            >
                                <div
                                    // **Updated Icon Size**
                                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full shadow-md"
                                    style={{
                                        color: activeIconTextColor,
                                        backgroundColor: activeIconBgColor
                                    }}
                                >
                                    <FaHome className="text-lg" />
                                </div>
                                Home
                            </a>

                            {/* Inactive Links (Applied same responsive text and icon sizes) */}
                            {[{ to: "/about", text: "About", Icon: FaInfoCircle }, { to: "/services", text: "Services", Icon: FaCogs }, { to: "/contact", text: "Contact", Icon: FaEnvelope }].map((item, index) => (
                                <a
                                    key={index}
                                    onClick={() => goTo(item.to)}
                                    className="flex items-center gap-3 text-xl sm:text-2xl font-semibold cursor-pointer"
                                    style={linkBaseStyle}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = inactiveTextHoverColor)}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = inactiveTextColor)}
                                >
                                    <div
                                        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full shadow-sm"
                                        style={iconBaseStyle}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = inactiveTextHoverColor;
                                            e.currentTarget.style.color = "#fff";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = inactiveIconBgColor;
                                            e.currentTarget.style.color = inactiveIconTextColor;
                                        }}
                                    >
                                        <item.Icon className="text-lg" />
                                    </div>
                                    {item.text}
                                </a>
                            ))}
                        </div>

                        {/* Sign In/Up Buttons */}
                        <div className="flex flex-col gap-2 sm:gap-3 text-lg">
                            <button className="w-full py-2 border border-indigo-600 text-indigo-700 rounded-full font-semibold hover:bg-indigo-50 transition">Sign In</button>
                            <button className="w-full py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">Sign Up</button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar2;