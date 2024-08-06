import React from 'react';
import './nestednavbar.css';
import Navbar from '../Navbar/Navbar';

const Nestednavbar = () => {

  return (
    <>
        <div className="nested sticky-top">
          <div className="color-style">
            <Navbar />
          </div>
          
          <div className="navbar-back">
            <form>
              <div className="form-control-one">
                <label>What</label>
                <input className="width-input" type="text" placeholder="Search Doctors, providers or conditions" />
              </div>
              <div className="form-control-two">
                <label>Where</label>
                <input type="text" placeholder="United Arab Emirates" />
              </div>
              <button type="submit" className="btn button-color">
                Find My Doctor
              </button>
            </form>
          </div>
        </div>

    </>
  );
};

export default Nestednavbar;
