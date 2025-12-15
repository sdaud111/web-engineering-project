import {
    FaHome,
    FaInfoCircle,
    FaProjectDiagram,
    FaBlog,
    FaCogs,
    FaEnvelope,
    FaPlus,
    FaMinus,
    FaTimes,
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
        <section className="bg-[url('/landing-page-gradient.png')] bg-cover bg-no-repeat min-h-screen w-full flex items-center justify-center">
            <div className="pt-32 md:pt-40 flex flex-col items-center justify-center gap-12 text-center">
                <div className="w-[90%] md:w-[70%] flex flex-col md:flex-row justify-evenly items-center gap-8">
                    <h2 className="text-[42px] sm:text-[60px] md:text-[100px] leading-tight font-bold text-black flex-1">
                        Connecting talent with opportunity
                    </h2>

                    <div className="hidden md:block w-[4px] bg-white/40 rounded-full shadow-[0_0_25px_#ffffff70] self-stretch"></div>

                    <h2 className="text-[42px] sm:text-[60px] md:text-[100px] tracking-wide leading-snug text-gray-200 font-bold flex-1">
                        With one Career at a time
                    </h2>
                </div>

                <button className="px-12 md:px-22 py-6 md:py-8 text-xl md:text-2xl font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-white hover:text-indigo-600 transition-all duration-600">
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
            <h2 className="text-6xl md:text-8xl font-extrabold text-indigo-600 drop-shadow-lg">
                {count}+
            </h2>
            <p className="text-base md:text-lg font-medium text-gray-700">{label}</p>
        </div>
    );
};


