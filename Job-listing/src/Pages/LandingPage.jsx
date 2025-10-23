import React from 'react'
import {FaUser} from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className={"absolute w-full h-1/8 text-black p-12 tracking-wide"}>
            <div className={"flex justify-between items-center w-full h-full"}>
                <div className={"flex gap-4"}>
                    <img src="/logo.png"/>
                    <span className={"text-2xl font-bold"}>JobConnect</span>
                </div>

                <div className={"rounded-full shadow-lg hover:bg-white hover:text-black transition-all duration-600 border-2 p-4 cursor-pointer flex items-center gap-4"}>
                    <FaUser/>
                    <button className={""}>Login/SignUp</button>
                </div>

            </div>
        </nav>
    );
}

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

const Stats = () => {
    return (
        <section className="w-full bg-white py-20 flex flex-col items-center justify-center">
            <div className="w-[80%] flex flex-wrap justify-between items-center text-center gap-10">
                <div className="flex flex-col items-center">
                    <h2 className="text-7xl font-bold text-gray-900">500+</h2>
                    <p className="text-gray-500 text-lg mt-2">Jobs Provided</p>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-7xl font-bold text-gray-900">5,000+</h2>
                    <p className="text-gray-500 text-lg mt-2">Registered Companies</p>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-7xl font-bold text-gray-900">25,000+</h2>
                    <p className="text-gray-500 text-lg mt-2">Active Listings</p>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-7xl font-bold text-gray-900">100k+</h2>
                    <p className="text-gray-500 text-lg mt-2">Job Seekers Connected</p>
                </div>
            </div>
        </section>
    );
};

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
        <section className="min-h-[150vh] w-full bg-white flex flex-col items-center justify-center text-black gap-20">
            {/* Heading */}
            <div className="w-[70%] text-center">
                <h2 className="text-6xl md:text-8xl font-semibold leading-tight">
                    Our commitment to green energy is paving
                    a way for a cleaner, healthier planet
                </h2>
            </div>

            {/* Button */}
            <button className="px-20 py-6 text-2xl font-semibold text-white bg-indigo-900 rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-300">
                See our vision
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


const LandingPage = () => {
  return (
      <main className={""}>
          <Navbar/>
          <Hero/>
          <Stats/>
          <Services/>
          <ImageGallery/>
      </main>
  );
}

export default LandingPage;