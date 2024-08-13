import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Nestednavbar2/nestednavbar.css';

import axios from 'axios';
import Navbar from '../Navbar/Navbar';
const Nestednavbaruserside = () => {
    const [what, setWhat] = useState('');
    const [where, setWhere] = useState('');
    const navigate = useNavigate();
  
    const searchDoctors = async () => {
      try {
          const response = await axios.get(`https://medxbay-deploy-1-431103.uc.r.appspot.com/auth/search-doctors?what=${what}&where=${where}`, { withCredentials: true });
          const data = response.data; // Access the data directly
          // If you need to check content type, you can use the following (though it's usually unnecessary with axios):
          const contentType = response.headers['content-type'];
          if (contentType && contentType.includes('application/json')) {
              console.log('Booking response:', data);
          } else {
              console.error('Unexpected response format:', data);
          }
      } catch (error) {
          console.error('Error fetching doctors:', error);
      }
  };
  
    useEffect(() => {
      searchDoctors();
    }, [what, where]);
    const handleButtonClick = () => {
      navigate('/Filters');
    };
  
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
                
                <input
                  className="width-input"
                  type="text"
                  id="what"
                  value={what}
                  onChange={(e) => setWhat(e.target.value)}
                  placeholder="Search Doctors, providers or conditions"
                />
              </div>
              <div className="form-control-two">
                <label>Where</label>
                <input
                  className="width-input"
            type="text"
            id="where"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            placeholder="United Arab Emirates"
            />
                
              </div>
              <button type="submit" className="btn button-color" onClick={handleButtonClick}>
                Find My Doctor
              </button>
              </form>
          </div>
        </div>
      </>
    )  
}

export default Nestednavbaruserside