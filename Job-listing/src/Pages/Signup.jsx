import { useState } from "react";
import Navbar2 from "../Components/Navbar2.jsx";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";

/* ================= TOAST ================= */
const Toast = ({ message, show, success }) => {
    if (!show) return null;

    return (
        <div className="fixed bottom-0 right-0 z-50">
            <div
                className={`h-64 w-96 px-6 py-4 rounded-lg shadow-lg font-semibold border flex items-center justify-center
                ${success ? "border-green-500 text-green-700" : "border-red-500 text-red-700"}
                bg-white text-3xl`}
            >
                {message}
            </div>
        </div>
    );
};

/* ================= LEFT SIDEBAR ================= */
const LeftSidebar = () => {
    return (
        <div className="hidden md:flex w-1/2 h-[100vh] rounded-r-3xl bg-[url('src/assets/dots.jpg')]">
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 h-[100vh] w-full bg-blue-900 opacity-90 rounded-r-3xl justify-center px-4 sm:px-6 md:px-12">
                <h1 className="text-white text-2xl sm:text-3xl md:text-6xl font-extrabold w-full sm:w-[90%] md:w-[90%] leading-snug tracking-wide break-words">
                    See more than <span className="font-bold">THOUSANDS</span> of jobs openings across various cities of Pakistan...
                </h1>
                <p className="text-gray-300 text-base sm:text-lg md:text-2xl w-full sm:w-[90%] md:w-[60%] leading-snug tracking-wide break-words">
                    Unlock all the features of JobConnect including
                    <span className="font-bold text-white"> AI-powered job search, CV parsing, </span>
                    and <span className="font-bold text-white">various messaging features </span>
                    just to name a few. Create your own personalized profile and get started.
                </p>
            </div>
        </div>
    );
};

/* ================= RIGHT SIDEBAR ================= */
const RightSidebar = () => {
    const [toastMsg, setToastMsg] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastSuccess, setToastSuccess] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("applicant");

    const handleSignup = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/signup", {
                name,
                email,
                password,
                userType,
            });

            setToastMsg(res.data.message);
            setToastSuccess(true);
            setShowToast(true);

            setTimeout(() => {
                window.location.href = "/login2";
            }, 3000);

        } catch (err) {
            setToastMsg(
                err.response?.data?.message || "Signup failed. Please try again."
            );
            setToastSuccess(false);
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    };

    return (
        <>
            {/* TOAST */}
            <Toast
                message={toastMsg}
                show={showToast}
                success={toastSuccess}
            />

            <div className="w-full md:w-1/2 h-[100vh] flex justify-center items-center p-4 md:p-0">
                <section className="w-full sm:w-[80%] md:w-[70%] lg:w-[30vw] h-[auto] sm:h-[65vh] md:h-[65vh] font-[Nunito] bg-white rounded-lg text-blue-950 flex flex-col gap-6 sm:gap-8 md:gap-12 justify-center items-center">
                    <div className="flex flex-col">
                        <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold">
                            sign up
                        </h2>
                        <span className="block w-12 sm:w-16 md:w-16 h-1 sm:h-2 bg-blue-950 mx-auto mt-3"></span>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-12 w-full px-2 sm:px-6 md:px-12 text-black">
                        <div className="w-full flex items-center bg-gray-100 rounded-md border-2 border-transparent focus-within:border-blue-500 transition-all duration-200 px-3">
                            <FaUser className="text-blue-800 text-lg mr-3" />
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-12 sm:h-14 md:h-16 bg-gray-100 outline-none border-none text-[16px] sm:text-[18px] md:text-[20px] font-semibold"
                            />
                        </div>

                        <div className="w-full flex items-center bg-gray-100 rounded-md border-2 border-transparent focus-within:border-blue-500 transition-all duration-200 px-3">
                            <FaEnvelope className="text-blue-800 text-lg mr-3" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 sm:h-14 md:h-16 bg-gray-100 outline-none border-none text-[16px] sm:text-[18px] md:text-[20px] font-semibold"
                            />
                        </div>

                        <div className="w-full flex items-center bg-gray-100 rounded-md border-2 border-transparent focus-within:border-blue-500 transition-all duration-200 px-3">
                            <FaLock className="text-blue-800 text-lg mr-3" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 sm:h-14 md:h-16 bg-gray-100 outline-none border-none text-[16px] sm:text-[18px] md:text-[20px] font-semibold"
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label className="font-semibold text-base sm:text-lg">
                                Account Type
                            </label>
                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                className="w-full h-12 sm:h-14 md:h-16 bg-gray-100 rounded-md px-3 text-[16px] sm:text-[18px] md:text-[18px]"
                            >
                                <option value="applicant">Applicant</option>
                                <option value="employer">Employer</option>
                            </select>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 font-bold w-full justify-between">
                            <button
                                onClick={handleSignup}
                                className="bg-blue-900 text-white px-8 py-3 sm:py-4 rounded-4xl w-full sm:w-1/2 cursor-pointer"
                            >
                                sign up
                            </button>

                            <button
                                onClick={() => window.location.href = "/login2"}
                                className="text-blue-900 bg-gray-200 px-8 py-3 sm:py-4 rounded-4xl w-full sm:w-1/2"
                            >
                                log in
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

/* ================= CONTAINER ================= */
const SignupContainer = () => {
    return (
        <section className="h-[100vh] bg-white rounded-lg flex flex-col md:flex-row">
            <LeftSidebar />
            <RightSidebar />
        </section>
    );
};

/* ================= PAGE ================= */
const Signup = () => {
    return (
        <main className="min-h-screen w-full bg-blue-950 font-[Nunito]">
            <Navbar2
                logoColor="#ffffff"
                navButtonColor="#1c398e"
                navIconColor="#ffffff"
                activeTextColor="#164256"
                activeIconBgColor="#1c398e"
                inactiveTextColor="#164256"
                inactiveIconTextColor="#1c398e"
            />
            <SignupContainer />
        </main>
    );
};

export default Signup;
