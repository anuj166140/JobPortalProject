import React, { useEffect, useState }
from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../services/api";

import {
  useNavigate,
  useParams
} from "react-router-dom";

function AdminEditJob(){

  const { id } = useParams();

  const navigate = useNavigate();

  const [job,setJob]=useState({
    title:"",
    company:"",
    location:"",
    salary:"",
    description:""
  });



  // LOAD JOB

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

  API.get(`/jobs/${id}`)
    .then(res=>{

      console.log("Loaded job:",res.data);

      setJob(res.data);

    })
    .catch(err=>{

      console.error(err);
      alert("Failed to load job details.");

    });

},[id, navigate]);



  // HANDLE INPUT (🔥 IMPORTANT FIX)

  const handleChange=(e)=>{

    const { name, value } = e.target;

    setJob(prev => ({

      ...prev,
      [name]:value

    }));

  };



  // UPDATE JOB

  const handleSubmit=(e)=>{

    e.preventDefault();

    API.put(`/jobs/${id}`, job)

    .then(()=>{

      alert("Job Updated Successfully");

      navigate("/admin/manage-jobs");

    })

    .catch(err=>{

      console.error(err);
      alert("Failed to update job: " + (err.response?.data?.message || err.message));

    });

  };



  return(

    <div>

      <Navbar/>

      <div style={{
        padding:"40px",
        maxWidth:"600px",
        margin:"auto"
      }}>

        <h2>Edit Job</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            value={job.title || ""}
            onChange={handleChange}
            placeholder="Job Title"
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <input
            type="text"
            name="company"
            value={job.company || ""}
            onChange={handleChange}
            placeholder="Company"
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <input
            type="text"
            name="location"
            value={job.location || ""}
            onChange={handleChange}
            placeholder="Location"
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <input
            type="text"
            name="salary"
            value={job.salary || ""}
            onChange={handleChange}
            placeholder="Salary"
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <textarea
            name="description"
            value={job.description || ""}
            onChange={handleChange}
            placeholder="Description"
            rows="5"
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <button
            type="submit"
            style={{
              padding:"12px",
              background:"#2563eb",
              color:"white",
              border:"none",
              cursor:"pointer"
            }}
          >

            Update Job

          </button>

        </form>

      </div>

      <Footer/>

    </div>

  );

}

export default AdminEditJob;