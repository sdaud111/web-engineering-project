import {
    FaHome,
    FaInfoCircle,
    FaProjectDiagram,
    FaBlog,
    FaCogs,
    FaEnvelope,
    FaPlus,
    FaMinus,
    FaTimes, FaUser,
    FaBuilding, FaClipboardList, FaPeopleCarry
} from "react-icons/fa"
import {FiMenu} from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup"
import Navbar2 from "../Components/Navbar2.jsx"

    {/*<div className={"rounded-full shadow-lg hover:bg-white hover:text-black transition-all duration-600 border-2 p-4 cursor-pointer flex items-center gap-4"}>*/}
    {/*    <FaUser/>*/}
    {/*    <button className={""}>Login/SignUp</button>*/}
    {/*</div>*/}

const Hero = () => {
    return (
        <section className="bg-[url('/landing-page-gradient.png')] bg-cover bg-no-repeat min-h-screen w-full flex items-center justify-center">
            <div className="pt-40 flex flex-col items-center justify-center gap-12 text-center">
                <div className="w-[70%] flex justify-evenly items-center">
                    <h2 className="text-[100px] leading-tight font-bold text-black flex-1">
                        Connecting talent with opportunity
                    </h2>
                    <div className="w-[4px] bg-white/40 rounded-full shadow-[0_0_25px_#ffffff70] self-stretch"></div>
                    <h2 className="text-[100px] tracking-wide leading-snug text-gray-200 font-bold flex-1">
                        With one Career at a time
                    </h2>
                </div>
                <button className="px-22 py-8 text-2xl font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-white hover:text-indigo-600 transition-all duration-600">
                    See our vision
                </button>
            </div>
        </section>
    );
};
const CountUpStats = ({ end, duration = 2000, label }) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) setStarted(true);
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);
            setCount(Math.floor(eased * end));

            if (elapsed < duration) requestAnimationFrame(step);
            else setCount(end);
        };

        requestAnimationFrame(step);
    }, [started, end, duration]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center">
            <h2 className="text-8xl font-extrabold text-indigo-600 drop-shadow-lg transition-all ease-in-out duration-500">
                {count}+
            </h2>
            <p className="text-lg font-medium text-gray-700">{label}</p>
        </div>
    );
};

const Stats = () => {
    const slides = [
        {
            img: "src/assets/stats/city-1.jpg",
            icon: <FaUser className="text-5xl text-indigo-500" />,
            title: "Jobs Provided",
            count: 1000,
        },
        {
            img: "src/assets/image-gallery/lahore.jpg",
            icon: <FaBuilding className="text-5xl text-indigo-500" />,
            title: "Registered Companies",
            count: 500,
        },
        {
            img: "src/assets/image-gallery/sea.jpg",
            icon: <FaClipboardList className="text-5xl text-indigo-500" />,
            title: "Active Listings",
            count: 25000,
        },
        {
            img: "src/assets/image-gallery/escalator.jpg",
            icon: <FaPeopleCarry className="text-5xl text-indigo-500" />,
            title: "Job Seekers Connected",
            count: 100000,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // fade out
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % slides.length);
                setFade(true); // fade in new slide
            }, 1000); // fade out duration
        }, 10000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const { img, icon, title, count } = slides[currentIndex];

    return (
        <section className="relative min-h-[100vh] w-full py-[15vh] bg-white flex flex-col gap-12 items-center justify-center text-center">
            <SectionHeader number={"1"} title={"Stats & Facts"}/>
            <h2 className="text-8xl font-semibold text-black w-[72%] leading-tight">
                Finding jobs in Pakistan is tough, we’re here to change that.
            </h2>

            <div className="relative flex justify-between w-[80%] h-[100vh] p-8 bg-white rounded-3xl border-6 border-indigo-400 shadow-xl overflow-hidden">
                <div
                    className={`absolute inset-0 flex justify-between items-center p-4 transition-opacity duration-1000 ease-in-out ${
                        fade ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="w-[55%] h-full rounded-2xl overflow-hidden">
                        <img
                            src={img}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="w-[44%] h-full flex flex-col gap-20 justify-center bg-indigo-500 p-8 rounded-2xl text-white">
                        <div className="flex w-full h-1/6 items-center justify-center gap-4">
                            <div className="bg-white p-4 rounded-full">{icon}</div>
                            <h3 className="text-6xl font-bold">{title}</h3>
                        </div>
                        <div className="bg-white w-full h-1/3 rounded-2xl flex justify-center items-center">
                            <CountUpStats end={count} duration={2500} label={title} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-6">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-500 ${
                            currentIndex === index
                                ? "bg-indigo-600 scale-110"
                                : "bg-gray-300"
                        }`}
                    ></div>
                ))}
            </div>
            <button className="mt-10 px-22 py-8 text-2xl font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-white hover:text-indigo-600 transition-all duration-600">
                Get Started
            </button>
        </section>
    );
}


