import {
    FaHome,
    FaInfoCircle,
    FaProjectDiagram,
    FaBlog,
    FaCogs,
    FaEnvelope,
    FaPlus,
    FaMinus,
    FaUser,
    FaBuilding,
    FaClipboardList,
    FaPeopleCarry
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import Navbar2 from "../Components/Navbar2.jsx";


const Hero = () => {
    return (
        <section className="bg-[url('/landing-page-gradient.png')] bg-cover bg-no-repeat min-h-screen w-full flex items-center justify-center px-4">
            <div className="pt-32 md:pt-28 sm:pt-24 flex flex-col items-center gap-10 text-center w-full">

                <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8">
                    <h2 className="text-[42px] sm:text-[56px] md:text-[64px] lg:text-[90px] font-bold text-black flex-1 leading-tight">
                        Connecting talent with opportunity
                    </h2>

                    <div className="hidden lg:block w-[4px] h-full bg-white/40 rounded-full shadow-[0_0_25px_#ffffff70]" />
                    <div className="lg:hidden w-[60%] h-[3px] bg-white/40 rounded-full" />

                    <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[90px] text-gray-200 font-bold flex-1 leading-tight">
                        With one Career at a time
                    </h2>
                </div>

                <button className="px-10 sm:px-14 py-5 sm:py-6 text-lg sm:text-xl font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-white hover:text-indigo-600 transition-all duration-300">
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
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-indigo-600 drop-shadow-lg">
                {count}+
            </h2>
            <p className="text-sm sm:text-base md:text-lg font-medium text-gray-700 text-center">
                {label}
            </p>
        </div>
    );
};



const Stats = () => {
    const slides = [
        {
            img: "src/assets/stats/city-1.jpg",
            icon: <FaUser className="text-3xl sm:text-4xl md:text-5xl text-indigo-500" />,
            title: "Jobs Provided",
            count: 1000,
        },
        {
            img: "src/assets/image-gallery/lahore.jpg",
            icon: <FaBuilding className="text-3xl sm:text-4xl md:text-5xl text-indigo-500" />,
            title: "Registered Companies",
            count: 500,
        },
        {
            img: "src/assets/image-gallery/sea.jpg",
            icon: <FaClipboardList className="text-3xl sm:text-4xl md:text-5xl text-indigo-500" />,
            title: "Active Listings",
            count: 25000,
        },
        {
            img: "src/assets/image-gallery/escalator.jpg",
            icon: <FaPeopleCarry className="text-3xl sm:text-4xl md:text-5xl text-indigo-500" />,
            title: "Job Seekers Connected",
            count: 100000,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % slides.length);
                setFade(true);
            }, 1000);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const { img, icon, title, count } = slides[currentIndex];

    return (
        <section className="relative min-h-screen w-full py-16 sm:py-20 bg-white flex flex-col gap-10 sm:gap-12 items-center text-center">
            <SectionHeader number={"1"} title={"Stats & Facts"} />

            <h2 className="text-3xl sm:text-5xl md:text-8xl font-semibold text-black w-[95%] md:w-[72%] leading-tight">
                Finding jobs in Pakistan is tough, we’re here to change that.
            </h2>

            <div className="relative flex flex-col md:flex-row w-[95%] md:w-[80%] p-4 sm:p-6 md:p-8 bg-white rounded-3xl border-6 border-indigo-400 shadow-xl overflow-hidden">
                <div
                    className={`flex flex-col md:flex-row gap-6 transition-opacity duration-1000 ${
                        fade ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="w-full md:w-[55%] h-[260px] sm:h-[320px] md:h-full rounded-2xl overflow-hidden">
                        <img src={img} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full md:w-[45%] flex flex-col gap-6 sm:gap-8 justify-center bg-indigo-500 p-5 sm:p-6 md:p-8 rounded-2xl text-white">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="bg-white p-3 sm:p-4 rounded-full">{icon}</div>
                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                                {title}
                            </h3>
                        </div>

                        <div className="bg-white w-full rounded-2xl flex justify-center items-center py-8 sm:py-10">
                            <CountUpStats end={count} duration={2500} label={title} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};



const Services = () => {
    return (
        <section className="w-full bg-white px-4 py-24">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-300 rounded-3xl p-8 sm:p-16">
                <h2 className="text-4xl sm:text-6xl font-bold text-white mb-12">
                    Key for the near Future
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        ["checklist.gif", "Applications Aggregation"],
                        ["social-media.gif", "Smart Job Matching"],
                        ["chat.gif", "Instant Job Alerts"],
                        ["verified.gif", "Verified Employers"],
                    ].map(([img, title], i) => (
                        <div key={i} className="flex gap-6 bg-white p-8 rounded-2xl shadow-lg">
                            <img src={`src/assets/${img}`} className="w-16 h-16" />
                            <div>
                                <h3 className="text-2xl font-bold">{title}</h3>
                                <p className="text-gray-600 mt-2">
                                    Empowering hiring with smart solutions.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};



const ImageGallery = () => {
    const images = [
        "src/assets/image-gallery/escalator.jpg",
        "src/assets/image-gallery/faisal-mosque.jpg",
        "src/assets/image-gallery/sea.jpg",
        "src/assets/image-gallery/mosque.jpg",
        "src/assets/image-gallery/lahore.jpg",
        "src/assets/image-gallery/shirtpin.jpg",
    ];

    return (
        <section className="w-full py-24 bg-white text-center px-4">
            <h2 className="text-3xl sm:text-5xl font-semibold mb-12 max-w-5xl mx-auto">
                Our commitment to empower talent is paving the way for a smarter future
            </h2>

            <div className="flex overflow-x-auto gap-6 pb-4">
                {images.map((src, i) => (
                    <div
                        key={i}
                        className="min-w-[240px] h-[320px] rounded-2xl bg-cover bg-center shadow-lg"
                        style={{ backgroundImage: `url(${src})` }}
                    />
                ))}
            </div>
        </section>
    );
};


const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border rounded-lg p-6">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
                <h3 className="text-lg font-semibold">{question}</h3>
                {open ? <FaMinus /> : <FaPlus />}
            </div>
            {open && <p className="mt-4 text-gray-600">{answer}</p>}
        </div>
    );
};

const FAQ = () => {
    const questions = [
        { question: "What is JobConnect?", answer: "A platform connecting talent with opportunity." },
        { question: "Is it free?", answer: "Yes for job seekers." },
        { question: "Remote jobs?", answer: "Yes, fully supported." },
    ];

    return (
        <section className="w-full py-24 px-4 bg-white flex justify-center">
            <div className="max-w-3xl w-full flex flex-col gap-8">
                <h2 className="text-4xl sm:text-6xl font-bold text-center">FAQ</h2>
                {questions.map((q, i) => (
                    <FAQItem key={i} {...q} />
                ))}
            </div>
        </section>
    );
};



const Footer = () => {
    return (
        <footer className="relative w-full bg-indigo-950 px-4 sm:px-6 md:px-8 py-20 text-white">
            <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 items-start">

                {/* Logo */}
                <div className="flex gap-4 items-center bg-white text-indigo-900 px-10 py-4 rounded-full self-center xl:self-start">
                    <img src={"/logo.png"} width={30} height={25} />
                    <h2 className="text-2xl font-bold">JobConnect</h2>
                </div>

                {/* Platform */}
                <div className="flex flex-col gap-6 px-4 sm:px-8 w-full sm:w-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold py-2">Platform</h2>
                    <div className="flex flex-col gap-3 text-gray-400 text-lg sm:text-xl">
                        <p className="hover:text-indigo-200 hover:underline transition-all">Solutions</p>
                        <p className="hover:text-indigo-200 hover:underline transition-all">How it works?</p>
                        <p className="hover:text-indigo-200 hover:underline transition-all">Pricing</p>
                    </div>
                </div>

                {/* Resources */}
                <div className="flex flex-col gap-6 px-4 sm:px-8 w-full sm:w-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold py-2">Resources</h2>
                    <div className="flex flex-col gap-3 text-gray-400 text-lg sm:text-xl">
                        <p className="hover:text-indigo-200 hover:underline transition-all">Blog</p>
                        <p className="hover:text-indigo-200 hover:underline transition-all">Help Center</p>
                        <p className="hover:text-indigo-200 hover:underline transition-all">Support</p>
                    </div>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-6 px-4 sm:px-8 w-full sm:w-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold py-2">Company</h2>
                    <div className="flex flex-col gap-3 text-gray-400 text-lg sm:text-xl">
                        <p className="hover:text-indigo-200 hover:underline transition-all">About</p>
                        <p className="hover:text-indigo-200 hover:underline transition-all">Our Mission</p>
                        <p className="hover:text-indigo-200 hover:underline transition-all">Careers</p>
                        <p className="hover:text-indigo-200 hover:underline transition-all">Contact</p>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="flex flex-col gap-4 justify-center items-center p-8 sm:p-12 bg-white text-indigo-900 
                                w-full xl:w-[25vw] min-h-[45vh] rounded-3xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center">
                        Your Source for JobConnect updates
                    </h2>

                    <p className="text-gray-600 text-base sm:text-lg font-semibold text-center">
                        Stay in the loop with our JobConnect newsletter, where we deliver bite-sized insights into the newest
                        jobconnect updates and solutions
                    </p>

                    <div className="w-full flex items-center bg-gray-100 rounded-md border-2 border-transparent 
                                    focus-within:border-indigo-600 transition-all px-3">
                        <FaEnvelope className="text-indigo-600 text-lg mr-3" />
                        <input
                            type="email"
                            placeholder="Your e-mail..."
                            className="w-full h-14 sm:h-16 bg-gray-100 outline-none border-none 
                                       text-base sm:text-lg font-semibold"
                        />
                    </div>

                    <button className="bg-indigo-800 w-full px-10 py-4 text-white rounded-md text-lg">
                        Get In Touch
                    </button>
                </div>

            </div>
        </footer>
    );
};


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
