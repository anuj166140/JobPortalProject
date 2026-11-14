import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import JobList from "../components/JobList";
import Companies from "../components/Companies";
import Footer from "../components/Footer";

function Home() {

  return (

    <div>

      <Navbar/>

      <Hero/>

      <Stats/>

      {/* Latest Jobs Section */}
      <JobList/>

      <Companies/>

      <Footer/>

    </div>

  );

}

export default Home;