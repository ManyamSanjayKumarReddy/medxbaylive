import React, { useState, useEffect } from 'react';
import './hero.css'; 

import doctorImage from '../Assets/doctorImage.png';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { getNames, getCode } from 'country-list';
import countries from 'i18n-iso-countries';
import { useNavigate } from 'react-router-dom';
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const Hero = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        const countriesList = getNames().map(country => {
            const alpha2Code = getCode(country);
            const alpha3Code = countries.alpha2ToAlpha3(alpha2Code);

            // Map "ARE" to "UAE"
            const displayValue = alpha3Code === 'ARE' ? 'UAE' : alpha3Code;

            return {
                value: displayValue,
                label: country,
                fullLabel: country
            };
        });
        setLocations(countriesList);
        setSelectedLocation(countriesList.find(c => c.value === 'UAE'));
    }, []);

    const handleLocationChange = (event) => {
        const selectedValue = event.target.value;
        const selectedOption = locations.find(location => location.value === selectedValue);
        setSelectedLocation(selectedOption);
    };

    const handleButtonClick = () => {
        navigate('/Filters');
    };

    return (
        <>  
           <div className='hero-head container-fluid'>
                <div className='row hero-content align-items-center'>
                    <div className="col-md-6 col-12 hero-item">
                        <h5>Be Your Own Health Advocate</h5>
                        <h1 className="hero-title">Find the<span>  Best Providers</span> <br /> Based On Your Condition</h1>
                        <div className='search-box'>
                            <div className="custom-select-wrapper">
                                <HiOutlineLocationMarker className="icon-loc-src"/>
                                <select
                                    onChange={handleLocationChange}
                                    value={selectedLocation ? selectedLocation.value : 'UAE'}
                                >
                                    {locations.map(location => (
                                        <option key={location.value} value={location.value}>
                                            {selectedLocation && selectedLocation.value === location.value ? location.value : location.fullLabel}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='simple-line'></div>
                            <div className="search">
                                <IoMdSearch className="icon-loc-src" />
                                <input type="text" className='search-input' placeholder="Search Doctors" />
                                <div className='simple-line-small'></div>
                                <div className="outer">
                                    <button className="search-button" onClick={handleButtonClick}>
                                        Find My Doctor
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-12 text-center">
                        <div className='image-division'>
                            <div className="ecg-container">
                                <svg viewBox="0 0 100 50" className="ecg-line">
                                    <polyline className="outline" points="0,25 10,25 15,13 20,35 25,25 33,25 40,7 47,40 53,25 65,25 68,15 74,35 80,25 95,25" />
                                    <polyline className="line" points="0,25 10,25 15,13 20,35 25,25 33,25 40,7 47,40 53,25 65,25 68,15 74,35 80,25 100,25" />
                                </svg>
                            </div>
                            <img src={doctorImage} alt="Doctors" className="hero-image"/>
                            <div className="layout"></div> 
                        </div> 
                    </div>
                </div>
           </div>
        </>
    );
};

export default Hero;
