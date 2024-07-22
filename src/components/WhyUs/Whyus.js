import React from "react";
import './WhyUs.css';

function Whyus() {
  return (
    <div className="background">
      <p className="lorem">LOREM IPSUM</p>
      <h1 className="why">Why Us?</h1>
      <div className="grid-container">
        <div className="grid-item">
          <img src="/icon1.png" alt="Icon 1" className="icon"/>
          <h2>Patient Centered</h2>
          <p>From provider profiles reviewed by other patients to in-depth articles that explore numerous conditions, we have designed our platform to empower you to be your own health advocate.</p>
        </div>
        <div className="grid-item">
          <img src="/icon2.png" alt="Icon 2" className="icon"/>
          <h2>AI First Company</h2>
          <p>To help deliver a quality experience that supports our continuous improvement process, we are dedicated to being an AI first company. This will allow us to implement the latest and greatest tools to best serve.</p>
        </div>
        <div className="grid-item">
          <img src="/icon3.png" alt="Icon 3" className="icon"/>
          <h2>Patient Centered</h2>
          <p>With a focus on serving the Middle East and various countries throughout Africa, we are aligning our efforts to the UN'S Sustainable Development Goal #3, good health & well-being.</p>
        </div>
      </div>
    </div>
  );
}

export default Whyus;