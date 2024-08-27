import React, { useEffect, useRef, useState } from 'react';
import './nestednavbar.css';
import downarrowimage from '../Assets/dwon.gif';
import Navbar from '../Navbar/Navbar';
import MxBay from '../Assets/MxBay.mp4'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Nestednavbar = () => {
  const [isNestedVisible, setIsNestedVisible] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [whatOptions, setWhatOptions] = useState([]);
  const [whereOptions, setWhereOptions] = useState([]);

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
      const doctors = response.data;

      if (doctors && doctors.length > 0) {
        console.log('Navigating with:', { doctors, what, where });
        navigate('/Filters', { state: { doctors, what, where} });
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


  useEffect(() => {
    const handleScroll = () => {
      const arrowSection = document.querySelector('.down-arrow');
      const arrowSectionBottom = arrowSection.getBoundingClientRect().top;

      if (arrowSectionBottom <= 0) {
        setIsNestedVisible(true);
      } else {
        setIsNestedVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const videoPlayer = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoPlayer.classList.add('zoomed');
            videoPlayer.classList.remove('zoomed-out');
          } else {
            videoPlayer.classList.add('zoomed-out');
            videoPlayer.classList.remove('zoomed');
          }
        });
      },
      { threshold: 0.5 } 
    );

    observer.observe(videoPlayer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {isNestedVisible && (
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
              Find My Provider
            </button>
          </form>
        </div>
        </div>
      )}

      <div className="down-arrow">
        <img src={downarrowimage} className="image-arrow" alt="Map" />
      </div>

      <div className="video-wrapper">
        <div ref={videoRef} className="video-player zoomed-out">
          <video loop autoPlay muted controls className="video">
            <source src={MxBay} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
};

export default Nestednavbar;
