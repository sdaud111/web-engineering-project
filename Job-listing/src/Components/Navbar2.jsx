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
        window.location.href = path;
    };

    return (
        <>
            <nav
                className="absolute top-0 left-0 w-full p-8 tracking-wide z-50"
                style={{ color: logoColor }}
            >
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-3 fjalla">
                        <img src="/logo.png" width="40" height="30" alt="logo" />
                        <span className="text-4xl font-bold tracking-wider">JOBCONNECT</span>
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-14 h-14 flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                        style={{ backgroundColor: navButtonColor }}
                    >
                        {menuOpen ? (
                            <FaTimes className="text-3xl" style={{ color: navIconColor }} />
                        ) : (
                            <FiMenu className="text-3xl" style={{ color: navIconColor }} />
                        )}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div className="fixed inset-0 backdrop-blur-[2px] flex justify-end items-start pt-24 pr-8 z-40 transition-all duration-600 text-indigo-950">
                    <div
                        className="w-[20vw] rounded-2xl shadow-2xl p-6 animate-slideIn flex flex-col justify-between"
                        style={{ backgroundColor: menuBackgroundColor }}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-2xl font-semibold">Menu</h3>
                        </div>

                        <hr className="border-gray-900 mb-6" />

                        <div className="flex flex-col gap-4 mb-6">
                            {/* Active Link */}
                            <a
                                onClick={() => goTo("/landing")}
                                className="flex items-center gap-3 text-2xl font-semibold cursor-pointer"
                                style={{ color: activeTextColor }}
                            >
                                <div
                                    className="w-10 h-10 flex items-center justify-center rounded-full shadow-md"
                                    style={{
                                        color: activeIconTextColor,
                                        backgroundColor: activeIconBgColor
                                    }}
                                >
                                    <FaHome className="text-xl" />
                                </div>
                                Home
                            </a>

                            {/* Inactive Links */}
                            <a
                                onClick={() => goTo("/about")}
                                className="flex items-center gap-3 text-2xl font-semibold cursor-pointer"
                                style={linkBaseStyle}
                                onMouseEnter={(e) => (e.currentTarget.style.color = inactiveTextHoverColor)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = inactiveTextColor)}
                            >
                                <div
                                    className="w-10 h-10 flex items-center justify-center rounded-full shadow-sm"
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
                                    <FaInfoCircle className="text-lg" />
                                </div>
                                About
                            </a>

                            <a
                                onClick={() => goTo("/services")}
                                className="flex items-center gap-3 text-2xl font-semibold cursor-pointer"
                                style={linkBaseStyle}
                                onMouseEnter={(e) => (e.currentTarget.style.color = inactiveTextHoverColor)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = inactiveTextColor)}
                            >
                                <div
                                    className="w-10 h-10 flex items-center justify-center rounded-full shadow-sm"
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
                                    <FaCogs className="text-lg" />
                                </div>
                                Services
                            </a>

                            <a
                                onClick={() => goTo("/contact")}
                                className="flex items-center gap-3 text-2xl font-semibold cursor-pointer"
                                style={linkBaseStyle}
                                onMouseEnter={(e) => (e.currentTarget.style.color = inactiveTextHoverColor)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = inactiveTextColor)}
                            >
                                <div
                                    className="w-10 h-10 flex items-center justify-center rounded-full shadow-sm"
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
                                    <FaEnvelope className="text-lg" />
                                </div>
                                Contact
                            </a>
                        </div>

                        <div className="flex gap-3 mb-6 text-2xl">
                            <button
                                onClick={() => goTo("/login2")}
                                className="w-1/2 py-2 border border-indigo-600 text-indigo-700 rounded-full font-semibold hover:bg-indigo-50 transition"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => goTo("/signup2")}
                                className="w-1/2 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar2;
