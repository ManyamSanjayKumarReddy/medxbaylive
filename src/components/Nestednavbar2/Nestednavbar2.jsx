import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './nestednavbar.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const Nestednavbar = () => {
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [whatOptions, setWhatOptions] = useState([]);
  const [whereOptions, setWhereOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const populateWhatOptions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/what-options`, { withCredentials: true });
        const data = response.data;
        const { specialities, conditions, doctors } = data;
        setWhatOptions([...specialities, ...conditions, ...doctors]);
      } catch (error) {
        console.error('Error fetching what options:', error);
      }
    };

    const populateWhereOptions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/where-options`, { withCredentials: true });
        const data = response.data;
        const { cities, states, countries } = data;
        setWhereOptions([...cities, ...states, ...countries]);
      } catch (error) {
        console.error('Error fetching where options:', error);
      }
    };

    populateWhatOptions();
    populateWhereOptions();
  }, []);

  const searchDoctors = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/search-doctors?what=${what}&where=${where}`, { withCredentials: true });
      console.log('Navigating with:', { doctors: response.data, what, where });
      navigate('/profile/filters', { state: { doctors: response.data, what, where } });
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
  

  return (
    <>
      <div className="nested sticky-top">
        <div className="color-style">
          <Navbar />
        </div>

        <div className="navbar-back">
          <form onSubmit={searchDoctors}>
            <div className="form-control-one">
              <label htmlFor="what">What</label>
              <input
                className="width-input"
                id="what"
                value={what}
                onChange={(e) => setWhat(e.target.value)}
                list="what-options"
                placeholder="Search Specialities, providers or conditions"
              />
              <datalist id="what-options">
                {whatOptions.map((option, index) => (
                  <option key={index} value={option} />
                ))}
              </datalist>
            </div>
            <div className="form-control-two">
              <label htmlFor="where">Where</label>
              <input
                className="width-input"
                id="where"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                list="where-options"
                placeholder="United Arab Emirates"
              />
              <datalist id="where-options">
                {whereOptions.map((option, index) => (
                  <option key={index} value={option} />
                ))}
              </datalist>
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
