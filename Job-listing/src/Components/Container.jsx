import {FaRegArrowAltCircleLeft} from "react-icons/fa";

export default function Container({ activePage }) {
  function handleLogOut() {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
    window.location.href = "/login2";
  }
  return (
    <section className="flex-1 ml-32 min-h-screen bg-gray-200 flex flex-col">
      <div className="h-24 w-full px-8 py-3 flex justify-between items-center">
        <h2 className="text-4xl font-semibold text-gray-700 leading-relaxed">
          {activePage}
        </h2>
        <button
          className="
                flex items-center justify-center gap-3
                bg-gradient-to-r from-blue-500 to-blue-600
                text-white font-semibold
                rounded-lg px-8 py-3
                shadow-md hover:shadow-lg
                transition-color duration-800
                hover:from-blue-600 hover:to-blue-700
                "
          onClick={() => handleLogOut()}
        >
          <FaRegArrowAltCircleLeft className="w-6 h-6" />
          <span className="text-2xl">Sign Out</span>
        </button>
      </div>
      <div className="flex-1 w-full">
        <AISearchPage />
      </div>
    </section>
  );
}