import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './nestednavbar.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useSearch } from '../context/context';
import { RiArrowDownSLine } from "react-icons/ri";

const Nestednavbar = () => {
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [whatOptions, setWhatOptions] = useState([]);
  const [whereOptions, setWhereOptions] = useState([]);
  const [showWhatOptions, setShowWhatOptions] = useState(false);
  const [showWhereOptions, setShowWhereOptions] = useState(false);
  const navigate = useNavigate();
  const { setSearchData } = useSearch();

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

  const searchDoctors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/search-doctors?what=${what}&where=${where}`, { withCredentials: true });
      const doctors = response.data;

      if (doctors && doctors.length > 0) {
        console.log('Navigating with:', { doctors, what, where });
        setSearchData({ doctors, what, where });
        navigate('/Filters');
      } else {
        console.log('No doctors found');
        // Navigate to a different page or show a message
        navigate('/Filters', { state: {doctors,what, where } });
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      // Handle error (e.g., show a message to the user)
      navigate('/Filters', { state: { error: 'An error occurred while searching for doctors. Please try again later.' } });
    }
  };

  useEffect(()=>{
   if(what != ''|| what != ''){
    searchDoctors();
   }  

  },[what,where])


  const handleWhatSelect = (option) => {
    setWhat(option);
    setShowWhatOptions(false);
  };

  const handleWhereSelect = (option) => {
    setWhere(option);
    setShowWhereOptions(false);
  };

  const handleFocusWhat = () => setShowWhatOptions(true);
  const handleFocusWhere = () => setShowWhereOptions(true);

  return (
    <>
      <div className="nested sticky-top">
        <div className="color-style">
          <Navbar />
        </div>

        <div className="navbar-back">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-control-one">
              <label htmlFor="what">What</label>
              {/* <div className="input-wrapper"> */}
              <input
                type="text"
                className="width-input"
                id="what"
                value={what}
                onChange={(e) => setWhat(e.target.value)}
                placeholder="Search Specialities, providers or conditions"
                onFocus={handleFocusWhat}
                onBlur={() => setTimeout(() => setShowWhatOptions(false), 200)}
                autoComplete="off"
              />
              {/* <RiArrowDownSLine className="arrow-icon-doctor-filter" />
              </div> */}
              {showWhatOptions && (
                <ul className="dropdown-list what-dropdown">
                  {whatOptions
                    .filter(option => option.toLowerCase().includes(what.toLowerCase()))
                    .map((option, index) => (
                      <li key={index} className="dropdown-item" onMouseDown={() => handleWhatSelect(option)}>
                        {option}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div className="form-control-two">
              <label htmlFor="where">Where</label>
              {/* <div className="input-wrapper"> */}
              <input
                className="width-input"
                id="where"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                placeholder="United Arab Emirates"
                onFocus={handleFocusWhere}
                onBlur={() => setTimeout(() => setShowWhereOptions(false), 200)}
                autoComplete="off"
              />
              {/* <RiArrowDownSLine className="arrow-icon-doctor-filter" />
              </div> */}
              {showWhereOptions && (
                <ul className="dropdown-list where-dropdown">
                  {whereOptions
                    .filter(option => option.toLowerCase().includes(where.toLowerCase()))
                    .map((option, index) => (
                      <li key={index} className="dropdown-item" onMouseDown={() => handleWhereSelect(option)}>
                        {option}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <button type="submit" className="btn button-color">
              Find My Provider
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Nestednavbar;
