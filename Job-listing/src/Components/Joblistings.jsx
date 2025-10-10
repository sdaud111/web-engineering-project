import React from 'react'
import { useState,useEffect } from 'react'
import JobList from './JobList'
import Spinner from './Spinner';
const Joblistings = ({isHome=false}) => {
  const [jobs,setJob]=useState([])
  const [load,setLoad]=useState(true)
  useEffect(()=>{
      const fetchJob=async()=>{
        const apiUrl=isHome ? '/api/jobs?_limit=3':   '/api/jobs'
        try{
          const res=await fetch(apiUrl);
          const data=await res.json();
          setJob(data)
        }
        catch(error){
          console.log("error fething data",error)
        }
        finally{
          setLoad(false)
        }
      }
      fetchJob();

  },[])

  

  return (
   <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
         {isHome ?'Recent Jobs': 'All Jobs'}
        </h2>
       
        {load?
        <Spinner loading={load}/>
        :
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {jobs.map((job)=>(
             <JobList key={job.id} job={job} />
          )
          )
        }
        </div>
        }
        
         </div>
      
    </section>

  )
};

export default Joblistings
