import React from "react";
import { useState } from "react";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("Under $50K");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  return (
    <>
      <section className="bg-[#A1E3F9] bg-opacity-30">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-gradient-to-br from-[#D1F8EF] to-[#A1E3F9] bg-opacity-95 px-6 py-8 mb-4 shadow-md rounded-md border-t-4 border-[#3674B5] m-4 md:m-0">
            <form>
              <h2 className="text-3xl text-center font-semibold mb-6 text-[#3674B5]">
                Add Job
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-[#578FCA] font-bold mb-2"
                >
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  required
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-[#578FCA] font-bold mb-2">
                  Job Listing Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border border-[#3674B5] rounded w-full py-2 px-3 mb-2 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  placeholder="eg. Software Engineer at Tech Company"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-[#578FCA] font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  rows="4"
                  placeholder="Add any job duties, expectations, requirements, etc"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-[#578FCA] font-bold mb-2"
                >
                  Salary
                </label>
                <select
                  id="salary"
                  name="salary"
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  required
                >
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - 60K">$50K - $60K</option>
                  <option value="$60K - 70K">$60K - $70K</option>
                  <option value="$70K - 80K">$70K - $80K</option>
                  <option value="$80K - 90K">$80K - $90K</option>
                  <option value="$90K - 100K">$90K - $100K</option>
                  <option value="$100K - 125K">$100K - $125K</option>
                  <option value="$125K - 150K">$125K - $150K</option>
                  <option value="$150K - 175K">$150K - $175K</option>
                  <option value="$175K - 200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-[#578FCA] font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border border-[#3674B5] rounded w-full py-2 px-3 mb-2 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  placeholder="Company Location"
                  required
                />
              </div>

              <h3 className="text-2xl mb-5 text-[#3674B5]">Company Info</h3>

              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-[#578FCA] font-bold mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  placeholder="Company Name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="company_description"
                  className="block text-[#578FCA] font-bold mb-2"
                >
                  Company Description
                </label>
                <textarea
                  id="company_description"
                  name="company_description"
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  rows="4"
                  placeholder="What does your company do?"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact_email"
                  className="block text-[#578FCA] font-bold mb-2"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  placeholder="Email address for applicants"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact_phone"
                  className="block text-[#578FCA] font-bold mb-2"
                >
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  className="border border-[#3674B5] rounded w-full py-2 px-3 text-[#3674B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A1E3F9]"
                  placeholder="Optional phone for applicants"
                />
              </div>

              <div>
                <button
                  className="bg-[#3674B5] hover:bg-[#578FCA] text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddJobPage;
