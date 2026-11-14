import React from "react";
import { Link } from "react-router-dom";

function Navbar(){

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const logout=()=>{

    localStorage.removeItem("user");
    window.location.href="/login";

  };

  return(

    <nav style={{
      background:"#2563eb",
      padding:"15px 35px",
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      color:"white"
    }}>

      <h3 style={{margin:0,fontSize:"22px",   
  fontWeight:"700"}}>
        Naukri Point
      </h3>

      <div>

        <Link to="/" style={linkStyle}>
          Home
        </Link>

        <Link to="/jobs" style={linkStyle}>
          Jobs
        </Link>

        {user?.role==="USER" && (
          <>
            <Link to="/applications" style={linkStyle}>
              My Applications
            </Link>
            <Link to="/bookmarks" style={linkStyle}>
              Saved Jobs
            </Link>
          </>
        )}

        {user?.role==="ADMIN" && (

          <>
            <Link to="/admin/add-job" style={linkStyle}>
              Add Job
            </Link>

            <Link to="/admin/manage-jobs" style={linkStyle}>
              Manage Jobs
            </Link>

            <Link to="/admin/applicants" style={linkStyle}>
              Applicants
            </Link>
          </>

        )}

        {user ? (

          <button
            onClick={logout}
            style={logoutBtn}
          >
            Logout
          </button>

        ):(
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        )}

      </div>

    </nav>

  );

}

const linkStyle={
  color:"white",
  marginRight:"15px",
  textDecoration:"none",
  fontWeight:"500",
  fontSize:"18px"  
};

const logoutBtn={
  background:"red",
  color:"white",
  border:"none",
  padding:"6px 12px",
  borderRadius:"6px"
};

export default Navbar;