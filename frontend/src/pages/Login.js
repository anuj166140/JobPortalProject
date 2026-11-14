import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../services/api";

function Login(){

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const handleLogin=(e)=>{

    e.preventDefault();

    const loginData={

      email,
      password

    };

    API.post("/auth/login", loginData)

    .then(res=>{

      // If user exists

      if(res.data){

        // Save user to localStorage

        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );

        // Role-based redirect

        if(res.data.role==="ADMIN"){

          window.location.href="/admin";

        }
        else{

          window.location.href="/user";

        }

      }
      else{

        setError("Invalid Email or Password");

      }

    })

    .catch(err=>{

      console.error(err);

      setError("Invalid Email or Password");

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
          onSubmit={handleLogin}
          style={{
            background:"#fff",
            padding:"30px",
            borderRadius:"10px",
            boxShadow:"0 0 10px rgba(0,0,0,0.1)",
            width:"300px"
          }}
        >

          <h2>Login</h2>

          {error && (

            <p style={{color:"red"}}>
              {error}
            </p>

          )}

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

            Login

          </button>

          <p style={{marginTop:"10px"}}>

            Don't have an account?

            <a href="/register">
              Register here
            </a>

          </p>

        </form>

      </div>

      <Footer/>

    </div>

  );

}

export default Login;