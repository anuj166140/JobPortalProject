import React, { useEffect, useState } from "react";

import JobCard from "./JobCard";
import API from "../services/api";

function JobList(){

  const [jobs,setJobs]=useState([]);

  useEffect(()=>{

    fetchJobs();

  },[]);

  const fetchJobs=()=>{

    API.get("/jobs")

    .then(res=>{

      setJobs(res.data);

    })

    .catch(err=>{

      console.error(err);

    });

  };

  // APPLY JOB FUNCTION

  const applyJob = (jobId) => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    if(!user || !user.id){

      alert("Please login first");
      return;

    }

    const application = {

      user:{
        id:user.id
      },

      job:{
        id:jobId
      }

    };

    console.log("Applying job:", jobId);

    API.post(
      "/applications/apply",
      application
    )

    .then(()=>{

      alert("Application Submitted");

    })

    .catch(err=>{

      console.error(err);

    });

  };

  return(

    <div style={{
      padding:"30px"
    }}>

      <h2>Latest Jobs</h2>

      <div className="job-grid-container">

        {jobs.length===0 ? (

          <p>No Jobs Available</p>

        ):(

          jobs.slice(0,6).map(job=>(

            <JobCard
              key={job.id}
              job={job}
              applyJob={applyJob}
            />

          ))

        )}

      </div>

    </div>

  );

}

export default JobList;