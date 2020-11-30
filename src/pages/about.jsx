import React from "react";
import "../scss/about.scss";
import covid from "../images/covid19.jfif";
import agriculture from "../images/agriculture.jfif";

const About = () => {
  return (
    <div className="about">
      <div className="about-box">
        <div className="intro-box">
          <h1>About Us</h1>
        </div>
        <div className="desc-box">
          <div className="h2tag-box">
            <h2>This is the cabbage price prediction website</h2>
          </div>
          <div className="ptag-box">
            <img src={covid} alt="" />
            <p>
              The human race is now suffering from a disaster, Corona19.
              Although Korea has achieved relatively little damage due to the
              virus prevention, advanced countries such as the United States and
              Europe have reached beyond imagination the number of infections
              and deaths. Only a year ago, the world regarded free exchange as
              the highest value, but now it's locked inside and out to prevent
              infectious diseases. The efficiency of the international division
              of labor based on comparative advantage only amplifies the crisis
              in the face of infectious diseases. Countries around the world are
              turning to their own priorities, and free trade is declining at a
              certain level. Stable production of food has become more urgent
              due to post-corona measures. We need to come up with measures to
              raise the food self-sufficiency rate. In order to produce food for
              the people in a stable manner, we need to lay the foundation for
              farmers to farm safely. Through this project, farmers can adapt to
              changes in conditions through observation and establish supply and
              demand measures in advance. This eventually leads to rational
              farming and consumption.
            </p>
          </div>
          <div className="ptag-box">
            <p>
              An American futurist named Jason Shanker predicted that as the
              food problem rose from Corona 19 in "The World After Corona," more
              attention will be paid to agriculture than any other time in the
              future for national security. Agriculture is dominated by the
              natural environment, but farmers can adapt to changes in
              conditions through observation and establish supply and demand
              measures in advance. Through supply and demand and price
              forecasts, farmers can engage in reasonable farming activities and
              consumers can also make reasonable consumption if they can predict
              the price of agricultural products. The goal of this project is to
              support reasonable farming activities and consumption by
              predicting the supply and demand of cabbage among various
              agricultural products.
            </p>
            <img src={agriculture} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
