import React, { useState } from "react";
import Navbar2 from "../Components/Navbar2.jsx";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

const LeftSidebar = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/login", {
                email,
                password,
                });
            const data = await res.data;
            if(data.err) {
                console.log(data.err);
            }
            else{
                localStorage.setItem("isAuth", true);
                localStorage.setItem("user", JSON.stringify(data));
                window.location.href="/protected";
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className={"w-1/2 h-[100vh] flex justify-center items-center"}>
            <section className="w-[30vw] h-[60vh] font-[Nunito] bg-white rounded-lg text-indigo-900 flex flex-col gap-32 justify-center items-center">
                <div className="flex flex-col">
                    <h2 className="relative text-5xl font-bold">login</h2>
                    <span className="block w-16 h-2 bg-indigo-900 mx-auto mt-3"></span>
                </div>
                <div className="flex flex-col justify-center items-center gap-12 w-full px-18 text-black">
                    <div className="w-full flex items-center bg-gray-100 rounded-md border-2 border-transparent focus-within:border-indigo-600 transition-all duration-200 px-3">
                        <FaEnvelope className="text-indigo-600 text-lg mr-3" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-16 bg-gray-100 outline-none border-none text-[20px] font-semibold"
                        />
                    </div>
                    <div className="w-full flex items-center bg-gray-100 rounded-md border-2 border-transparent focus-within:border-indigo-600 transition-all duration-200 px-3">
                        <FaLock className="text-indigo-600 text-lg mr-3" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-16 bg-gray-100 outline-none border-none text-[20px] font-semibold"
                        />
                    </div>
                    <p className="font-semibold text-gray-600 text-lg">
                        Forgot password?{" "}
                        <a className="text-indigo-700 font-bold cursor-pointer hover:underline">
                            Click here
                        </a>
                    </p>
                    <div className="flex items-center gap-8 font-bold w-full justify-between">
                        <button
                            onClick={handleLogin}
                            className="cursor-pointer bg-indigo-700 text-white px-8 py-4 rounded-4xl w-1/2"
                        >
                            login
                        </button>
                        <button className="text-indigo-700 bg-gray-200 px-8 py-4 rounded-4xl w-1/2">
                            sign up
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

const RightSidebar = () => {
    return (
        <div className={"w-1/2 h-[100vh] rounded-r-3xl bg-[url('src/assets/dots.jpg')] text-right"}>
            <div className={"flex flex-col gap-12 h-[100vh] w-full bg-indigo-900 opacity-90 rounded-l-3xl justify-center items-end px-12"}>
                <h1 className={"text-white text-6xl font-extrabold w-[90%] leading-snug tracking-wide"}>
                    Welcome back to JobConnect! It's been a while...
                </h1>
                <p className={"text-gray-300 text-2xl w-[60%] leading-snug tracking-wide"}>
                    Log back in to see what you have missed
                </p>
            </div>
        </div>
    );
};

const LoginContainer = () => {
    return (
        <section className={"h-full w-full flex bg-white"}>
            <LeftSidebar />
            <RightSidebar />
        </section>
    );
};

const Login2 = () => {
    return (
        <main className={"min-h-screen w-full font-[Nunito]"}>
            <Navbar2 />
            <LoginContainer />
        </main>
    );
};

export default Login2;
