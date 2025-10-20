import React from 'react'
import { useState } from 'react'
import {FaMapMarker} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const JobList = ({job}) => {
    const [showFullDescription,setFullDescription]=useState(false)
    let description=job.description;
    if(!showFullDescription){
        description=description.substring(0,90)+'...';
    }
  return (
      <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-[#578FCA] my-2">{job.type}</div>
                <h3 className="text-xl font-bold text-[#3674B5]">{job.title}</h3>
              </div>

              <div className="mb-5">
              {description}
                </div>
              <button onClick={()=>setFullDescription((prevState=> !prevState))} className="text-[#3674B5] mb-5 hover:text-[#578FCA]">
                {showFullDescription?'Less':'More'}
              </button>
            

              <h3 className="text-[#3674B5] mb-2">{job.salary} / Year</h3>

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="text-[#578FCA] mb-3">
                 <FaMapMarker className='mb-1 mr-1 inline text-[#A1E3F9]'/>
                 {job.location}
                </div>
                <Link
                  to={`/jobs/${job.id}`}
                  className="h-[36px] bg-[#3674B5] hover:bg-[#578FCA] text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                 Read More
                </Link>
              </div>
            </div>
          </div>
  )
}

export default JobList
