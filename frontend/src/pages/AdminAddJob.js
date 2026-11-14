import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminAddJob(){

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Protect route

  useEffect(()=>{

    if(!user || user.role !== "ADMIN"){

      navigate("/login");

    }

  },[user,navigate]);

  const [title,setTitle]=useState("");
  const [company,setCompany]=useState("");
  const [location,setLocation]=useState("");
  const [salary,setSalary]=useState("");
  const [description,setDescription]=useState("");

  const handleSubmit=(e)=>{

    e.preventDefault();

    const jobData={

      title,
      company,
      location,
      salary,
      description

    };

    API.post("/jobs", jobData)

    .then(res=>{

      alert("Job Added Successfully");

      navigate("/jobs");

    })

    .catch(err=>{

      console.error(err);

      alert("Failed to Add Job");

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

        <h2>Add New Job</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e)=>setSalary(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
            rows="5"
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
              border:"none"
            }}
          >

            Add Job

          </button>

        </form>

      </div>

      <Footer/>

    </div>

  );

}

export default AdminAddJob;