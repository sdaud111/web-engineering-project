import {FaCircle, FaCheck} from "react-icons/fa";

const StepBullet = ({ status }) => {
    const base = "w-10 h-10 flex items-center justify-center rounded-full border-4";
    if (status === "done") {
        return (
            <div className={`${base} border-blue-400 text-blue-400`}>
                <FaCheck className="text-lg" />
            </div>
        );
    }
    if (status === "active") {
        return (
            <div className={`${base} border-blue-400 bg-blue-400`}>
                <FaCircle className="text-white text-lg" />
            </div>
        );
    }
    return (
        <div className={`${base} border-gray-300 text-gray-300`}>
            <FaCircle className="text-gray-300 text-lg" />
        </div>
    );
};

export default StepBullet;