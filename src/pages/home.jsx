/* global kakao */
import React from "react";
import "../scss/home.scss";
import Calc from "../components/calc";

const Home = () => {
  return (
    <div className="home">
      <div className="home-box">
        <div className="cabbage-box">
          <div className="ifraim_cont">
            <iframe
              src="https://www.weather.go.kr/w/weather/today.do/"
              className="weather_iframe"
              seamless
            >
              이 브라우저는 iframe을 제공하지 않습니다.
            </iframe>
            <section className="container"></section>
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
