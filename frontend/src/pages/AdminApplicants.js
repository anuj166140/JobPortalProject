import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../services/api";

function AdminApplicants(){

  const [applications,setApplications]
  = useState([]);

  useEffect(()=>{

    fetchApplications();

  },[]);

  // FETCH APPLICATIONS

  const fetchApplications=()=>{

    API.get("/applications/all")

    .then(res=>{

      setApplications(res.data);

    })

    .catch(err=>{

      console.error(err);

    });

  };

  // UPDATE STATUS (APPROVE / REJECT)

  const updateStatus = (id,status)=>{

    API.put(
      `/applications/${id}/status?status=${status}`
    )

    .then(()=>{

      alert("Status Updated");

      fetchApplications();

    })

    .catch(err=>{

      console.error(err);

    });

  };

  return(

    <div>

      <Navbar/>

      <div style={{
        padding:"40px"
      }}>

        <h2>
          All Applicants
        </h2>

        {applications.length===0 ? (

          <p>
            No Applicants Yet
          </p>

        ):(

          <table className="table-modern">

            <thead>

              <tr>

                <th>Name</th>
                <th>Email</th>
                <th>Job</th>
                <th>Company</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {applications.map(app=>(

                <tr key={app.id}>

                  <td>{app.applicantName}</td>
                  <td>{app.email}</td>
                  <td>{app.jobTitle}</td>
                  <td>{app.company}</td>

                  <td>

                    <span style={{
                      color:
                      app.status==="APPROVED"
                      ? "green"
                      : app.status==="REJECTED"
                      ? "red"
                      : "orange"
                    }}>

                      {app.status}

                    </span>

                  </td>

                  <td>

                    <button
                      onClick={()=>
                        updateStatus(
                          app.id,
                          "APPROVED"
                        )
                      }
                      style={{
                        background:"green",
                        color:"white",
                        marginRight:"5px",
                        border:"none",
                        padding:"6px"
                      }}
                    >

                      Approve

                    </button>

                    <button
                      onClick={()=>
                        updateStatus(
                          app.id,
                          "REJECTED"
                        )
                      }
                      style={{
                        background:"red",
                        color:"white",
                        border:"none",
                        padding:"6px"
                      }}
                    >

                      Reject

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

export default AdminApplicants;