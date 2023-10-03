import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home_main">
      <h1 className="home_title">Techdome</h1>
      <div className="banner">
        <p className="banner_title">PLAN</p>
        <p className="banner_title">BUILD</p>
        <p className="banner_title">EXPAND</p>
        <p className="banner_text">
          STARTING OR SCALING TECHDOME MAKES IT EASIER
        </p>
      </div>
    </div>
  );
};

export default Home;
