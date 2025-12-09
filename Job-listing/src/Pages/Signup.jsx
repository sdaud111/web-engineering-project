import { useState } from "react";
import Navbar2 from "../Components/Navbar2.jsx";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";

const LeftSidebar = () => {
    return (
        <div className={"w-1/2 h-[100vh] rounded-r-3xl bg-[url('src/assets/dots.jpg')]"} >
            <div className={"flex flex-col gap-12 h-[100vh] w-full bg-blue-900 opacity-90 rounded-r-3xl justify-center px-12"}>
                <h1 className={"text-white text-6xl font-extrabold w-[90%] leading-snug tracking-wide"}>
                    See more than <span className={""}>THOUSANDS</span> of jobs openings across various cities of Pakistan...
                </h1>
                <p className={"text-gray-300 text-2xl w-[60%] leading-snug tracking-wide"}>
                    Unlock all the features of JobConnect including
                    <span className={"font-bold text-white"}> AI-powered job search, CV parsing, </span>
                    and <span className={"font-bold text-white"}>various messaging features </span>
                    just to name a few. Create your own personalized profile and get started.
                </p>
            </div>
        </div>
    );
};

const RightSidebar = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   const [userType, setUserType] = useState("applicant");

    const handleSignup = async () => {
        try {
            console.log("Sending signup request:", { name, email, password, userType });
            const res = await axios.post("http://localhost:5000/api/auth/signup", {
                name,
                email,
                password, 
                userType
            });

            // Redirect to login page if signup successful
            if (res.data.message === "Signup success") {
                window.location.href = "http://localhost:3000/login2";
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={"w-1/2 h-[100vh] flex justify-center items-center"}>
            <section className={"w-[30vw] h-[65vh] font-[Nunito] bg-white rounded-lg text-blue-950 flex flex-col gap-24 justify-center items-center"}>
                <div className={"flex flex-col"}>
                    <h2 className={"relative text-5xl font-bold"}>sign up</h2>
                    <span className={"block w-16 h-2 bg-blue-950 mx-auto mt-3"}></span>
                </div>
                <div className={"flex flex-col justify-center items-center gap-12 w-full px-18 text-black"}>
                    <div className="w-full flex items-center bg-gray-100 rounded-md border-2 border-transparent focus-within:border-blue-500 transition-all duration-200 px-3">
                        <FaUser className="text-blue-800 text-lg mr-3" />
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-16 bg-gray-100 outline-none border-none text-[20px] font-semibold"
                        />
                    </div>
                    <div className="w-full flex items-center bg-gray-100 rounded-md border-2 border-transparent focus-within:border-blue-500 transition-all duration-200 px-3">
                        <FaEnvelope className="text-blue-800 text-lg mr-3" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-16 bg-gray-100 outline-none border-none text-[20px] font-semibold"
                        />
                    </div>
                    <div className="w-full flex items-center bg-gray-100 rounded-md border-2 border-transparent focus-within:border-blue-500 transition-all duration-200 px-3">
                        <FaLock className="text-blue-800 text-lg mr-3" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-16 bg-gray-100 outline-none border-none text-[20px] font-semibold"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-4">
  <label className="font-semibold text-lg">Account Type</label>
  <select
    value={userType}
    onChange={(e) => setUserType(e.target.value)}
    className="w-full h-16 bg-gray-100 rounded-md px-3 text-[18px]"
  >
    <option value="applicant">Applicant</option>
    <option value="employer">Employer</option>
  </select>
</div>
                    <p className={"font-semibold text-gray-600 text-lg"}>
                        Forgot password? <a className={"text-blue-950 font-bold cursor-pointer hover:underline"}>Click here</a>
                    </p>
                    <div className={"flex items-center gap-8 font-bold w-full justify-between"}>
                        <button
                            onClick={handleSignup}
                            className={"bg-blue-900 text-white px-8 py-4 rounded-4xl w-1/2 cursor-pointer"}
                        >
                            sign up
                        </button>
                        <button className={"text-blue-900 bg-gray-200 px-8 py-4 rounded-4xl w-1/2"}>sign up</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

const SignupContainer = () => {
    return (
        <section className={"h-[100vh] bg-white rounded-lg flex"}>
            <LeftSidebar />
            <RightSidebar />
        </section>
    );
};

const Signup = () => {
    return (
        <main className={"min-h-screen w-full bg-blue-950 font-[Nunito]"}>
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
