import { FaCaretRight } from "react-icons/fa";
import StepBullet from "../step/StepBullet";

const StepItem = ({ step, isActive }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center font-semibold"
           style={{ color: step.status === "done" ? "#3b82f6" : isActive ? "#3b82f6" : "#000" }}>
        {/* Bullet shows done/active/pending */}
        <StepBullet status={step.status} />
        <h2 className="text-2xl">{step.label}</h2>
      </div>

      {/* Only show subItems for the active step */}
      {isActive && step.subItems && step.subItems.length > 0 && (
        <div className="ml-8 mt-2 flex flex-col gap-1">
          {step.subItems.map((sub, i) => (
            <div key={i} className="flex items-center gap-2">
              <FaCaretRight className="text-[18px] text-gray-500" />
              <p className="text-gray-700 text-[22px] font-semibold">{sub}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepItem;