import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard(){

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(()=>{

    if(!user){

      navigate("/login");

    }

  },[user,navigate]);

  return(

    <div>

      <Navbar/>

      <div style={{
        padding:"40px",
        textAlign:"center"
      }}>

        <h1>Admin Dashboard</h1>
        <Link to="/admin/add-job">

  <button style={{
    padding:"12px",
    marginTop:"20px",
    marginRight:"10px"
  }}>

    Add Job

  </button>

</Link>
<Link to="/admin/manage-jobs">

  <button style={{
    padding:"12px",
    marginTop:"20px",
    marginRight:"10px"
  }}>

    Manage Jobs

  </button>

</Link>

        <Link to="/admin/applicants">

          <button style={{
            padding:"12px",
            marginTop:"20px"
          }}>

            View Applicants

          </button>

        </Link>

      </div>

      <Footer/>

    </div>

  );

}

export default AdminDashboard;