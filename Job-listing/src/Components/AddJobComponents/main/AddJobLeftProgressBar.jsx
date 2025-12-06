import React, {useState, useEffect} from "react";
import MultiStepForm from "../../../../classes/MultiStepForm";
import StepItem from "../step/StepItem";

const AddJobLeftProgressBar = () => {
  const [state, setState] = useState(MultiStepForm.getState());

  useEffect(() => {
    const listener = (newState) => setState(newState);
    MultiStepForm.subscribe(listener);
    return () => MultiStepForm.unsubscribe(listener);
  }, []);

  const { steps, step: currentStep } = state;

  // Generate fresh steps with done/active/pending
  const displayedSteps = steps.map((s, i) => ({
    ...s,
    status: i < currentStep ? "done" : i === currentStep ? "active" : "pending",
  }));

  return (
    <div className="w-[30%] h-full flex flex-col gap-16 px-6 py-12">
      <h1 className="text-4xl font-bold">Progress</h1>
      <div className="flex flex-col gap-4">
        {displayedSteps.map((s, i) => (
          <StepItem key={i} step={s} isActive={i === currentStep} />
        ))}
      </div>
    </div>
  );
};

export default AddJobLeftProgressBar;