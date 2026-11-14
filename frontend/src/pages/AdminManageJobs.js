import React, { useEffect, useState }
from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminManageJobs(){

  const navigate = useNavigate();

  const [jobs,setJobs]=useState([]);

  // Protect route

  useEffect(()=>{

  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    currentUser = null;
  }

  if(!currentUser || currentUser.role!=="ADMIN"){

    navigate("/login");
    return;

  }

  fetchJobs();

},[navigate]);


  const fetchJobs=()=>{

    API.get("/jobs")

    .then(res=>{

      setJobs(res.data);

    })

    .catch(err=>{

      console.error(err);

    });

  };



  

  // DELETE JOB
  

  const deleteJob=(id)=>{

    if(window.confirm(
      "Delete this job?"
    )){

      API.delete(`/jobs/${id}`)

      .then(()=>{

        alert("Job Deleted");

        fetchJobs();

      })

      .catch(err=>{

        console.error(err);

      });

    }

  };

  return(

    <div>

      <Navbar/>

      <div style={{
        padding:"40px"
      }}>

        <h2>Manage Jobs</h2>

        {jobs.length===0 ?(

          <p>No Jobs Available</p>

        ): (

          <table className="table-modern">

            <thead>

              <tr>

                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {jobs.map(job=>(

                <tr key={job.id}>

                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>

                  <td>

  {/* EDIT BUTTON */}

  <button
    onClick={()=>
      navigate(`/admin/edit-job/${job.id}`)
    }
    style={{
      padding:"6px",
      marginRight:"5px",
      background:"orange",
      color:"white",
      border:"none"
    }}
  >

    Edit

  </button>

  {/* DELETE BUTTON */}

  <button
    onClick={()=>
      deleteJob(job.id)
    }
    style={{
      padding:"6px",
      background:"red",
      color:"white",
      border:"none"
    }}
  >

    Delete

  </button>

</td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      <Footer/>

    </div>

  );

}

export default AdminManageJobs;