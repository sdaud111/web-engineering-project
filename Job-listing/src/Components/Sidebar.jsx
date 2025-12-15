import { Link } from "react-router-dom";
import { FaHome, FaRegUserCircle, FaRegComment, FaRegClipboard, FaSlack, FaSearchPlus } from "react-icons/fa";

const sidebarItems = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Profile", path: "/applicant-profile", icon: <FaRegUserCircle /> },
  { name: "Messages", path: "/messages", icon: <FaRegComment /> },
  { name: "Jobs", path: "/jobs", icon: <FaRegClipboard /> },
  { name: "My Applications", path: "/my-applications", icon: <FaSlack /> },
  { name: "AI Search", path: "/ai-search", icon: <FaSearchPlus /> },
];

export default function Sidebar({ currentPath }) {
  return (
    <aside className="w-32 h-screen bg-white fixed top-0 left-0 shadow z-10">
      <div className="flex flex-col items-center justify-center h-full gap-6 text-2xl text-gray-600">
        {sidebarItems.map(item => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`p-6 rounded-lg cursor-pointer transition-all ${
                isActive
                  ? "bg-blue-100 text-blue-800 backdrop-blur-2xl"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
