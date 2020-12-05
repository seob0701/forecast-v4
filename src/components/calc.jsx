import React, { useEffect, useState } from "react";
import "../scss/calc.scss";
import { TiWeatherSunny, TiWeatherDownpour } from "react-icons/ti";
import { BiCalculator } from "react-icons/bi";
import Axios from "axios";
// import tf from "@tensorflow/tfjs";

const Calc = () => {
  const tf = require("@tensorflow/tfjs");
  const model = tf.sequential();

  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

  const [locationWeather, setLocationWeather] = useState({
    curTemp: "",
    maxTemp: "",
    minTemp: "",
    rainFall: "",
  });

  const training = (data) => {
    console.log(data);
    const valueSum = data.avgTemp + data.maxTemp + data.minTemp + data.rainFall;
    const myData =
      locationWeather.curTemp * 1 +
      locationWeather.maxTemp * 1 +
      locationWeather.minTemp * 1 +
      locationWeather.rainFall * 1;
    console.log(myData);
    let xs = tf.tensor([valueSum / 40], [1]);
    let ys = tf.tensor([data.avgPrice], [1]);

    model
      .fit(xs, ys, {
        epochs: 500,
        callbacks: {
          onEpochEnd: (epoch, log) =>
            console.log(`Epoch ${epoch}: loss = ${log.loss}`),
          // console.log(),
        },
      })
      .then(() => {
        // Test data Inference
        // model.predict(tf.tensor([(valueSum)/40], [1])).print();
        var predic = model.predict(tf.tensor([myData / 40], [1]));
        let preToStr = String(predic);
        var regex = /[^0-9.]/g;
        let result = preToStr.replace(regex, "");
        console.log(result);
        setCalcValue(result);
      });
  };

  const API_KEY = "12a6abc5f129daa9c48c6753d3ac8026";
  const [calcValue, setCalcValue] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const [dateValue, setDateValue] = useState({
    YYYY: "2020",
    MM: "",
    DD: "",
    // POSTDATE: "",
  });

  const [max, setMax] = useState(31);

  //현위치 위도 경도
  const [lat, setLat] = useState("37.554722");
  const [lon, setLon] = useState("126.970833");

  const tempChange = (e) => {
    const { name, value } = e.target;
    if (name === "curTemp") {
      setLocationWeather({ ...locationWeather, curTemp: value });
    } else if (name === "maxTemp") {
      setLocationWeather({ ...locationWeather, maxTemp: value });
    } else if (name === "minTemp") {
      setLocationWeather({ ...locationWeather, minTemp: value });
    } else {
      setLocationWeather({ ...locationWeather, rainFall: value });
    }
  };

  const getPrice = (postdate) => {
    Axios.post("http://localhost:3001/price", {
      postdate: postdate,
    }).then((response) => training(response.data[0]));
  };

  const getWeather = (lat, lon) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        setLocationWeather({
          curTemp: Math.round(
            (json.daily[0].temp.max + json.daily[0].feels_like.night) / 2
          ),
          maxTemp: Math.round(json.daily[0].temp.max),
          minTemp: Math.round(json.daily[0].feels_like.night),
          rainFall: Math.round(json.minutely[0].precipitation),
        });
      });
    // .then((json) => setLocationWeather(json));

    // setTemp();
  };

  useEffect(() => {
    getWeather(lat, lon);
    // console.log(locationWeather.hourly[0].temp);
    // getPrice();
    // getDate();
  }, []);

  // console.log(currentDate);
  // console.log();

  const handleSubmit = (e) => {
    e.preventDefault();

    let dvy = dateValue.YYYY;
    let dvm = dateValue.MM;
    let dvd = dateValue.DD;

    if (dvy !== "" && dvm !== "" && dvd !== "") {
      const convertM = parseInt(dvm);
      const convertD = parseInt(dvd);

      const mitos = convertM.toString();
      const ditos = convertD.toString();

      dvm = mitos;
      dvd = ditos;

      if (dvm < 10) {
        dvm = 0 + mitos;
      }
      if (dvd < 10) {
        dvd = 0 + ditos;
      }

      // console.log(`${dvy}${dvm}${dvd}`);
      // console.log(currentDate);

      const postdate = `2017${dvm}${dvd}`;
      getPrice(postdate);

      // setDateValue({ ...dateValue, YYYYMMDD: `${dvy}${dvm}${dvd}` });
      // setDateValue({ ...dateValue, POSTDATE: `2017${dvm}${dvd}` });
    } else {
      alert("날짜를 입력하세요");
    }
  };

  const numberChange = (e) => {
    const { name, value } = e.target;
    if (name === "month") {
      if (
        value * 1 === 1 ||
        value * 1 === 3 ||
        value * 1 === 5 ||
        value * 1 === 7 ||
        value * 1 === 8 ||
        value * 1 === 10 ||
        value * 1 === 12
      ) {
        setMax(31);
      } else if (value * 1 === 2) {
        setMax(28);
      } else {
        setMax(30);
      }
      setDateValue({ ...dateValue, MM: value });
    } else {
      setDateValue({ ...dateValue, DD: value });
    }
  };

  return (
    <div className="calc">
      <div className="calc-box">
        <section className="calc-form">
          <h2>배추가격 예측하기</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">
              <b>예측 날짜를 입력하세요</b>
            </label>
            <div style={{ justifyContent: "center" }}>
              <select
                name="year"
                onChange={(e) =>
                  setDateValue({ ...dateValue, YYYY: e.target.value })
                }
                style={{ width: "65px", outline: "none", marginRight: "4px" }}
              >
                <option value="2020">2020</option>
                <option value="2021">2021</option>
              </select>

              <b>년</b>
              <input
                type="number"
                name="month"
                value={dateValue.MM}
                placeholder="MM"
                style={{ width: "32px", textAlign: "center", padding: "0 8px" }}
                min="1"
                max="12"
                onChange={numberChange}
              />
              <b>월</b>
              <input
                type="number"
                name="day"
                value={dateValue.DD}
                placeholder="DD"
                style={{ width: "32px", textAlign: "center", padding: "0 8px" }}
                min="1"
                max={max}
                onChange={numberChange}
              />
              <b>일</b>
            </div>
            <label htmlFor="">
              <b>기온</b>
            </label>
            <div>
              <TiWeatherSunny />
              <label htmlFor="">평균</label>
              <input
                type="number"
                name="curTemp"
                style={{ width: "40px", marginRight: "10px" }}
                value={locationWeather.curTemp}
                onChange={tempChange}
              />
              <label htmlFor="">최대</label>
              <input
                type="number"
                name="maxTemp"
                style={{ width: "40px", marginRight: "10px" }}
                value={locationWeather.maxTemp}
                onChange={tempChange}
              />
              <label htmlFor="">최소</label>
              <input
                type="number"
                name="minTemp"
                style={{ width: "40px", marginRight: "10px" }}
                value={locationWeather.minTemp}
                onChange={tempChange}
              />
            </div>

            <label htmlFor="">
              <b>강수량</b>
            </label>
            <div>
              <TiWeatherDownpour />
              <input
                type="text"
                value={locationWeather.rainFall}
                onChange={tempChange}
                style={{ flex: "1" }}
              />
            </div>

            <label htmlFor="">
              <b>계산 결과</b>
            </label>
            <div>
              <BiCalculator />
              <input
                type="text"
                style={{ flex: "1" }}
                value={calcValue}
                readOnly
              />
              <b>원</b>
            </div>
            <input
              className="calc-btn"
              type="submit"
              value="계산하기"
              style={{ fontWeight: "bold" }}
            />
          </form>
        </section>
      </div>
    </div>
  );
};

export default React.memo(Calc);
