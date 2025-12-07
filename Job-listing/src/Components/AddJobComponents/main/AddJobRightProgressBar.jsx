import MultiStepForm from "../../../../classes/MultiStepForm";
import React, {useState, useEffect} from "react";
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaReddit} from "react-icons/fa";
import SelectInput from "../inputs/SelectInput";
import TextInput from "../inputs/TextInput";
import TextInputWithIcon from "../inputs/TextInputWithIcon";
import TextAreaInput from "../inputs/TextAreaInput";
import { useNavigate } from "react-router-dom";
import { colors } from "../nav/colors";


const AddJobRightProgressBar = () => {
  const [state, setState] = useState(MultiStepForm.getState());
  const navigate = useNavigate();
  
    const handleFinish = async (e) => {
      e.preventDefault();
      const data = MultiStepForm.data;
      try {
        const res = await fetch("http://localhost:5000/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          console.error("Failed to send data");
          return;
        }

        const result = await res.json();
        console.log("Response from server:", result);
        navigate("/submit-job");
      } catch (err) {
        console.error("Error sending data:", err);
      }
    };


  useEffect(() => {
    const listener = (newState) => setState(newState);
    MultiStepForm.subscribe(listener);

    return () => MultiStepForm.unsubscribe(listener);
  }, []);

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
        heading = "Continue...";
        break;
      default:
        heading = "";
    }
  }

  return (
    <div className="w-[60%] h-full flex items-center justify-center p-2">
      <div className="w-full h-full flex flex-col gap-8">
        <h2 className="text-4xl font-bold" style={{color: colors.mainMainHeadings}}>{heading}</h2>
        <div className="flex flex-col flex-1 p-4 rounded-md gap-6">
          <form className="flex flex-col flex-1">
            {(step === 0 && subStep === 0) && (
              <>
                <div className="flex flex-col gap-8">
                  <TextInput
                  id="job_name"
                  label="Name of this job"
                  placeholder="Enter name..."
                  value={MultiStepForm.data.job_name}
                  setValue={(v) => MultiStepForm.update("job_name", v)}
                />

                <SelectInput
                  id="work_arrangement"
                  label="Work Arrangement"
                  options={[
                    { label: "Remote", value: "remote" },
                    { label: "On Site", value: "on-site" },
                    { label: "Hybrid", value: "hybrid" },
                  ]}
                  value={state.data.job_work_arrangement}
                  onChange={(val) => MultiStepForm.update("job_work_arrangement", val)}
                />

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
                  <button
                  type="button"
                  className={`
                    text-[22px] text-white  font-semibold px-12 py-3 
                    rounded-md cursor-pointer w-[calc(75%+4rem)] font-semibold
                    bg-gradient-to-r from-blue-800 to-indigo-900 
                  `}
                  onClick={() => {
                    MultiStepForm.update("job_name", document.getElementById("job_name").value);
                    MultiStepForm.update("job_work_arrangement", document.getElementById("work_arrangement").value);
                    MultiStepForm.update("job_psoition", document.getElementById("job_position").value);
                    MultiStepForm.next();
                  }}
                >
                  Next
                </button>

                </div>
              </>
            )}
            {(step === 0 && subStep === 1) && (
              <>
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
                   <div className="flex gap-4 mt-4 justify-between text-lg w-[calc(75%+4rem)]">
                      <button
                      type="button"
                      className={`
                        text-black font-semibold px-12 py-3 rounded-md cursor-pointer text-[22px]
                        bg-gradient-to-r from-blue-300 to-indigo-300
                        border-4
                      `}
                      onClick={() => {
                        MultiStepForm.prev();
                      }}
                    >
                      Back
                    </button>
                    
                    <button
                      type="button"
                      className="text-white font-semibold px-12 py-3 rounded-md cursor-pointer text-[20px] bg-gradient-to-r from-blue-800 to-indigo-900"
                      style={{backgroundColor: colors.mainButtonNext}}
                      onClick={() => {
                        MultiStepForm.update("job_type", document.getElementById("job_type").value);
                        MultiStepForm.next();
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
            {(step === 0 && subStep === 2) && (
              <>
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
                  onChange={(v) => MultiStepForm.update("salary_currency", v)}
                />
                <TextInput
                  id="salary"
                  label="Salary"
                  placeholder="Enter Amount..."
                  value={MultiStepForm.data.salary}
                  setValue={(v) => MultiStepForm.update("salary", v)}
                />
                   <div className="flex gap-4 mt-4 justify-between text-lg w-[calc(75%+4rem)]">
                      <button
                      type="button"
                      className={`
                        text-black font-semibold px-12 py-3 rounded-md cursor-pointer text-[22px]
                        bg-gradient-to-r from-blue-300 to-indigo-300
                        border-4
                      `}
                      onClick={() => {
                        MultiStepForm.prev();
                      }}
                    >
                      Back
                    </button>
                    
                    <button
                      type="button"
                      className="text-white font-semibold px-12 py-3 rounded-md cursor-pointer text-[20px] bg-gradient-to-r from-blue-800 to-indigo-900"
                      style={{backgroundColor: colors.mainButtonNext}}
                      onClick={() => {
                        MultiStepForm.update("salary_currency", document.getElementById("currency").value);
                        MultiStepForm.update("salary", document.getElementById("salary").value);
                        MultiStepForm.next();
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
            {(step === 0 && subStep === 3) && (
              <>
                <div className="flex flex-col gap-8">
                  <TextInput
                  id="city"
                  label="City"
                  placeholder="City name..."
                  value={MultiStepForm.data.location_city}
                  setValue={(v) => MultiStepForm.update("location_city", v)}
                />
                <TextInput
                  id="sector_area"
                  label="Sector/Area"
                  placeholder="Sector/Area..."
                  value={MultiStepForm.data.location_sector_area}
                  setValue={(v) => MultiStepForm.update("location_sector_area", v)}
                />
                <TextInput
                  id="street"
                  label="Street Number"
                  placeholder="Street number..."
                  value={MultiStepForm.data.location_street}
                  setValue={(v) => MultiStepForm.update("location_street", v)}
                />
                <TextInput
                  id="postal_code"
                  label="Postal Code"
                  placeholder="Postal Code..."
                  value={MultiStepForm.data.location_postal}
                  setValue={(v) => MultiStepForm.update("location_postal", v)}
                />
                <TextInput
                  id="additional_information"
                  label="Additional Information"
                  placeholder="Any nearby landmarks/additional comments..."
                  value={MultiStepForm.data.location_additional}
                  setValue={(v) => MultiStepForm.update("location_additional", v)}
                />
                   <div className="flex gap-4 mt-4 justify-between text-lg w-[calc(75%+4rem)]">
                      <button
                      type="button"
                      className={`
                        text-black font-semibold px-12 py-3 rounded-md cursor-pointer text-[22px]
                        bg-gradient-to-r from-blue-300 to-indigo-300
                        border-4
                      `}
                      onClick={() => {
                        MultiStepForm.prev();
                      }}
                    >
                      Back
                    </button>
                    
                    <button
                      type="button"
                      className="text-white font-semibold px-12 py-3 rounded-md cursor-pointer text-[20px] bg-gradient-to-r from-blue-800 to-indigo-900"
                      style={{backgroundColor: colors.mainButtonNext}}
                      onClick={() => {
                        MultiStepForm.update("location_city", document.getElementById("city").value);
                        MultiStepForm.update("location_sector_area", document.getElementById("sector_area").value);
                        MultiStepForm.update("location_street", document.getElementById("street").value);
                        MultiStepForm.update("location_postal", document.getElementById("postal_code").value);
                        MultiStepForm.update("location_additional", document.getElementById("additional_information").value);
                        MultiStepForm.next();
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
            {step === 1 && (
              <div className="w-[calc(75%+4rem)]">
                <TextAreaInput
                  id="job_description"
                  label="Job Description"
                  placeholder="Enter job description..."
                  value={MultiStepForm.data.job_description}
                  setValue={(v) => MultiStepForm.update("job_description", v)}
                />
                  <div className="flex gap-4 mt-4 justify-between text-lg">
                    {step !== 0 && (
                      <button
                      type="button"
                      className={`
                        text-black font-semibold px-12 py-3 rounded-md cursor-pointer text-[22px]
                        bg-gradient-to-r from-blue-300 to-indigo-300
                        border-4
                      `}
                      onClick={() => {
                        MultiStepForm.prev();
                      }}
                    >
                      Back
                    </button>
                    )}

                    <button
                      type="button"
                      className="text-white  font-semibold px-12 py-3  rounded-md cursor-pointer text-[20px] bg-gradient-to-r from-blue-800 to-indigo-900"
                      style={{backgroundColor: colors.mainButtonNext}}
                      onClick={() => {
                        MultiStepForm.update("job_description", document.getElementById("job_description").value);
                        MultiStepForm.next();
                      }}
                    >
                      Next
                    </button>
                  </div>
              </div>
            )}
            {step === 2 && subStep === 0 && (
              <div className="flex flex-col gap-8">
                <TextInput
                  id="phone"
                  label="Phone Number"
                  placeholder="Company's Phone..."
                  value={MultiStepForm.data.contact_phone}
                  setValue={(v) => MultiStepForm.update("contact_phone", v)}
                />
                <TextInput
                  id="email"
                  label="Email Address"
                  placeholder="Email Address..."
                  value={MultiStepForm.data.contact_email}
                  setValue={(v) => MultiStepForm.update("contact_email", v)}
                />
                <TextInput
                  id="website"
                  label="Website"
                  placeholder="Website..."
                  value={MultiStepForm.data.contact_website}
                  setValue={(v) => MultiStepForm.update("contact_website", v)}
                />
                <div className="flex gap-4 mt-4 justify-between text-lg w-[calc(75%+4rem)]">
                 <button
                      type="button"
                      className={`
                        text-black font-semibold px-12 py-3 rounded-md cursor-pointer text-[22px]
                        bg-gradient-to-r from-blue-300 to-indigo-300
                        border-4
                      `}
                      onClick={() => {
                        MultiStepForm.prev();
                      }}
                    >
                      Back
                    </button>
                  <button
                    type="button"
                    className="text-white  font-semibold px-12 py-3  rounded-md cursor-pointer text-[20px] bg-gradient-to-r from-blue-800 to-indigo-900"
                    style={{backgroundColor: colors.mainButtonNext}}
                    onClick={() => {
                        MultiStepForm.update("contact_phone", document.getElementById("phone").value);
                        MultiStepForm.update("contact_email", document.getElementById("email").value);
                        MultiStepForm.update("contact_website", document.getElementById("website").value);
                        MultiStepForm.next();
                      }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && subStep === 1 && (
              <div className="flex flex-col gap-8">
                <TextInputWithIcon
                  id="twitter"
                  label="Twitter"
                  placeholder="Twitter handle"
                  Icon={FaTwitter}
                  iconColor="#1DA1F2"
                  value={MultiStepForm.data.contact_socials_twitter}
                  setValue={(v) => MultiStepForm.update("contact_socials_twitter", v)}
                />
                <TextInputWithIcon
                  id="instagram"
                  label="Instagram"
                  placeholder="Instagram Profile"
                  Icon={FaInstagram}
                  iconColor="#8223a5ff"
                  value={MultiStepForm.data.contact_socials_instragram}
                  setValue={(v) => MultiStepForm.update("contact_socials_instragram", v)}
                />
                <TextInputWithIcon
                  id="linkedIn"
                  label="LinkedIn"
                  placeholder="LinkedIn Profile"
                  Icon={FaLinkedin}
                  iconColor="#104566ff"
                  value={MultiStepForm.data.contact_socials_linkedin}
                  setValue={(v) => MultiStepForm.update("contact_socials_linkedin", v)}
                />
                <TextInputWithIcon
                  id="reddit"
                  label="Reddit"
                  placeholder="Any related subreddit?"
                  Icon={FaReddit}
                  iconColor="#d23636ff"
                  value={MultiStepForm.data.contact_socials_reddit}
                  setValue={(v) => MultiStepForm.update("contact_socials_reddit", v)}
                />
                <TextInputWithIcon
                  id="facebook"
                  label="Facebook"
                  placeholder="Any Facebook ID?"
                  Icon={FaFacebook}
                  iconColor="#103e5aff"
                  value={MultiStepForm.data.contact_socials_facebook}
                  setValue={(v) => MultiStepForm.update("contact_socials_facebook", v)}
                />
                <div className="flex gap-4 mt-4 justify-between text-lg w-[calc(75%+4rem)]">
                  <button
                      type="button"
                      className={`
                        text-black font-semibold px-12 py-3 rounded-md cursor-pointer text-[22px]
                        bg-gradient-to-r from-blue-300 to-indigo-300
                        border-4
                      `}
                      onClick={() => {
                        MultiStepForm.prev();
                      }}
                    >
                      Back
                    </button>
                  <button
                    type="button"
                    className=" font-semibold px-12 py-3 text-white rounded-md cursor-pointer text-[20px] bg-gradient-to-r from-blue-800 to-indigo-900"
                    style={{backgroundColor: colors.mainButtonNext}}
                    onClick={() => {
                        MultiStepForm.update("contact_socials_twitter", document.getElementById("twitter").value);
                        MultiStepForm.update("contact_socials_instagram", document.getElementById("instagram").value);
                        MultiStepForm.update("contact_socials_linkedin", document.getElementById("linkedIn").value);
                        MultiStepForm.update("contact_socials_reddit", document.getElementById("reddit").value);
                        MultiStepForm.update("contact_socials_facebook", document.getElementById("facebook").value);
                        MultiStepForm.next();
                      }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="w-[calc(75%+4rem)] flex flex-col gap-32 w-[calc(75%+4rem)]">
                <p className="text-gray-500 text-2xl">Anything you would like to review before moving on?</p>
                <div className="flex gap-4 mt-4 justify-between text-lg">
                  <button
                      type="button"
                      className={`
                        text-black font-semibold px-12 py-3 rounded-md cursor-pointer text-[22px]
                        bg-gradient-to-r from-blue-300 to-indigo-300
                        border-4
                      `}
                      onClick={() => {
                        MultiStepForm.prev();
                      }}
                    >
                      Go Back
                    </button>
                  <button
                    type="submit"
                    className=" font-semibold px-12 py-3 text-white rounded-md cursor-pointer text-[20px] bg-gradient-to-r from-blue-800 to-indigo-900"
                    style={{backgroundColor: colors.mainButtonNext}}
                    onClick={(e) => {
                      handleFinish(e);
                    }}
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