import React from 'react'
import { FaArrowLeft,FaMapMarker} from 'react-icons/fa';
import { useParams,useLoaderData, Link } from 'react-router-dom'


const JobPage = () => {
     const {id}=useParams();
     const job=useLoaderData()
  return (
  <>
   <section>
      <div className="container m-auto py-6 px-6">
        <Link
          to="/jobs"
          className="text-[#578FCA] hover:text-[#3674B5] flex items-center transition-colors duration-200"
        >
          <FaArrowLeft className='mr-2' />Back to Job Listings
        </Link>
      </div>
    </section>

    <section className="bg-[#D1F8EF] bg-opacity-50">
      <div className="container m-auto py-10 px-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <main className="md:col-span-2">
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center md:text-left border-l-4 border-[#3674B5]"
            >
              <div className="text-[#578FCA] mb-4 font-medium">{job.type}</div>
              <h1 className="text-3xl font-bold mb-4 text-[#3674B5]">
               {job.title}
              </h1>
              <div
                className="mb-4 flex align-middle justify-center md:justify-start"
              >
               <FaMapMarker className='mr-1 text-[#A1E3F9]'/>
                <p className="text-[#578FCA]">{job.location}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-[#3674B5] text-lg font-bold mb-6">
                Job Description
              </h3>

              <p className="mb-4">
              {job.description}
              </p>

              <h3 className="text-[#3674B5] text-lg font-bold mb-2">Salary</h3>

              <p className="mb-4">{job.salary} / Year</p>
            </div>
          </main>

          {/* <!-- Sidebar --> */}
          <aside className="md:col-span-1">
            {/* <!-- Company Info --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Company Info</h3>

              <h2 className="text-2xl">{job.company.name}</h2>

              <p className="my-2">
               {job.company.description}
              </p>

              <hr className="my-4" />

              <h3 className="text-xl">Contact Email:</h3>

              <p className="my-2 bg-[#D1F8EF] p-2 font-bold text-[#3674B5]">
                {job.company.contactEmail}
              </p>

              <h3 className="text-xl">Contact Phone:</h3>

              <p className="my-2 bg-[#D1F8EF] p-2 font-bold text-[#3674B5]">{job.company.contactPhone}</p>
            </div>

            {/* <!-- Manage --> */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-bold mb-6">Manage Job</h3>
              <Link
                to={`/jobs/edits/${job.id}`}
                className="bg-[#3674B5] hover:bg-[#578FCA] text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Job
                </Link>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Job
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </>
  )
}
const jobLoader=async({params})=>{
    const res= await fetch(`/api/jobs/${params.id}`);
    const data=await res.json();
    return data;
}

export {JobPage as default,jobLoader}