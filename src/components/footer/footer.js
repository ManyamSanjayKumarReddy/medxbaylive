import React from 'react';

import './footer.css'; // Ensure you create and import the CSS file
import { RiSendPlaneFill } from "react-icons/ri";

function Footerr() {
  return (
    <div className="footer-containers" >
    <div className="footer-container">
      <div className="text-container">
        <h3 className='header'>Be notified when our beta launches</h3>
        <p className='parawe'>We want to keep you up to date once we launch beta<br/> version so that you are the first to experience this platform.</p>
      </div>
      <div className="email-container">
        <input type="text" placeholder="Email Address" className="email-box"/>
        <button className="email-button">
        <RiSendPlaneFill />
        </button>
      </div>
    </div>
    </div>
  );
}

export default Footerr;