import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../services/api";

function Register(){

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("USER");

  const handleRegister=(e)=>{

    e.preventDefault();

    const userData={

      name,
      email,
      password,
      role

    };

    API.post("/auth/register", userData)

    .then(res=>{

      alert("Registration Successful");

      window.location.href="/login";

    })

    .catch(err=>{

      console.error(err);
      alert("Registration Failed");

    });

  };

  return(

    <div>

      <Navbar/>

      <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        minHeight:"70vh"
      }}>

        <form
          onSubmit={handleRegister}
          style={{
            background:"#fff",
            padding:"30px",
            borderRadius:"10px",
            boxShadow:"0 0 10px rgba(0,0,0,0.1)",
            width:"300px"
          }}
        >

          <h2>Register</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          >

            <option value="USER">
              Job Seeker
            </option>

            <option value="ADMIN">
              Admin
            </option>

          </select>

          <button
            type="submit"
            style={{
              width:"100%",
              padding:"10px",
              background:"#2563eb",
              color:"white",
              border:"none"
            }}
          >

            Register

          </button>

        </form>

      </div>

      <Footer/>

    </div>

  );

}

export default Register;