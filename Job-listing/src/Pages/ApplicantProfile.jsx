import { FaGoogle, FaFacebookF, FaInstagram, FaRedditAlien, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import img from "../assets/image-gallery/sea.jpg";
import doodles from "../assets/doodle.jpg";

const ApplicantProfile = () => {
    const icons = [
    {
      icon: FaFacebookF,
      bg: "bg-[#1877F2]",
      color: "text-white",
    },
    {
      icon: FaInstagram,
      bg: "bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]",
      color: "text-white",
    },
    {
      icon: FaRedditAlien,
      bg: "bg-gradient-to-tr from-[#FF4500] to-[#FF5700]",
      color: "text-white",
    },
    {
      icon: FaTwitter,
      bg: "bg-[#1DA1F2]",
      color: "text-white",
    },
    {
      icon: FaLinkedinIn,
      bg: "bg-[#0A66C2]",
      color: "text-white",
    },
  ];
    const user = JSON.parse(localStorage.getItem("user"))["user"];
    return (
        <section className="relative w-full h-[180vh]">
            {/* <div className="circlePosition w-[700px] h-[590px] rounded-[100%] absolute z-1 top-0 left-0 blur-[150px] translate-x-[-30%] translate-y-[-30%]"
            style={{backgroundColor: colors.gradientStartColor}}>

            </div>
            <div className="circlePosition w-[700px] h-[590px] rounded-[100%] absolute z-1 bottom-0 right-0 blur-[150px] translate-x-[30%] translate-y-[30%]"
            style={{backgroundColor: colors.gradientEndColor}}>
            
            </div> */}
            <div className="z-50 w-full h-full grid grid-rows-22 grid-cols-12">
                <div className="col-start-1 col-end-13 row-start-1 row-end-10 bg-blue-400 rounded-b-3xl">

                </div>
                <div className="row-start-8 row-end-11 col-start-1 col-end-4 z-50 flex justify-center items-center">
                    <div className="h-full aspect-square border-8 border-black rounded-full overflow-hidden group">
                        <img 
                        src={img}
                        alt="Profile pic"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-150"
                        />
                    </div>
                </div>
                <h2 
                className="row-start-9 row-end-10 col-start-4 col-end-9 text-7xl font-bold 
                            bg-clip-text text-black
                            transition-transform duration-500 ease-in-out hover:scale-102
                            relative group"
                >
                <span className="group-hover:text-black bg-clip-text transition-all duration-1000">
                    {user.name}
                </span>
                </h2>
                <div className="row-start-10 row-end-11 col-start-4 col-end-8 flex gap-4 items-center justify-center text-2xl text-black font-semibold">
                    Student, NUST Software Engineering
                </div>
                <div className="col-start-9 col-end-13 row-start-9 row-end-10 flex gap-6 justify-center items-center">
                {icons.map(({ icon: Icon, bg, color }, index) => (
                    <div
                    key={index}
                    className={`${bg} ${color} w-12 h-12 flex justify-center items-center rounded-full text-2xl cursor-pointer transform transition-all opacity-80 duration-300 hover:-translate-y-2 hover:shadow-lg hover:opacity-100`}
                    >
                    <Icon />
                    </div>
                ))}
                <div className="bg-white w-12 h-12 flex justify-center items-center p-3 rounded-full  transform transition-all opacity-80 duration-300 hover:-translate-y-2 hover:shadow-lg hover:opacity-100">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="w-6 h-6" />
                </div>
                </div>
                <div className="row-start-12 row-end-20 col-start-1 col-end-9 px-8 py-4 flex justify-center items-center">
                <div className="relative w-full h-full rounded-3xl p-8 flex flex-col text-black bg-gray-50">
                <div
                    className="absolute inset-0 rounded-3xl bg-cover bg-center opacity-2"
                    style={{ backgroundImage: `url(${doodles})` }}
                ></div>

                <div className="relative z-10 flex flex-col h-full">
                    <h2 className="text-5xl font-extrabold mb-4 h-[30%] flex items-center">
                    About Me
                    </h2>
                    <p className="text-3xl leading-relaxed tracking-wide h-[70%] overflow-auto">
                    Hello! I'm Daud, a passionate developer and tech enthusiast. I love building modern web applications,
                    exploring new technologies, and constantly improving my skills. When I'm not coding, I enjoy
                    music, gaming, and exploring creative projects. I believe in lifelong learning and using
                    technology to make a positive impact.
                    </p>
                </div>
                </div>

                </div>

            </div>
        </section>
    );
}
export default ApplicantProfile;