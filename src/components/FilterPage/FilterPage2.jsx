import React, { useState } from 'react'
import Nestednavbar from '../Nestednavbar/Nestednavbar2'
import DoctorMainCard from './DoctorMainCard'
import Filter from './Filter'
import './FilterPage.css'
import MidPartTwo from '../../MidPartTwo'
import Footer from '../footer/footerrs'
import Footerr from '../footer/footer'
import MapContainer from './Mapcontainer'
import './filter.css';
import './DoctorMainCard.css'
import VerifiedImg from '../../assests/img/Verified-SVG.svg'
import { BsInfoCircle } from "react-icons/bs";
import DoctorCard from './DoctorCard'
import Sponsor from './Sponsor'
import doctorProfile from '../../assests/img/Ellipse-30.png'
import videoCall from '../../assests/img/video_call.svg'
import MedicalService from '../../assests/img/medical_services.svg'
import thumbsUp from '../../assests/img/ThumbsUp.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faStar as fasStar } from '@fortawesome/free-solid-svg-icons'; // Filled star
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Not filled star

//imported and install bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css';

//imported react-iocns 
import { RiArrowDownSLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import './mapcontainer.css';
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";


const FilterPage = () => {
    const [expanded, setExpanded] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleButtonClick = () => {
        setExpanded(!expanded);
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchButtonClick = () => {
        // Handle search functionality here, such as fetching data based on searchInput
        console.log('Searching for:', searchInput);
    };

    const handleResetClick = () => {
        // Reset the component to default state
        setExpanded(false);
        setSearchInput('');
    };

    const [startIndex, setStartIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(0);
    const [showDoctorCard, setShowDoctorCard] = useState(false);


    const dates = [
        { day: 'Today', slots: 11 },
        { day: 'Tomorrow', slots: 17 },
        { day: 'Fri, 5 May', slots: 18 },
        { day: 'Sat, 6 May', slots: 15 },
        { day: 'Sun, 7 May', slots: 10 },
        { day: 'Mon, 8 May', slots: 12 },
        { day: 'Tue, 9 May', slots: 14 },
        { day: 'Wed, 10 May', slots: 9 },
        { day: 'Thu, 11 May', slots: 8 },
        { day: 'Fri, 12 May', slots: 13 }
    ];

    const timeSlots = {
        morning: ['11:30 AM'],
        afternoon: ['12:00 PM', '12:30 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
        evening: ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM']
    };

    const showPrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
            setSelectedDate(selectedDate - 1);
        }
    };

    const showNext = () => {
        if (startIndex + 3 < dates.length) {
            setStartIndex(startIndex + 1);
            setSelectedDate(selectedDate + 1);
        }
    };

    const handleBookAppointment = () => {
        setShowDoctorCard(true);
    };

    /*first set defult value*/
    const [filters, setFilters] = useState({
        specialty: 'All Specialty',
        gender: '',
        date: '',
        hospital: '',
        language: '',
        consultation: '',
        availability: '',
        condition: '',
    });

    /*onclick events*/
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    /*reset button Logic start */
    const handleReset = () => {
        setFilters({
            specialty: 'All Specialty',
            gender: '',
            date: '',
            hospital: '',
            language: '',
            consultation: '',
            availability: '',
            condition: '',
        });
    };
    /*reset button Logic End */

    return (
        <>
            <Nestednavbar />
            <div className='container-fluid'>
                <div className='d-flex'>
                    <div className=" filter-edit">
                        <>
                            <div className="sidebar-filter d-none d-md-block">
                                <div className='filter-heading-reset'>
                                    <h5>Filter</h5>
                                    <button onClick={handleReset}><i className="bi bi-arrow-counterclockwise " /> Reset Filter</button>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>Specialty</label>
                                        <select name="specialty" value={filters.specialty} onChange={handleChange}>
                                            <option>All Specialty</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select name="gender" value={filters.gender} onChange={handleChange}>
                                            <option value="">Select Gender</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>By Date</label>
                                        <div className="date-input-container">
                                            <input type="date" name="date" value={filters.date} onChange={handleChange} />
                                            <FiCalendar className="custom-calendar-icon" />
                                        </div>
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>By Hospital Name</label>
                                        <select name="hospital" value={filters.hospital} onChange={handleChange}>
                                            <option value="">Hospital name</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>Language</label>
                                        <select name="language" value={filters.language} onChange={handleChange}>
                                            <option value="">Select Language</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>By Consultation</label>
                                        <select name="consultation" value={filters.consultation} onChange={handleChange}>
                                            <option value="">Consultation Type</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>By Availability</label>
                                        <select name="availability" value={filters.availability} onChange={handleChange}>
                                            <option value="">Availability</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>By Condition</label>
                                        <select name="condition" value={filters.condition} onChange={handleChange}>
                                            <option value="">Condition Type</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                    <div className="doctorMainCard-edit">
                        <>
                            <div className="container mt-4">
                                <div className="row">
                                    <div className='col-7 doc-card-header'>
                                        <h4>55 doctors available in Andheri west</h4>
                                        <div className='d-flex'>
                                            <img src={VerifiedImg} alt="VerifiedImg" style={{ width: "26px", height: "26px" }} />
                                            <p>Book appointments with minimum wait-time & varified doctor details</p>
                                        </div>
                                    </div>
                                    <div className='col-1'></div>
                                    <div className="col-4 sort-by">
                                        <label htmlFor="sort">Sort By</label>
                                        <select id="sort">
                                            <option value="relevance" className='custom-option'>Relevance</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='sponsor-card'>
                                    <div className='sponsored-text d-flex'>
                                        <BsInfoCircle />
                                        <p>Sponsored</p>
                                    </div>
                                    <div className='row doctor-card'>
                                        <div className="col-7 ">
                                            <div className="doctor-info">
                                                <img src={doctorProfile} alt="Dr. Shantanu Jambhekar" className="doctor-photo" />
                                                <div className="doctor-details">
                                                    <h2>Dr. Shantanu Jambhekar</h2>
                                                    <p className="speciality">Dentist</p>
                                                    <p className="experience">16 years experience overall</p>
                                                    <p className="location">Pare, Mumbai</p>
                                                    <p className="clinic">Smilesense Center for Advanced Dentistry + 1 more</p>
                                                    <div className="consultation-type">
                                                        <img src={MedicalService} alt="videoCall" />
                                                        <span>In-Person</span>
                                                        <img src={videoCall} alt="videoCall" style={{ color: "#37adff" }} />
                                                        <span>Video Consultation</span>
                                                    </div>
                                                    <div className="percentage-data d-flex">
                                                        <div className='liked'>
                                                            <img src={thumbsUp} alt="thumbsUp" />
                                                            <span>99% </span>
                                                        </div>
                                                        <span>93 Patient Stories</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-1"></div> */}
                                        <div className="col-5 appointment d-flex flex-column">
                                            <div className='rating-stars'>
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                            </div>
                                            <div className=''>
                                                <div className='distance-div'>
                                                    <div className='d-flex flex-row'>
                                                        <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                                                        <p className='distance'>1.3km Away</p>
                                                    </div>
                                                    <p className="availability">Available Today</p>
                                                </div>
                                                <div className='d-flex flex-row'>
                                                    <button className="book-button mr-2" onClick={handleBookAppointment}>Book Appointment</button>
                                                    <button className="book-button"><FontAwesomeIcon icon={faPaperPlane} /></button>
                                                </div>
                                            </div>
                                        </div>
                                        {showDoctorCard && (
                                            <div className="container doctor-card-date">
                                                <div className="date-nav">
                                                    <button className="arrow" onClick={showPrev} disabled={startIndex === 0}>‹</button>
                                                    <div className="date-carousel">
                                                        {dates.slice(startIndex, startIndex + 3).map((date, index) => (
                                                            <div
                                                                key={index}
                                                                className={`date-item ${index + startIndex === selectedDate ? 'active' : ''}`}
                                                                onClick={() => setSelectedDate(index + startIndex)}
                                                            >
                                                                <h3>{date.day}</h3>
                                                                <span className="slots-available">{date.slots} Slots Available</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button className="arrow" onClick={showNext} disabled={startIndex + 3 >= dates.length}>›</button>
                                                </div>
                                                <div className="underline">
                                                    <div
                                                        className="underline-active"
                                                        style={{ left: `calc(100% / 2.67 * ${selectedDate - startIndex})` }}
                                                    ></div>
                                                </div>
                                                <div className='container mt-3'>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6>Morning</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.morning.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6 style={{ marginLeft: "0px" }}>Afternoon</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.afternoon.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6>Evening</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.evening.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='result-card'>
                                    <p>All results</p>
                                    <div className='row doctor-card'>
                                        <div className="col-7 ">
                                            <div className="doctor-info">
                                                <img src={doctorProfile} alt="Dr. Shantanu Jambhekar" className="doctor-photo" />
                                                <div className="doctor-details">
                                                    <h2>Dr. Shantanu Jambhekar</h2>
                                                    <p className="speciality">Dentist</p>
                                                    <p className="experience">16 years experience overall</p>
                                                    <p className="location">Pare, Mumbai</p>
                                                    <p className="clinic">Smilesense Center for Advanced Dentistry + 1 more</p>
                                                    <div className="consultation-type">
                                                        <img src={MedicalService} alt="videoCall" />
                                                        <span>In-Person</span>
                                                        <img src={videoCall} alt="videoCall" style={{ color: "#37adff" }} />
                                                        <span>Video Consultation</span>
                                                    </div>
                                                    <div className="percentage-data d-flex">
                                                        <div className='liked'>
                                                            <img src={thumbsUp} alt="thumbsUp" />
                                                            <span>99% </span>
                                                        </div>
                                                        <span>93 Patient Stories</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-1"></div> */}
                                        <div className="col-5 appointment d-flex flex-column">
                                            <div className='rating-stars'>
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                            </div>
                                            <div className=''>
                                                <div className='distance-div'>
                                                    <div className='d-flex flex-row'>
                                                        <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                                                        <p className='distance'>1.3km Away</p>
                                                    </div>
                                                    <p className="availability">Available Today</p>
                                                </div>
                                                <div className='d-flex flex-row'>
                                                    <button className="book-button mr-2" onClick={handleBookAppointment}>Book Appointment</button>
                                                    <button className="book-button"><FontAwesomeIcon icon={faPaperPlane} /></button>
                                                </div>
                                            </div>
                                        </div>
                                        {showDoctorCard && (
                                            <div className="container doctor-card-date">
                                                <div className="date-nav">
                                                    <button className="arrow" onClick={showPrev} disabled={startIndex === 0}>‹</button>
                                                    <div className="date-carousel">
                                                        {dates.slice(startIndex, startIndex + 3).map((date, index) => (
                                                            <div
                                                                key={index}
                                                                className={`date-item ${index + startIndex === selectedDate ? 'active' : ''}`}
                                                                onClick={() => setSelectedDate(index + startIndex)}
                                                            >
                                                                <h3>{date.day}</h3>
                                                                <span className="slots-available">{date.slots} Slots Available</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button className="arrow" onClick={showNext} disabled={startIndex + 3 >= dates.length}>›</button>
                                                </div>
                                                <div className="underline">
                                                    <div
                                                        className="underline-active"
                                                        style={{ left: `calc(100% / 2.67 * ${selectedDate - startIndex})` }}
                                                    ></div>
                                                </div>
                                                <div className='container mt-3'>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6>Morning</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.morning.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6 style={{ marginLeft: "0px" }}>Afternoon</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.afternoon.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6>Evening</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.evening.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                    <div className="">
                        <>
                            <div className='resetButtonContainer'>
                                <button className='resetButton' onClick={handleResetClick}>
                                    <IoClose />
                                </button>
                            </div>
                            <div className='mapHead'>
                                <div className={`mapContainer ${expanded ? 'expanded' : ''}`}>
                                    <iframe
                                        className="mapFrame"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509349!2d144.9631579153587!3d-37.81627974201782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5772d5fd411f07b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1619929516970"
                                        allowFullScreen=""
                                        loading="lazy"
                                        title="Google Maps"
                                    ></iframe>
                                    {expanded ? (
                                        <div className="searchInputContainer">
                                            <input
                                                type="text"
                                                className="searchInput"
                                                placeholder="Enter search term"
                                                value={searchInput}
                                                onChange={handleInputChange}
                                            />
                                            <button className="searchButton" onClick={handleSearchButtonClick}>
                                                <IoSearch />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="searchButtonContainer">
                                            <button className="searchButton" onClick={handleButtonClick}>
                                                Search on Map <IoSearch />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    </div>
                </div>
                {/* <MidPartTwo/>
        <Footerr/>
        <Footer/> */}
            </div>
        </>
    )
}

export default FilterPage