const Services = () => {
    return (
        <section className={"min-h-screen w-full bg-white p-4 text-white font-semibold"}>
            <div className={"w-full h-[120vh] bg-gradient-to-br to-blue-300 from-indigo-500 rounded-3xl"}>
                <div className={"w-full h-full bg-gradient-to-bl to-blue-400 from-indigo-700 rounded-3xl px-20 py-25"}>
                    <div className={"flex flex-col gap-12 items-start justify-center"}>
                        <p className="text-2xl border-b border-white pb-4 w-full text-white">
                            Solutions
                        </p>
                        <h2 className={"text-7xl"}>Key for the near Future</h2>
                        <div className={"grid grid-cols-2 grid-rows-3 py-14 gap-x-10 gap-y-18"}>
                            <div className="flex items-center gap-8 px-8 py-20 rounded-2xl bg-white text-black shadow-lg hover:shadow-2xl hover:text-indigo-700 transition-all duration-300">
                                <img
                                    src="src/assets/checklist.gif"
                                    alt="Smart Job Matching"
                                    className="w-20 h-20 object-contain"
                                />
                                <div className="flex flex-col gap-8">
                                    <h3 className="text-5xl font-bold">Applications Aggregation</h3>
                                    <p className="text-2xl font-normal ">
                                        We provide an easy tabular interface to speed up the recruitment process
                                        for the employers
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 px-8 py-20 rounded-2xl bg-white text-black shadow-lg hover:shadow-2xl hover:text-indigo-700 transition-all duration-300">
                                <img
                                    src="src/assets/social-media.gif"
                                    alt="Smart Job Matching"
                                    className="w-20 h-20 object-contain"
                                />
                                <div className="flex flex-col gap-8">
                                    <h3 className="text-5xl font-bold">Smart Job Matching</h3>
                                    <p className="text-2xl font-normal">
                                        Our AI-powered system connects the right candidates to the
                                        right opportunities, saving time for both employers and job seekers.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 px-8 py-20 rounded-2xl bg-white text-black shadow-lg hover:shadow-2xl hover:text-indigo-700 transition-all duration-300">
                                <img
                                    src="src/assets/chat.gif"
                                    alt="Instant Job Alerts"
                                    className="w-20 h-20 object-contain"
                                />
                                <div className="flex flex-col gap-8">
                                    <h3 className="text-5xl font-bold">Instant Job Alerts</h3>
                                    <p className="text-2xl font-normal">
                                        Stay updated with instant notifications whenever new job
                                        openings match your skills and preferences.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 px-8 py-20 rounded-2xl bg-white text-black shadow-lg hover:shadow-2xl hover:text-indigo-700 transition-all duration-300">
                                <img
                                    src="src/assets/verified.gif"
                                    alt="Verified Employers"
                                    className="w-20 h-20 object-contain"
                                />
                                <div className="flex flex-col gap-8">
                                    <h3 className="text-5xl font-bold">Verified Employers</h3>
                                    <p className="text-2xl font-normal">
                                        We ensure every company on JobConnect is verified, giving you
                                        a safe and trustworthy platform to find your next career move.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const ImageGallery = () => {
    // You can replace these with your local imports (src/assets/image-gallery/...)
    const images = [
        "src/assets/image-gallery/escalator.jpg",
        "src/assets/image-gallery/faisal-mosque.jpg",
        "src/assets/image-gallery/sea.jpg",
        "src/assets/image-gallery/mosque.jpg",
        "src/assets/image-gallery/lahore.jpg",
        "src/assets/image-gallery/shirtpin.jpg",
    ];

    return (
        <section className="min-h-[140vh] w-full bg-white flex flex-col items-center justify-center text-black gap-20">
            {/* Heading */}
            <div className="w-[70%] text-center">
                <h2 className="text-6xl md:text-8xl font-semibold leading-tight">
                    Our commitment to empower talent is paving the way for a smarter, connected future
                </h2>
            </div>

            {/* Button */}
            <button className="px-20 py-6 text-2xl font-semibold text-white bg-indigo-900 rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-300">
                See More
            </button>

            {/* Scrollable Image Gallery */}
            <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex space-x-8 px-10 py-6">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="min-w-[250px] md:min-w-[300px] h-[400px] rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl bg-gray-100"
                            style={{
                                backgroundImage: `url(${src})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQ = () => {
    const questions = [
        {
            question: "What is JobConnect's purpose?",
            answer:
                "The purpose of JobConnect is to connect job seekers and employers efficiently by providing a user-friendly platform."
        },
        {
            question: "Is JobConnect free to use?",
            answer:
                "Yes, JobConnect is free for job seekers. Employers can post a limited number of jobs for free before upgrading."
        },
        {
            question: "How do I apply for a job?",
            answer:
                "You can search for jobs on the homepage and click 'Apply Now' to submit your resume directly through our website."
        },
        {
            question: "Can employers view candidate profiles?",
            answer:
                "Yes, registered employers can view candidate profiles and contact them directly through the platform."
        },
        {
            question: "Does JobConnect support remote jobs?",
            answer:
                "Absolutely! JobConnect allows both employers and job seekers to filter and post remote job opportunities."
        }
    ];

    return (
        <section className="w-full min-h-[120vh] flex gap-16 items-center justify-center text-black">
            <div className="flex flex-col gap-12 text-center w-[55vw]">
                <h2 className="text-8xl font-semibold">FAQ</h2>
                <p className="text-gray-700 text-2xl">
                    Here you will find the answers to the most frequently asked questions.
                </p>

                <div className="flex flex-col gap-8">
                    {questions.map((q, index) => (
                        <FAQItem key={index} question={q.question} answer={q.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}

const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="w-full px-8 py-8 rounded-md border border-gray-300 shadow shadow-gray-400 transition-all duration-500 overflow-hidden">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl">{question}</h3>
                <div
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer transition-transform duration-200"
                >
                    {open ? (
                        <FaMinus className="text-2xl text-indigo-700" />
                    ) : (
                        <FaPlus className="text-2xl text-indigo-700" />
                    )}
                </div>
            </div>

            <div
                className={`transition-all duration-500 overflow-hidden ${
                    open ? "max-h-[200px] mt-4 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <p className="text-gray-600 text-[21px] text-start ">{answer}</p>
            </div>
        </div>
    );
};


const Footer = () => {
    return (
        <footer className={"relative w-full min-h-[75vh] bg-indigo-950 px-8 py-20 text-white"}>
            <div className={"flex gap-24 justify-start items-start"}>
                <div className={"flex gap-4 items-center bg-white text-indigo-900 px-12 py-4 rounded-full"}>
                    <img src={"/logo.png"} width={"30"} height={"25"}/>
                    <h2 className={"text-2xl font-bold"}>JobConnect</h2>
                </div>
                <div className={"flex flex-col gap-8 px-12"}>
                    <h2 className={"text-3xl font-bold py-4"}>Platform</h2>
                    <div className={"flex flex-col gap-4 text-gray-400 text-2xl"}>
                        <p className={"hover:text-indigo-200 hover:underline transition-all duration-300"}>Solutions</p>
                        <p className={"hover:text-indigo-200 hover:underline transition-all duration-300"}>How it works?</p>
                        <p className={"hover:text-indigo-200 hover:underline transition-all duration-300"}>Pricing</p>
                    </div>
                </div>
                <div className={"flex flex-col gap-8 px-12"}>
                    <h2 className={"text-3xl font-bold py-4"}>Resources</h2>
                    <div className={"flex flex-col gap-4 text-gray-400 text-2xl"}>
                        <p className={"hover:text-indigo-200 hover:underline transition-all duration-300"}>Blog</p>
                        <p className={"hover:text-indigo-200 hover:underline transition-all duration-300"}>Help Center</p>
                        <p className={"hover:text-indigo-200 hover:underline transition-all duration-300"}>Support</p>
                    </div>
                </div>
                <div className={"flex flex-col gap-8 px-12"}>
                    <h2 className={"text-3xl font-bold py-4"}>Company</h2>
                    <div className={"flex flex-col gap-4 text-gray-400 text-2xl"}>
                        <p className={"hover:text-indigo-200 hover:underline transition-all duration-300"}>About</p>
                        <p className={"hover:text-indigo-200 hover:underline transition-all duration-300"}>Our Mission</p>
                        <p className={"hover:text-indigo-200 hover:underline transition-all duration-300"}>Careers</p>
                        <p className={"hover:text-indigo-200 hover:underline transition-all duration-300"}>Contact</p>
                    </div>
                </div>
                <div className={"flex flex-col gap-4 justify-center items-center p-12 bg-white text-indigo-900 w-[25vw] h-[45vh] rounded-3xl"}>
                    <h2 className={"text-3xl font-bold"}>Your Source for JobConnect updates</h2>
                    <p className={"text-gray-600 text-lg font-semibold"}>Stay in the loop with our JobConnect newsletter, where we deliver bite-sized insights into the newest
                    jobconnect updates and solutions</p>
                    <div className="w-full flex items-center bg-gray-100 rounded-md border-2 border-transparent focus-within:border-indigo-600 transition-all duration-200 px-3">
                        <FaEnvelope className="text-indigo-600 text-lg mr-3" />
                        <input
                            type="email"
                            placeholder="Your e-mail..."
                            className="w-full h-16 bg-gray-100 outline-none border-none text-[20px] font-semibold"
                        />
                    </div>

                    <button className={"bg-indigo-800 w-full px-12 py-4 text-white rounded-md text-lg"}>Get In Touch</button>
                </div>
            </div>
        </footer>
    );
}

const SectionHeader = ({ number, title }) => {
    return (
        <div className="flex items-center gap-4 font-[Nunito] text-2xl">
            <div className="bg-indigo-900 text-white font-bold w-15 h-15 rounded-full flex justify-center items-center">
                {number.toString().padStart(2, "0")}
            </div>
            <div className="w-12 h-[1px] bg-white"></div>
            <div className="bg-gray-900 text-white font-semibold px-6 py-2 rounded-full">
                {title}
            </div>
        </div>
    );
};



const LandingPage = () => {
  return (
      <main className={"bg-white overflow-x-hidden font-[Nunito]"}>
          <Navbar2/>
          <Hero/>
          <Stats/>
          <Services/>
          <ImageGallery/>
          <FAQ/>
          <Footer />
      </main>
  );
}

export default LandingPage;
