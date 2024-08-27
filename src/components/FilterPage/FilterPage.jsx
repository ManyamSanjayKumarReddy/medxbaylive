import React, { useEffect, useState } from 'react';
// import Nestednavbar from '../Nestednavbar/Nestednavbar';
import DoctorMainCard from './DoctorMainCard';
import Filter from './Filter';
import './FilterPage.css';
import MidPartTwo from '../../MidPartTwo';
import Footer from '../footer/footerrs';
import Footerr from '../footer/footer';
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
  const [locations, setLocations] = useState([]);
  const [Uniquekey,setUniqueKey] = useState('');
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
    hospital: "",
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
        const response = await fetchFromPatient('/doctors');
        if (response && Array.isArray(response.doctors)) {
          setDoctors(response.doctors);
          const extractedLocations = response.doctors
            .filter(doctor => doctor.hospitals && Array.isArray(doctor.hospitals))
            .flatMap(doctor =>
              doctor.hospitals
                .filter(hospital => hospital.lat && hospital.lng)
                .map(hospital => ({
                  lat: hospital.lat,
                  lng: hospital.lng,
                  name: hospital.name,
                  city: hospital.city
                }))
            );
          setLocations(extractedLocations);
        } else {
          setDoctors([]);
          setLocations([]);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]); // Ensure doctors is always an array
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

  const handleFilterChange = (filterData) => {
    setFilters(filterData);
  };
  
  const handleResetClick = () => {
    setIsMapExpanded(false);
    setSearchInput('');
    
  };
  const handleMapClose = () => {
    setIsMapExpanded(false);
  };

  const filterDoctors = (doctors) => {
    if (!Array.isArray(doctors)) {
      return []; // Return an empty array if doctors is not an array
    }
  
    return doctors.filter((doctor) => {
      const getStringValue = (value) => (typeof value === 'string' ? value.toLowerCase().replace(" ", "") : '');
      // console.log(filters)

      const country = getStringValue(doctor.country || '');
      const state = getStringValue(doctor.state || '');
      const speciality = (doctor.speciality.length >0 ? doctor.speciality:[]).map(getStringValue);
      const city = getStringValue(doctor.city || '');
      const gender = getStringValue(doctor.gender || '');
      const hospital = doctor.hospitals.length > 0 ? doctor.hospitals.map(hospital => getStringValue(hospital.name)):[];
      const availability = getStringValue(doctor.availability || '');
      const doctorConditions = (doctor.conditions || []).map(getStringValue);
      const doctorLanguages = (doctor.languages || []).map(getStringValue);
      const consultation = getStringValue(doctor.consultation || '');

      const matchesCountry = !filters.country || country === getStringValue(filters.country);
      const matchesState = !filters.state || state === getStringValue(filters.state);
      const matchesCity = !filters.city || city === getStringValue(filters.city);
      const matchesSpeciality = !filters.speciality || speciality.includes(getStringValue(filters.speciality));
      const matchesGender = !filters.gender || gender === getStringValue(filters.gender);
      const matchesHospital = !filters.hospital || hospital.includes(getStringValue(filters.hospital));
      const matchesAvailability = !filters.availability || availability === getStringValue(filters.availability);
      const matchesConditions = filters.conditions.length === 0 || filters.conditions.every(condition => doctorConditions.includes(getStringValue(condition)));
      const matchesLanguages = filters.languages.length === 0 || filters.languages.every(language => doctorLanguages.includes(getStringValue(language)));
      const matchesConsultation = !filters.consultation || consultation === getStringValue(filters.consultation);
  
      return (
        matchesCountry &&
        matchesState &&
        matchesCity &&
        matchesSpeciality &&
        matchesGender &&
        matchesHospital &&
        matchesAvailability &&
        matchesConditions &&
        matchesLanguages &&
        matchesConsultation
      );
    });
  };
  const filteredDoctors = filterDoctors(doctors);
  // console.log(filteredDoctors,"after")
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
            <Filter onFilterChange={handleFilterChange} initialFilters={filters} />

            </div>
            <div className={`doctorMainCard-edit ${isMapExpanded ? 'col-4' : 'col-12 col-lg-6'}`}>
              <DoctorMainCard isMapExpanded={isMapExpanded} doctors={filteredDoctors} location={locations}/>
            </div>
            <div className={`map-edit d-none d-lg-block ${isMapExpanded ? 'col-5 mt-4' : 'col-3'}`}>
              <MapContainer
                expanded={isMapExpanded}
                searchInput={searchInput}
                onExpandToggle={handleMapExpandToggle}
                onSearchInputChange={handleSearchInputChange}
                onSearchButtonClick={handleSearchButtonClick}
                onResetClick={handleResetClick}
                uniqueLocations={locations}
                onClickOutside={handleMapClose} // Pass handleMapClose function

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
