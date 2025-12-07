import { FaCircle, FaCheck } from "react-icons/fa";
import { colors } from "../nav/colors";

const StepBullet = ({ status }) => {
    const base = "w-10 h-10 flex items-center justify-center rounded-full border-4";

    if (status === "done") {
        return (
            <div className={`${base}`} 
            style={{color: colors.mainProgressSteps, borderStyle: "solid", borderWidth: "4px", borderColor: colors.mainProgressSteps}}>
                <FaCheck className="text-lg" style={{color: colors.mainProgressSteps}}/>
            </div>
        );
    }

    if (status === "active") {
        return (
            <div className={`${base}`} style={{backgroundColor: colors.mainProgressSteps, borderStyle: "solid", borderWidth: "4px", borderColor: colors.mainProgressSteps}}>
                <FaCircle className="text-lg" style={{color: colors.mainBgColor}} />
            </div>
        );
    }

    return (
        <div className={`${base}`} style={{color: colors.mainProgressSteps, borderStyle: "solid", borderWidth: "4px", borderColor: colors.mainProgressSteps}}>
            <FaCircle className="text-lg" style={{color: colors.mainProgressSteps}} />
        </div>
    );
};

export default StepBullet;
