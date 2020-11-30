/* global kakao */
import React, { useEffect, useState } from "react";
import "../scss/home.scss";
import Calc from "../components/calc";
import farm from "../images/farm.jfif";

const Home = () => {
  return (
    <div className="home">
      <div className="home-box">
        <div className="cabbage-box">
          <div>
            <img src={farm} alt="" />
            <section className="container">
              <h1 className="title">
                <span>Hi, nice</span>
                <span>to see</span>
                <span>you here</span>
              </h1>
              <h2 className="title">
                <span>This is the</span>
                <span>cabbage price</span>
                <span>prediction website</span>
              </h2>
            </section>
          </div>
          <div className="calc">
            <Calc />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
