import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UserDashboard(){

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

      <div className="container-custom"
     style={{textAlign:"center"}}>

        <h1>User Dashboard</h1>

        <h3>
          Welcome {user?.name}
        </h3>

        <Link to="/jobs">

          <button style={{
            padding:"10px",
            margin:"10px"
          }}>

            Browse Jobs

          </button>

        </Link>

        <Link to="/applications">

          <button style={{
            padding:"10px",
            margin:"10px"
          }}>

            My Applications

          </button>

        </Link>

        <Link to="/bookmarks">

          <button style={{
            padding:"10px",
            margin:"10px",
            background:"#2563eb",
            color:"white",
            border:"none",
            borderRadius:"6px",
            cursor:"pointer",
            fontWeight:"600"
          }}>

            My Saved Jobs

          </button>

        </Link>

      </div>

      <Footer/>

    </div>

  );

}

export default UserDashboard;