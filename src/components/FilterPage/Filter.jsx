import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './filter.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { RiArrowDownSLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";

const Filter = ({ onFilterChange, filters }) => {
    const [dropdownData, setDropdownData] = useState({
        countries: [],
        states: [],
        cities: [],
        specialities: [],
        conditions: [],
        languages: [],
        hospitals: []
    });

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [countriesRes, statesRes, citiesRes, specialitiesRes, conditionsRes, languagesRes, hospitalsRes] = await Promise.all([
                    axios.get('/auth/countries'),
                    axios.get('/auth/states'),
                    axios.get('/auth/cities'),
                    axios.get('/auth/specialities'),
                    axios.get('/auth/conditions'),
                    axios.get('/auth/languages'),
                    axios.get('/auth/hospitals')
                ]);

                setDropdownData({
                    countries: countriesRes.data,
                    states: statesRes.data,
                    cities: citiesRes.data,
                    specialities: specialitiesRes.data,
                    conditions: conditionsRes.data,
                    languages: languagesRes.data,
                    hospitals: hospitalsRes.data
                });
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };

        fetchDropdownData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, selectedOptions } = e.target;

        if (name === 'conditions' || name === 'languages') {
            const options = Array.from(selectedOptions).map(option => option.value);
            onFilterChange(name, options);
        } else {
            onFilterChange(name, value);
        }
    };

    const resetFilters = () => {
        onFilterChange('reset', {});
    };

    return (
        <div className="sidebar-filter">
            <div className='filter-heading-reset'>
                <h5>Filter</h5>
                <button onClick={resetFilters}><i className="bi bi-arrow-counterclockwise" /> Reset Filter</button>
            </div>
             {/* <div className="select-container-filter">
          <div className="form-group">
            <label htmlFor="what">What:</label>
              <input type="text" id="what" name="what" value={filters.what} onChange={handleInputChange} placeholder="Search by name or speciality" />
            <RiArrowDownSLine className="arrow-icon-filter" />
          </div>
        </div>

        <div className="select-container-filter">
          <div className="form-group">
            <label htmlFor="where">Where:</label>
            <input type="text" id="where" name="where" value={filters.where} onChange={handleInputChange} placeholder="Search by location" />
            <RiArrowDownSLine className="arrow-icon-filter" />
          </div>
        </div> */}
            <div className="select-container-filter">
                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <select id="state" name="state" value={filters.state} onChange={handleInputChange}>
                        <option value="">Select State</option>
                        {dropdownData.states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    <RiArrowDownSLine className="arrow-icon-filter" />
                </div>
            </div>

            <div className="select-container-filter">
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <select id="city" name="city" value={filters.city} onChange={handleInputChange}>
                        <option value="">Select City</option>
                        {dropdownData.cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <RiArrowDownSLine className="arrow-icon-filter" />
                </div>
            </div>

            <div className="select-container-filter">
                <div className="form-group">
                    <label htmlFor="dateAvailability">Date Availability:</label>
                    <div className="date-input-container">
                        <input type="date" id="dateAvailability" name="dateAvailability" value={filters.dateAvailability} onChange={handleInputChange} />
                        <FiCalendar className="custom-calendar-icon" />
                    </div>
                </div>
            </div>

            <div className="select-container-filter">
                <div className="form-group">
                    <label htmlFor="speciality">Speciality:</label>
                    <select id="speciality" name="speciality" value={filters.speciality} onChange={handleInputChange}>
                        <option value="">Select Speciality</option>
                        {dropdownData.specialities.map(speciality => (
                            <option key={speciality} value={speciality}>{speciality}</option>
                        ))}
                    </select>
                    <RiArrowDownSLine className="arrow-icon-filter" />
                </div>
            </div>

            <div className="select-container-filter">
                <div className="form-group">
                    <label htmlFor="conditions">Conditions:</label>
                    <select id="conditions" name="conditions" multiple value={filters.conditions} onChange={handleInputChange}>
                        {dropdownData.conditions.map(condition => (
                            <option key={condition} value={condition}>{condition}</option>
                        ))}
                    </select>
                    <RiArrowDownSLine className="arrow-icon-filter" />
                </div>
            </div>

            <div className="select-container-filter">
                <div className="form-group">
                    <label htmlFor="languages">Language Spoken:</label>
                    <select id="languages" name="languages" multiple value={filters.languages} onChange={handleInputChange}>
                        {dropdownData.languages.map(language => (
                            <option key={language} value={language}>{language}</option>
                        ))}
                    </select>
                    <RiArrowDownSLine className="arrow-icon-filter" />
                </div>
            </div>

            <div className="select-container-filter">
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={filters.gender} onChange={handleInputChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <RiArrowDownSLine className="arrow-icon-filter" />
                </div>
            </div>

            <div className="select-container-filter">
                <div className="form-group">
                    <label htmlFor="hospital">Hospital:</label>
                    <select id="hospital" name="hospital" value={filters.hospital} onChange={handleInputChange}>
                        <option value="">Select Hospital</option>
                        {dropdownData.hospitals.map(hospital => (
                            <option key={hospital} value={hospital}>{hospital}</option>
                        ))}
                    </select>
                    <RiArrowDownSLine className="arrow-icon-filter" />
                </div>
            </div>

            <div className="select-container-filter">
                <div className="form-group">
                    <label htmlFor="availability">Available Now:</label>
                    <select id="availability" name="availability" value={filters.availability} onChange={handleInputChange}>
                        <option value="">Select Availability</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <RiArrowDownSLine className="arrow-icon-filter" />
                </div>
            </div>

            <div className="select-container-filter">
                <div className="form-group">
                    <label htmlFor="consultation">Consultation Type:</label>
                    <select id="consultation" name="consultation" value={filters.consultation} onChange={handleInputChange}>
                        <option value="">Select Consultation Type</option>
                        <option value="In-person">In-Person</option>
                        <option value="Video Call">Video Call</option>
                        <option value="Both">Both</option>
                    </select>
                    <RiArrowDownSLine className="arrow-icon-filter" />
                </div>
            </div>
        </div>
    );
};

export default Filter;
