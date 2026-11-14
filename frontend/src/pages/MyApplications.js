import React, { useEffect, useState, useCallback } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../services/api";

function MyApplications(){

  const [applications,setApplications]
  = useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // FETCH APPLICATIONS

  const fetchApplications = useCallback(()=>{

    if(!user) return;

    API.get("/applications/all")

    .then(res=>{

      const userApps =
        res.data.filter(app =>

          app.user &&
          app.user.id === user.id

        );

      setApplications(userApps);

    })

    .catch(err=>{

      console.error(err);

    });

  },[user]);

  // LOAD DATA

  useEffect(()=>{

    fetchApplications();

  },[fetchApplications]);

  return(

    <div>

      <Navbar/>

      <div style={{
        padding:"40px"
      }}>

        <h2>
          My Applications
        </h2>

        {applications.length===0 ? (

          <p>
            No Applications Yet
          </p>

        ):(

          <table className="table-modern">

            <thead>

              <tr>

                <th>Job</th>
                <th>Company</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {applications.map(app=>(

                <tr key={app.id}>

                  <td>
                    {app.jobTitle || app.job?.title}
                  </td>

                  <td>
                    {app.company || app.job?.company}
                  </td>

                  <td>

                    <span style={{
                      color:
                      app.status==="APPROVED"
                      ? "green"
                      : app.status==="REJECTED"
                      ? "red"
                      : "orange",
                      fontWeight:"bold"
                    }}>

                      {app.status}

                    </span>

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

export default MyApplications;