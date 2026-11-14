import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";

import API from "../services/api";

function Jobs(){

  const [jobs,setJobs]=useState([]);

  const [search,setSearch]=useState("");
  const [location,setLocation]=useState("");
  const [company,setCompany]=useState("");

  // FETCH JOBS

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

  // APPLY JOB FUNCTION (FIXED)

  const applyJob = (jobId) => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    if(!user || !user.id){

      alert("User not found. Please login again.");
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

    console.log("Sending:", application);

    API.post(
      "/applications/apply",
      application
    )

    .then(()=>{

      alert("Application Submitted");

    })

    .catch(err=>{

      console.error("Apply error:", err);

    });

  };

  // FILTER LOGIC

  const filteredJobs = jobs.filter(job =>

    job.title
      ?.toLowerCase()
      .includes(search.toLowerCase())

    && job.location
      ?.toLowerCase()
      .includes(location.toLowerCase())

    && job.company
      ?.toLowerCase()
      .includes(company.toLowerCase())

  );

  return(

    <div>

      <Navbar/>

      <div style={{padding:"30px"}}>

        <h2>Available Jobs</h2>

        {/* FILTER SECTION */}

        <div style={{
          display:"flex",
          gap:"10px",
          marginTop:"20px",
          flexWrap:"wrap"
        }}>

          <input
            type="text"
            placeholder="Search by Title"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={{
              padding:"10px",
              width:"200px"
            }}
          />

          <input
            type="text"
            placeholder="Filter by Location"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            style={{
              padding:"10px",
              width:"200px"
            }}
          />

          <input
            type="text"
            placeholder="Filter by Company"
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
            style={{
              padding:"10px",
              width:"200px"
            }}
          />

        </div>

        {/* JOB LIST */}

        <div className="job-grid-container">

          {filteredJobs.length===0 ? (

            <p>No Jobs Found</p>

          ):(

            filteredJobs.map(job=>(

              <JobCard
  key={job.id}
  job={job}
  applyJob={applyJob}
/>

            ))

          )}

        </div>

      </div>

      <Footer/>

    </div>

  );

}

export default Jobs;