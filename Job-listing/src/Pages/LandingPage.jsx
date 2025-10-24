import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="absolute w-full text-black p-6 sm:p-8 md:p-12 tracking-wide">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3 sm:gap-4">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
          <span className="text-xl sm:text-2xl font-bold">JobConnect</span>
        </div>

        <div className="rounded-full shadow-lg hover:bg-white hover:text-black transition-all duration-300 border-2 p-2 sm:p-3 md:p-4 cursor-pointer flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
          <FaUser />
          <Link to="/login">Login / Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="bg-[url('/landing-page-gradient.png')] bg-cover bg-no-repeat min-h-screen w-full flex items-center justify-center">
      <div className="pt-32 sm:pt-40 flex flex-col items-center justify-center gap-10 text-center px-4">
        <div className="flex flex-col lg:flex-row justify-evenly items-center w-full lg:w-[80%] gap-8">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[100px] leading-tight font-bold text-black flex-1">
            Connecting talent with opportunity
          </h2>
          <div className="hidden lg:block w-[4px] bg-white/40 rounded-full shadow-[0_0_25px_#ffffff70] self-stretch"></div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[100px] tracking-wide leading-snug text-gray-200 font-bold flex-1">
            With one Career at a time
          </h2>
        </div>
        <button className="px-10 sm:px-14 md:px-20 py-3 sm:py-5 text-lg sm:text-xl md:text-2xl font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-white hover:text-indigo-600 transition-all duration-300">
          See our vision
        </button>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center">
      <div className="w-[90%] md:w-[80%] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {[
          { number: "500+", label: "Jobs Provided" },
          { number: "5,000+", label: "Registered Companies" },
          { number: "25,000+", label: "Active Listings" },
          { number: "100k+", label: "Job Seekers Connected" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">
              {stat.number}
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Applications Aggregation",
      desc: "We provide an easy tabular interface to speed up the recruitment process for the employers",
      img: "src/assets/checklist.gif",
    },
    {
      title: "Smart Job Matching",
      desc: "Our AI-powered system connects the right candidates to the right opportunities, saving time for both employers and job seekers.",
      img: "src/assets/social-media.gif",
    },
    {
      title: "Instant Job Alerts",
      desc: "Stay updated with instant notifications whenever new job openings match your skills and preferences.",
      img: "src/assets/chat.gif",
    },
    {
      title: "Verified Employers",
      desc: "We ensure every company on JobConnect is verified, giving you a safe and trustworthy platform to find your next career move.",
      img: "src/assets/verified.gif",
    },
  ];

  return (
    <section className="min-h-screen w-full bg-white text-white font-semibold p-4 sm:p-8">
      <div className="w-full bg-gradient-to-br to-blue-300 from-indigo-500 rounded-3xl overflow-hidden">
        <div className="w-full bg-gradient-to-bl to-blue-400 from-indigo-700 rounded-3xl px-6 sm:px-10 md:px-16 lg:px-20 py-10 sm:py-16 md:py-24">
          <div className="flex flex-col gap-8 sm:gap-12">
            <p className="text-lg sm:text-2xl border-b border-white pb-2 sm:pb-4 w-full text-white">
              Solutions
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Key for the near Future
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-12 py-10 sm:py-14">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 px-6 sm:px-8 py-10 sm:py-14 rounded-2xl bg-white text-black shadow-lg hover:shadow-2xl hover:text-indigo-700 transition-all duration-300"
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                  <div className="flex flex-col gap-4 sm:gap-6 text-center sm:text-left">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                      {s.title}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl font-normal">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
    <section className="min-h-[100vh] sm:min-h-[120vh] w-full bg-white flex flex-col items-center justify-center text-black gap-12 sm:gap-16 md:gap-20 px-4">
      <div className="w-full sm:w-[85%] text-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
          Our commitment to green energy is paving a way for a cleaner,
          healthier planet
        </h2>
      </div>

      <button className="px-10 sm:px-14 md:px-20 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white bg-indigo-900 rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-300">
        See our vision
      </button>

      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex space-x-6 sm:space-x-8 px-6 sm:px-10 py-4 sm:py-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="min-w-[180px] sm:min-w-[250px] md:min-w-[300px] h-[250px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl bg-gray-100"
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
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <ImageGallery />
    </main>
  );
};

export default LandingPage;
