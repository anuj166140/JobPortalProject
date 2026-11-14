import React from "react";

function Hero() {

  return (

    <div className="hero">

      <div className="hero-overlay">

        <h1>
          Find Your Dream Career
        </h1>

        <p>
          10,000+ Jobs Available
        </p>

        <div className="hero-search">

          <input
            type="text"
            placeholder="Keyword"
          />

          <select>
            <option>
              Location
            </option>

            <option>
              Remote
            </option>

            <option>
              Pune
            </option>

            <option>
              Hyderabad
            </option>

          </select>

          <button>
            Search
          </button>

        </div>

      </div>

    </div>

  );

}

export default Hero;