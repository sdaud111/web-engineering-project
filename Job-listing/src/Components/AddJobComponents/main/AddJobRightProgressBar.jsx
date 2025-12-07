import MultiStepForm from "../../../../classes/MultiStepForm";
import React, { useState, useEffect } from "react";
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaReddit } from "react-icons/fa";
import SelectInput from "../inputs/SelectInput";
import TextInput from "../inputs/TextInput";
import TextInputWithIcon from "../inputs/TextInputWithIcon";
import TextAreaInput from "../inputs/TextAreaInput";
import { useNavigate } from "react-router-dom";
import { colors } from "../nav/colors";

const AddJobRightProgressBar = () => {
  const [state, setState] = useState(MultiStepForm.getState());
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const listener = (newState) => setState(newState);
    MultiStepForm.subscribe(listener);
    return () => MultiStepForm.unsubscribe(listener);
  }, []);

  const validateStep = () => {
    const newErrors = {};

    if (state.step === 0) {
      switch (state.subStep) {
        case 0:
          if (!MultiStepForm.data.job_name || MultiStepForm.data.job_name.trim().length < 3)
            newErrors.job_name = "Job name must be at least 3 characters.";
          if (!MultiStepForm.data.job_work_arrangement)
            newErrors.job_work_arrangement = "Please select a work arrangement.";
          if (!MultiStepForm.data.job_position)
            newErrors.job_position = "Please select a job position.";
          break;
        case 1:
          if (!MultiStepForm.data.job_type) newErrors.job_type = "Please select a job type.";
          break;
        case 2:
          if (!MultiStepForm.data.salary || isNaN(MultiStepForm.data.salary))
            newErrors.salary = "Salary must be a number.";
          if (!MultiStepForm.data.salary_currency) newErrors.salary_currency = "Please select a currency.";
          break;
        case 3:
          if (!MultiStepForm.data.location_city) newErrors.location_city = "City is required.";
          if (MultiStepForm.data.location_postal && isNaN(MultiStepForm.data.location_postal))
            newErrors.location_postal = "Postal code must be numeric.";
          break;
        default:
          break;
      }
    }

    if (state.step === 1) {
      if (!MultiStepForm.data.job_description || MultiStepForm.data.job_description.trim().length < 10)
        newErrors.job_description = "Job description must be at least 10 characters.";
    }

    if (state.step === 2) {
      if (state.subStep === 0) {
        if (!MultiStepForm.data.contact_email || !/^\S+@\S+\.\S+$/.test(MultiStepForm.data.contact_email))
          newErrors.contact_email = "Please enter a valid email.";
        if (MultiStepForm.data.contact_phone && !/^\d+$/.test(MultiStepForm.data.contact_phone))
          newErrors.contact_phone = "Phone must be numeric.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) MultiStepForm.next();
  };

  const handlePrev = () => MultiStepForm.prev();

  const handleFinish = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
        const res = await fetch("http://localhost:5000/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(MultiStepForm.data),
        });

        if (!res.ok) {
            console.error("Failed to send data");
            return;
        }

        const result = await res.json();
        console.log("Response from server:", result);
        navigate("/submit-job"); // navigate to success page
    } catch (err) {
        console.error("Error sending data:", err);
    }
};


  const { step, subStep, steps } = state;

  let heading = "";
  if (step === 0) {
    const activeSubStepLabel = steps[0].subItems[subStep];
    switch (activeSubStepLabel) {
      case "JobTitle":
        heading = "Let's start with the basics...";
        break;
      case "Job Type":
        heading = "Choose the Job Type...";
        break;
      case "Salary":
        heading = "What will you be offering for the job?";
        break;
      case "Location":
        heading = "Where is this job?";
        break;
      default:
        heading = "Let's start with the basics...";
    }
  } else {
    switch (step) {
      case 1:
        heading = "Tell us more about this job...";
        break;
      case 2:
        heading = "How will the applicants contact you?";
        break;
      case 3:
        heading = "Review & Submit";
        break;
      default:
        heading = "";
    }
  }

  return (
    <div className="w-[60%] h-full flex items-center justify-center p-2">
      <div className="w-full h-full flex flex-col gap-8">
        <h2 className="text-4xl font-bold" style={{ color: colors.mainMainHeadings }}>{heading}</h2>
        <div className="flex flex-col flex-1 p-4 rounded-md gap-6">
          <form className="flex flex-col flex-1">
            {/* Step 0: Basic Info */}
            {step === 0 && subStep === 0 && (
              <div className="flex flex-col gap-8">
                <TextInput
                  id="job_name"
                  label="Name of this job"
                  placeholder="Enter name..."
                  value={MultiStepForm.data.job_name}
                  setValue={(v) => MultiStepForm.update("job_name", v)}
                />
                {errors.job_name && <p className="text-red-500">{errors.job_name}</p>}

                <SelectInput
                  id="work_arrangement"
                  label="Work Arrangement"
                  options={[
                    { label: "Remote", value: "remote" },
                    { label: "On Site", value: "on-site" },
                    { label: "Hybrid", value: "hybrid" },
                  ]}
                  value={MultiStepForm.data.job_work_arrangement}
                  onChange={(v) => MultiStepForm.update("job_work_arrangement", v)}
                />
                {errors.job_work_arrangement && <p className="text-red-500">{errors.job_work_arrangement}</p>}

                <SelectInput
                  id="job_position"
                  label="Job Position"
                  options={[
                    { label: "Entry Level", value: "entry" },
                    { label: "Middle Level", value: "middle" },
                    { label: "Senior Level", value: "senior" },
                    { label: "Manager/Lead", value: "manager" },
                  ]}
                  value={MultiStepForm.data.job_position}
                  onChange={(v) => MultiStepForm.update("job_position", v)}
                />
                {errors.job_position && <p className="text-red-500">{errors.job_position}</p>}

                <div className="flex gap-4 mt-4 justify-between">
                  <button type="button" className="text-white font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-800 to-indigo-900" onClick={handleNext}>Next</button>
                </div>
              </div>
            )}

            {/* Step 0: Job Type */}
            {step === 0 && subStep === 1 && (
              <div className="flex flex-col gap-8">
                <SelectInput
                  id="job_type"
                  label="Job Type"
                  options={[
                    { label: "Full Time", value: "full" },
                    { label: "Part Time", value: "part" },
                    { label: "Internship", value: "intern" },
                    { label: "Contract", value: "contract" },
                  ]}
                  value={MultiStepForm.data.job_type}
                  onChange={(v) => MultiStepForm.update("job_type", v)}
                />
                {errors.job_type && <p className="text-red-500">{errors.job_type}</p>}

                <div className="flex gap-4 mt-4 justify-between">
                  <button type="button" className="text-black font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-300 to-indigo-300 border-4" onClick={handlePrev}>Back</button>
                  <button type="button" className="text-white font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-800 to-indigo-900" onClick={handleNext}>Next</button>
                </div>
              </div>
            )}
{step === 0 && subStep === 2 && (
  <div className="flex flex-col gap-8">
    <SelectInput
      id="currency"
      label="Currency"
      options={[
        { label: "Pakistani Rupees (PKR)", value: "pkr" },
        { label: "US Dollars (USD)", value: "usd" },
        { label: "Indian Rupees (INR)", value: "inr" },
        { label: "Unpaid", value: "unpaid" },
      ]}
      value={MultiStepForm.data.salary_currency}
      onChange={(v) => {
        MultiStepForm.update("salary_currency", v);

        if (v === "unpaid") {
          // Set salary to number 0 and disable editing
          MultiStepForm.update("salary", 0);
        } else if (MultiStepForm.data.salary === 0) {
          // Reset salary to empty string for paid currencies
          MultiStepForm.update("salary", "");
        }
      }}
    />
    {errors.salary_currency && <p className="text-red-500">{errors.salary_currency}</p>}

    <TextInput
      id="salary"
      label="Salary"
      placeholder="Enter Amount..."
      value={MultiStepForm.data.salary}
      setValue={(v) => MultiStepForm.update("salary", v)}
      disabled={MultiStepForm.data.salary_currency === "unpaid"} // disable if unpaid
      style={{
        backgroundColor: MultiStepForm.data.salary_currency === "unpaid" ? "#e5e7eb" : "white",
        cursor: MultiStepForm.data.salary_currency === "unpaid" ? "not-allowed" : "text"
      }}
    />
    {errors.salary && <p className="text-red-500">{errors.salary}</p>}

    <div className="flex gap-4 mt-4 justify-between">
      <button
        type="button"
        className="text-black font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-300 to-indigo-300 border-4"
        onClick={() => MultiStepForm.prev()}
      >
        Back
      </button>
      <button
        type="button"
        className="text-white font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-800 to-indigo-900"
        onClick={() => {
          // Ensure salary is numeric if not unpaid
          if (MultiStepForm.data.salary_currency !== "unpaid") {
            MultiStepForm.update("salary", Number(MultiStepForm.data.salary));
          }
          MultiStepForm.next();
        }}
      >
        Next
      </button>
    </div>
  </div>
)}


            {/* Step 0: Location */}
            {step === 0 && subStep === 3 && (
              <div className="flex flex-col gap-8">
                <TextInput id="city" label="City" placeholder="City name..." value={MultiStepForm.data.location_city} setValue={(v) => MultiStepForm.update("location_city", v)} />
                <TextInput id="sector_area" label="Sector/Area" placeholder="Sector/Area..." value={MultiStepForm.data.location_sector_area} setValue={(v) => MultiStepForm.update("location_sector_area", v)} />
                <TextInput id="street" label="Street Number" placeholder="Street number..." value={MultiStepForm.data.location_street} setValue={(v) => MultiStepForm.update("location_street", v)} />
                <TextInput id="postal_code" label="Postal Code" placeholder="Postal Code..." value={MultiStepForm.data.location_postal} setValue={(v) => MultiStepForm.update("location_postal", v)} />
                <TextInput id="additional_information" label="Additional Information" placeholder="Any nearby landmarks/additional comments..." value={MultiStepForm.data.location_additional} setValue={(v) => MultiStepForm.update("location_additional", v)} />
                {errors.location_city && <p className="text-red-500">{errors.location_city}</p>}
                {errors.location_postal && <p className="text-red-500">{errors.location_postal}</p>}

                <div className="flex gap-4 mt-4 justify-between">
                  <button type="button" className="text-black font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-300 to-indigo-300 border-4" onClick={handlePrev}>Back</button>
                  <button type="button" className="text-white font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-800 to-indigo-900" onClick={handleNext}>Next</button>
                </div>
              </div>
            )}

            {/* Step 1: Job Description */}
            {step === 1 && (
              <div className="flex flex-col gap-8">
                <TextAreaInput id="job_description" label="Job Description" placeholder="Enter job description..." value={MultiStepForm.data.job_description} setValue={(v) => MultiStepForm.update("job_description", v)} />
                {errors.job_description && <p className="text-red-500">{errors.job_description}</p>}

                <div className="flex gap-4 mt-4 justify-between">
                  <button type="button" className="text-black font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-300 to-indigo-300 border-4" onClick={handlePrev}>Back</button>
                  <button type="button" className="text-white font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-800 to-indigo-900" onClick={handleNext}>Next</button>
                </div>
              </div>
            )}

            {/* Step 2: Contact Info */}
            {step === 2 && subStep === 0 && (
              <div className="flex flex-col gap-8">
                <TextInput id="phone" label="Phone Number" placeholder="Company's Phone..." value={MultiStepForm.data.contact_phone} setValue={(v) => MultiStepForm.update("contact_phone", v)} />
                <TextInput id="email" label="Email Address" placeholder="Email Address..." value={MultiStepForm.data.contact_email} setValue={(v) => MultiStepForm.update("contact_email", v)} />
                <TextInput id="website" label="Website" placeholder="Website..." value={MultiStepForm.data.contact_website} setValue={(v) => MultiStepForm.update("contact_website", v)} />
                {errors.contact_email && <p className="text-red-500">{errors.contact_email}</p>}
                {errors.contact_phone && <p className="text-red-500">{errors.contact_phone}</p>}

                <div className="flex gap-4 mt-4 justify-between">
                  <button type="button" className="text-black font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-300 to-indigo-300 border-4" onClick={handlePrev}>Back</button>
                  <button type="button" className="text-white font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-800 to-indigo-900" onClick={handleNext}>Next</button>
                </div>
              </div>
            )}

            {/* Step 2: Social Media */}
            {step === 2 && subStep === 1 && (
              <div className="flex flex-col gap-8">
                <TextInputWithIcon id="twitter" label="Twitter" placeholder="Twitter handle" Icon={FaTwitter} iconColor="#1DA1F2" value={MultiStepForm.data.contact_socials_twitter} setValue={(v) => MultiStepForm.update("contact_socials_twitter", v)} />
                <TextInputWithIcon id="instagram" label="Instagram" placeholder="Instagram Profile" Icon={FaInstagram} iconColor="#8223a5ff" value={MultiStepForm.data.contact_socials_instagram} setValue={(v) => MultiStepForm.update("contact_socials_instagram", v)} />
                <TextInputWithIcon id="linkedin" label="LinkedIn" placeholder="LinkedIn Profile" Icon={FaLinkedin} iconColor="#104566ff" value={MultiStepForm.data.contact_socials_linkedin} setValue={(v) => MultiStepForm.update("contact_socials_linkedin", v)} />
                <TextInputWithIcon id="reddit" label="Reddit" placeholder="Any related subreddit?" Icon={FaReddit} iconColor="#d23636ff" value={MultiStepForm.data.contact_socials_reddit} setValue={(v) => MultiStepForm.update("contact_socials_reddit", v)} />
                <TextInputWithIcon id="facebook" label="Facebook" placeholder="Any Facebook ID?" Icon={FaFacebook} iconColor="#103e5aff" value={MultiStepForm.data.contact_socials_facebook} setValue={(v) => MultiStepForm.update("contact_socials_facebook", v)} />

                <div className="flex gap-4 mt-4 justify-between">
                  <button type="button" className="text-black font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-300 to-indigo-300 border-4" onClick={handlePrev}>Back</button>
                  <button type="button" className="text-white font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-800 to-indigo-900" onClick={handleNext}>Next</button>
                </div>
              </div>
            )}

          {/* Step 3: Review & Finish */}
{step === 3 && (
  <div className="flex flex-col gap-8">
    <p className="text-gray-500 text-2xl">Anything you would like to review before submitting?</p>
    <div className="flex gap-4 mt-4 justify-between">
      <button
        type="button"
        className="text-black font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-300 to-indigo-300 border-4"
        onClick={handlePrev}
      >
        Go Back
      </button>
      <button
        type="button"  // <-- change from submit to button
        className="text-white font-semibold px-12 py-3 rounded-md bg-gradient-to-r from-blue-800 to-indigo-900"
        onClick={handleFinish}
      >
        Finish
      </button>
    </div>
  </div>
)}


          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobRightProgressBar;
