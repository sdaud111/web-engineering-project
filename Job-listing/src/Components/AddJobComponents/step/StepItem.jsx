import { FaCaretRight } from "react-icons/fa";
import StepBullet from "../step/StepBullet";
import { colors } from "../nav/colors";

const StepItem = ({ step, isActive }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-5 items-center font-semibold"
           style={{ color: step.status === "done" ? colors.mainProgressStepDone : isActive ? colors.mainProgressStepActive: colors.mainProgressStepPending }}>
        {/* Bullet shows done/active/pending */}
        <StepBullet status={step.status} />
        <h2 className="text-2xl">{step.label}</h2>
      </div>
      {isActive && step.subItems && step.subItems.length > 0 && (
        <div className="ml-10 mt-4 mb-4 flex flex-col gap-1">
          {step.subItems.map((sub, i) => (
            <div key={i} className="flex items-center gap-4">
              <FaCaretRight className="text-[20px]" style={{color: colors.mainProgressStepSubItems}} />
              <p className="text-[24px] font-semibold" style={{color: colors.mainProgressStepSubItems}}>{sub}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepItem;