import steps from "../data/AddJobFormSteps";
import AddJobFormData from "./AddJobFormData";

class MultiStepForm {
  static instance = null;

  static getInstance() {
    if (!MultiStepForm.instance) {
      MultiStepForm.instance = new MultiStepForm();
    }
    return MultiStepForm.instance;
  }

  constructor() {
    if (MultiStepForm.instance) return MultiStepForm.instance;

    // Step tracking
    this.currentStep = 0;
    this.currentSubStep = 0;
    this.data = new AddJobFormData();

    // Make a copy of steps and mark first step as active
    this.steps = steps.map((s, i) => ({
      ...s,
      status: i === 0 ? "active" : "pending",
    }));

    // Subscribers
    this.listeners = [];
  }

  subscribe(fn) {
    this.listeners.push(fn);
  }

  unsubscribe(fn) {
    this.listeners = this.listeners.filter((f) => f !== fn);
  }

  static goTo(stepIndex) {
    this.state.step = stepIndex;
    this.notify();
  }

  notify() {
    const state = {
      step: this.currentStep,
      subStep: this.currentSubStep,
      steps: this.steps.map((s) => ({ ...s })),
      data: {...this.data}
    };
    this.listeners.forEach((fn) => fn(state));
  }

  update(field, value) {
    this.data[field] = value;
    this.notify();
  }

  next() {
    const stepObj = this.steps[this.currentStep];

    if (stepObj.subItems && this.currentSubStep < stepObj.subItems.length - 1) {
      this.currentSubStep += 1;
      this.notify();
      return;
    }

    stepObj.status = "done";

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep += 1;
      this.steps[this.currentStep].status = "active";
      this.currentSubStep = 0;
    }

    this.notify();
  }

  prev() {
    const stepObj = this.steps[this.currentStep];

    if (stepObj.subItems && this.currentSubStep > 0) {
      this.currentSubStep -= 1;
      this.notify();
      return;
    }

    if (this.currentStep > 0) {
      stepObj.status = "pending";

      this.currentStep -= 1;
      const prevStep = this.steps[this.currentStep];
      prevStep.status = "active";
      this.currentSubStep = prevStep.subItems ? prevStep.subItems.length - 1 : 0;

      this.notify();
    }
  }

  getState() {
    return {
      step: this.currentStep,
      subStep: this.currentSubStep,
      steps: this.steps.map((s) => ({ ...s })),
      data: {...this.data}
    };
  }
}

export default MultiStepForm.getInstance();
