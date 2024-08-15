import React, { useEffect, useState } from 'react';
// import Nestednavbar from '../Nestednavbar/Nestednavbar';
import DoctorMainCard from './DoctorMainCard';
import Filter from './Filter';
import './FilterPage.css';

import Footer from '../footer/footerrs';

import MapContainer from './Mapcontainer';
import './OffCanvas.css';
import { fetchFromPatient } from '../../actions/api';
import Nestednavbar from '../Nestednavbar2/Nestednavbar2';
import { useLocation } from 'react-router-dom';

const FilterPage = () => {
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    what: '',
    where: '',
    country: '',
    state: '',
    city: '',
    speciality: '',
    conditions: [],
    languages: [],
    gender: '',
    hospital: '',
    availability: '',
    dateAvailability: '',
    consultation: ''
  });

  useEffect(()=>{
    if (location.state) {
      const { doctors: fetchedDoctors, what, where } = location.state;
      setDoctors(fetchedDoctors);
      setFilters(prevFilters => ({
        ...prevFilters,
        what: what || '',
        where: where || ''
      }));
    }
  },[location.state])
  useEffect(() => {
    
    const fetchDoctors = async () => {
      try {
        const response = await fetchFromPatient(`/doctors`);

        setDoctors(response.doctors);
        // console.log(response.doctors);
        
      } catch (error) {
      }
    };

    fetchDoctors();
  }, []);

  const toggleFilterCanvas = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleMapExpandToggle = () => {
    setIsMapExpanded(!isMapExpanded);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setFilters((prevFilters) => ({ ...prevFilters, what: searchInput }));
  };

  const handleFilterChange = (filterName, filterValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: filterValue }));
  };

  const handleResetClick = () => {
    setIsMapExpanded(false);
    setSearchInput('');
    setFilters({
      what: '',
      where: '',
      country: '',
      state: '',
      city: '',
      speciality: '',
      conditions: [],
      languages: [],
      gender: '',
      hospital: '',
      availability: '',
      dateAvailability: '',
      consultation: ''
    });
  };

  const filterDoctors = (doctors) => {
  if (!Array.isArray(doctors)) {
    return [];
  }
  return doctors.filter((doctor) => {
    const getStringValue = (value) => (typeof value === 'string' ? value.toLowerCase() : '');

    const speciality = getStringValue(doctor.speciality || '');
    const city = getStringValue(doctor.city || '');
    const gender = getStringValue(doctor.gender || '');
    const hospital = getStringValue(doctor.hospital || '');
    const availability = getStringValue(doctor.availability || '');
    const doctorConditions = (doctor.conditions || []).map(getStringValue);
    const doctorLanguages = (doctor.languages || []).map(getStringValue);

    const matchesCity = !filters.city || city === getStringValue(filters.city);
    const matchesSpeciality = !filters.speciality || speciality === getStringValue(filters.speciality);
    const matchesGender = !filters.gender || gender === getStringValue(filters.gender);
    const matchesHospital = !filters.hospital || hospital === getStringValue(filters.hospital);
    const matchesAvailability = !filters.availability || availability === getStringValue(filters.availability);
    const matchesConditions = filters.conditions.length === 0 || filters.conditions.every(condition => doctorConditions.includes(getStringValue(condition)));
    const matchesLanguages = filters.languages.length === 0 || filters.languages.every(language => doctorLanguages.includes(getStringValue(language)));

    return (
      matchesCity &&
      matchesSpeciality &&
      matchesGender &&
      matchesHospital &&
      matchesAvailability &&
      matchesConditions &&
      matchesLanguages
    );
  });
};


  const filteredDoctors = filterDoctors(doctors);
  console.log(filteredDoctors);
  

  return (
    <>
    <Nestednavbar/>
      <div className='container-fluid mt-5'>
        <div className='filterpage-parent'>
          <button onClick={toggleFilterCanvas} className="btn btn-primary my-3 d-lg-none">
            Open Filters
          </button>

          <div className={`offcanvas left ${isFilterOpen ? 'open' : ''}`}>
            <button className="closebtn" onClick={toggleFilterCanvas}>&times;</button>
            <div className="filter-container">
              <Filter onFilterChange={handleFilterChange} filters={filters} />
            </div>
          </div>

          <div className='row'>
            <div className="filter-edit col-3 d-none d-lg-block">
              <Filter onFilterChange={handleFilterChange} filters={filters} />
            </div>
            <div className={`doctorMainCard-edit ${isMapExpanded ? 'col-4' : 'col-12 col-lg-6'}`}>
              <DoctorMainCard isMapExpanded={isMapExpanded} doctors={filteredDoctors} />
            </div>
            <div className={`map-edit d-none d-lg-block ${isMapExpanded ? 'col-5 mt-4' : 'col-3'}`}>
              <MapContainer
                expanded={isMapExpanded}
                searchInput={searchInput}
                onExpandToggle={handleMapExpandToggle}
                onSearchInputChange={handleSearchInputChange}
                onSearchButtonClick={handleSearchButtonClick}
                onResetClick={handleResetClick}
              />
            </div>
          </div>
        </div>
    

 
        <Footer />
      </div>
    </>
  );
};

export default FilterPage;