const Stats = () => {
    const slides = [
        {
            img: "src/assets/stats/city-1.jpg",
            icon: <FaUser className="text-4xl md:text-5xl text-indigo-500" />,
            title: "Jobs Provided",
            count: 1000,
        },
        {
            img: "src/assets/image-gallery/lahore.jpg",
            icon: <FaBuilding className="text-4xl md:text-5xl text-indigo-500" />,
            title: "Registered Companies",
            count: 500,
        },
        {
            img: "src/assets/image-gallery/sea.jpg",
            icon: <FaClipboardList className="text-4xl md:text-5xl text-indigo-500" />,
            title: "Active Listings",
            count: 25000,
        },
        {
            img: "src/assets/image-gallery/escalator.jpg",
            icon: <FaPeopleCarry className="text-4xl md:text-5xl text-indigo-500" />,
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
        <section className="relative min-h-screen w-full py-20 bg-white flex flex-col gap-12 items-center text-center">
            <SectionHeader number={"1"} title={"Stats & Facts"} />

            <h2 className="text-4xl sm:text-6xl md:text-8xl font-semibold text-black w-[90%] md:w-[72%] leading-tight">
                Finding jobs in Pakistan is tough, we’re here to change that.
            </h2>

            <div className="relative flex flex-col md:flex-row w-[95%] md:w-[80%] p-4 md:p-8 bg-white rounded-3xl border-6 border-indigo-400 shadow-xl overflow-hidden">
                <div
                    className={`flex flex-col md:flex-row gap-6 transition-opacity duration-1000 ${
                        fade ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="w-full md:w-[55%] h-[300px] md:h-full rounded-2xl overflow-hidden">
                        <img src={img} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full md:w-[45%] flex flex-col gap-8 justify-center bg-indigo-500 p-6 md:p-8 rounded-2xl text-white">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="bg-white p-4 rounded-full">{icon}</div>
                            <h3 className="text-3xl md:text-5xl font-bold">{title}</h3>
                        </div>

                        <div className="bg-white w-full rounded-2xl flex justify-center items-center py-10">
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
        <section className="min-h-screen w-full bg-white p-4">
            <div className="w-full bg-gradient-to-br to-blue-300 from-indigo-500 rounded-3xl">
                <div className="w-full bg-gradient-to-bl to-blue-400 from-indigo-700 rounded-3xl px-6 md:px-20 py-16 md:py-25">
                    <p className="text-xl md:text-2xl border-b border-white pb-4 text-white">
                        Solutions
                    </p>

                    <h2 className="text-4xl md:text-7xl text-white mt-6">
                        Key for the near Future
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
                        {[
                            ["Applications Aggregation", "checklist.gif"],
                            ["Smart Job Matching", "social-media.gif"],
                            ["Instant Job Alerts", "chat.gif"],
                            ["Verified Employers", "verified.gif"],
                        ].map(([title, img], i) => (
                            <div
                                key={i}
                                className="flex flex-col md:flex-row gap-6 px-6 md:px-8 py-10 md:py-20 rounded-2xl bg-white text-black shadow-lg hover:shadow-2xl transition-all"
                            >
                                <img
                                    src={`src/assets/${img}`}
                                    className="w-20 h-20 object-contain"
                                />
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-bold">{title}</h3>
                                    <p className="text-lg md:text-2xl mt-4">
                                        Powerful tools designed to make hiring faster and smarter.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
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
        <section className="min-h-screen w-full bg-white flex flex-col items-center gap-16 px-4">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-semibold text-center w-[90%]">
                Our commitment to empower talent is paving the way for a smarter future
            </h2>

            <div className="w-full overflow-x-auto flex gap-6 px-6">
                {images.map((src, i) => (
                    <div
                        key={i}
                        className="min-w-[260px] h-[360px] rounded-2xl shadow-xl bg-cover bg-center"
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
        <div className="w-full p-6 rounded-md border shadow transition-all">
            <div className="flex justify-between items-center">
                <h3 className="text-xl md:text-2xl">{question}</h3>
                <button onClick={() => setOpen(!open)}>
                    {open ? <FaMinus /> : <FaPlus />}
                </button>
            </div>
            {open && <p className="mt-4 text-gray-600">{answer}</p>}
        </div>
    );
};

const FAQ = () => {
    const questions = [
        {
            question: "What is JobConnect's purpose?",
            answer: "To connect employers and job seekers efficiently.",
        },
        {
            question: "Is JobConnect free?",
            answer: "Yes, for job seekers.",
        },
    ];

    return (
        <section className="w-full min-h-screen flex justify-center px-4">
            <div className="w-full md:w-[55vw] text-center">
                <h2 className="text-5xl md:text-8xl font-semibold mb-6">FAQ</h2>
                <div className="flex flex-col gap-6">
                    {questions.map((q, i) => (
                        <FAQItem key={i} {...q} />
                    ))}
                </div>
            </div>
        </section>
    );
};



const Footer = () => {
    return (
        <footer className="w-full bg-indigo-950 px-6 py-20 text-white">
            <div className="flex flex-col md:flex-row gap-16">
                <div className="bg-white text-indigo-900 px-10 py-4 rounded-full flex items-center gap-4">
                    <img src="/logo.png" width="30" />
                    <h2 className="text-xl font-bold">JobConnect</h2>
                </div>

                <div className="bg-white text-indigo-900 p-8 rounded-3xl w-full md:w-[25vw]">
                    <h3 className="text-2xl font-bold mb-4">
                        JobConnect updates
                    </h3>
                    <input
                        type="email"
                        placeholder="Your email"
                        className="w-full p-4 rounded-md"
                    />
                </div>
            </div>
        </footer>
    );
};


const SectionHeader = ({ number, title }) => {
    return (
        <div className="flex items-center gap-4 text-xl md:text-2xl">
            <div className="bg-indigo-900 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center">
                {number}
            </div>
            <div className="bg-gray-900 text-white px-4 py-2 rounded-full">
                {title}
            </div>
        </div>
    );
};


const LandingPage = () => {
    return (
        <main className="bg-white overflow-x-hidden font-[Nunito]">
            <Navbar2 />
            <Hero />
            <Stats />
            <Services />
            <ImageGallery />
            <FAQ />
            <Footer />
        </main>
    );
};

export default LandingPage;
