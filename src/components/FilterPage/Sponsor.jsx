import React, { useEffect, useState } from 'react';
import doctorProfile from '../../assests/img/Ellipse-30.png'; // Placeholder image
import videoCall from '../../assests/img/video_call.svg';
import MedicalService from '../../assests/img/medical_services.svg';
import thumbsUp from '../../assests/img/ThumbsUp.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'; // Filled star
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Not filled star
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'; // Half-filled star
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // Filled star
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment/moment.js';
import { RiArrowDownSLine } from "react-icons/ri";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const bufferToBase64 = (buffer) => {
    if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
      const bytes = new Uint8Array(buffer.data);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return `data:image/jpeg;base64,${btoa(binary)}`;
    } else {
      console.error('Unexpected buffer type:', typeof buffer);
      return '';
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => value * Math.PI / 180;
    const R = 6371; // Radius of the Earth in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2); // Return distance with two decimal places
};

const DoctorCard = ({ isMapExpanded, doctor = {} }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(0);
    const [showDoctorCard, setShowDoctorCard] = useState(false);
    const [profilePicture, setProfilePicture] = useState(doctorProfile);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [consultationType, setConsultationType] = useState(''); // Default consultation type
    const [selectedHospital, setSelectedHospital] = useState('');


    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
    const [hospitalDistance, setHospitalDistance] = useState(null); 
    const navigate = useNavigate();


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                console.error('Error fetching geolocation:', error);
                toast.error('Unable to fetch your location. Please enable location services.');
            }
        );
    }, []);

    // Calculate distance when hospital or user location changes
    useEffect(() => {
        if (selectedHospital && doctor.hospitals) {
            console.log(userLocation)
            const hospital = doctor.hospitals.find(h => h.name === selectedHospital);
            console.log(hospital)
            if (hospital && hospital.lat && hospital.lng && userLocation.lat && userLocation.lng) {
                const distance = calculateDistance(userLocation.lat, userLocation.lng, hospital.lat, hospital.lng);
                setHospitalDistance(distance);
                console.log(distance)
            }
        }
    }, [selectedHospital, doctor.hospitals, userLocation]);
    useEffect(() => {
        if (doctor.profilePicture && doctor.profilePicture.data) {
            // console.log('Profile picture data type:', typeof doctor.profilePicture.data);
            // console.log('Profile picture data:', doctor.profilePicture.data);
            const base64String = bufferToBase64(doctor.profilePicture.data);
            setProfilePicture(base64String);
        }


    }, [doctor.profilePicture]);
    // Default values for dates if doctor data is missing
    // console.log(doctor.profilePicture);

    const timeSlots = doctor.timeSlots || []; 
    const filteredTimeSlots = selectedHospital
        ? timeSlots.filter(slot => slot.hospital === selectedHospital)
        : timeSlots;        

        
    const datesMap = filteredTimeSlots.reduce((acc, slot) => {
        const date = new Date(slot.date).toDateString();
        if (!acc[date]) {
            acc[date] = { day: date, slots: 0, timeSlots: [] };
        }
        acc[date].slots += 1;
        acc[date].timeSlots.push(slot);
        return acc;
    }, {});

    const dates = Object.values(datesMap);

    while (dates.length < 3) {
        dates.push({ day: 'Unavailable', slots: 0, timeSlots: [] });
    }
    
    const groupedSlots = {
        morning: [],
        afternoon: [],
        evening: []
    };

    // Group time slots into morning, afternoon, evening
    if (dates[selectedDate]) {
        dates[selectedDate].timeSlots.forEach(slot => {
            const hour = parseInt(slot.startTime.split(':')[0], 10);
            if (hour < 12) {
                groupedSlots.morning.push(slot.startTime);
            } else if (hour < 17) {
                groupedSlots.afternoon.push(slot.startTime);
            } else {
                groupedSlots.evening.push(slot.startTime);
            }
        });
    }

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

    const handleShowCard = () => {
        setShowDoctorCard(true);
    };

    const handleTimeSlotClick = (slot) => {
        setSelectedTimeSlot(slot);
    };
    
    const handleBookAppointment = async () => {
        const user = sessionStorage.getItem('loggedIn');

    
        if (!user) {
            toast.info('You need to log in to book an appointment.',{
                className: 'toast-center toast-fail',
                closeButton: true,
                progressBar: true,
              });

              
            setTimeout(() => {
                navigate('/');
            }, 2000); 
            return;
        }
    
        try {
            const selectedDay = dates[selectedDate];
            if(consultationType === ''){
                toast.info('Please select a consultation type.',{
                    className: 'toast-center ',
                    closeButton: true,
                    progressBar: true,

                });
                return
            }
            const bookingData = {
                doctorId: doctor._id,
                date: moment(selectedDay.day).format('YYYY-MM-DD'),
                startTime: selectedTimeSlot,
                consultationType: consultationType,
                hospital : selectedHospital
            };
            console.log('Booking data:', bookingData);
    
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/patient/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(bookingData),
                credentials: 'include' 
            });
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                console.log('Booking response:', result);
                toast.info('Booking successful!',{
                    className: 'toast-center toast-success',
                    closeButton: true,
                    progressBar: true,
                });
                navigate('/profile/userprofile/manage/appointments')
            } else {
                const responseText = await response.text();
                console.error('Unexpected response format:', responseText);
                toast.info('Unexpected response from server. Please try again.',
                    {
                      className: 'toast-center toast-fail',
                      closeButton: true,
                      progressBar: true,
                   
                    }
                  );
            }
        } catch (error) {
            console.error('Error booking appointment:', error.message);
            toast.info('Error booking appointment. Please try again.',
            {
                className: 'toast-center toast-fail',
                closeButton: true,
                progressBar: true,
            });
        }
    };
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={`full-${i}`} icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />);
        }
        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} style={{ color: "#37adff", fontSize: "12px" }} />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />);
        }
        return stars;
    };

    const renderConsultationType = () => {
        if (doctor.consultation === 'In-person') {
            return (
                <div className={`p-1 ${consultationType === "In-person" ? "consultationActiveColor" : ""}`}>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inPersonCheck"
                            checked={consultationType === 'In-person'}
                            onChange={() => setConsultationType('In-person')}
                            />
                            <img src={MedicalService} alt="In-Person" />
                        <label className="form-check-label" htmlFor="inPersonCheck">
                            In-Person
                        </label>
                    </div>
                </div>
            );
        } else if (doctor.consultation === 'Video call') {
            return (
                <div className={`p-1 ${consultationType === "Video call" ? "consultationActiveColor" : ""}`}>
                    {/* <img src={videoCall} alt="Video Consultation" style={{ color: "#37adff" }} /> */}
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inPersonCheck"
                            checked={consultationType === 'Video call'}
                            onChange={() => setConsultationType('Video call')}
                            />
                            <img src={videoCall} alt="In-Person" />
                        <label className="form-check-label" htmlFor="inPersonCheck">
                            Video Consultation
                        </label>
                    </div>
                </div>
            );
        } else if (doctor.consultation === 'Both') {
            return (
                <>
                    <div className={`p-1 ${consultationType === "In-person" ? "consultationActiveColor" : ""}`}>
                        <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inPersonCheck"
                            checked={consultationType === 'In-person'}
                            onChange={() => setConsultationType('In-person')}
                            />
                            <img src={MedicalService} alt="In-Person" />
                        <label className="form-check-label" htmlFor="inPersonCheck">
                            In-Person
                        </label>
                    </div>
                    </div>
                    <div className={`p-1 ${consultationType === "Video call" ? "consultationActiveColor" : ""}`}>
                        {/* <img src={videoCall} alt="Video Consultation" style={{ color: "#37adff" }} /> */}
                        <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inPersonCheck"
                            checked={consultationType === 'Video call'}
                            onChange={() => setConsultationType('Video call')}
                            />
                            <img src={videoCall} alt="In-Person" />
                        <label className="form-check-label" htmlFor="inPersonCheck">
                            Video consultation
                        </label>
                    </div>
                    </div>
                </>
            );
        }
        return null;
    };

    const renderHospitalOptions = () => {
        if (!doctor.hospitals || doctor.hospitals.length === 0) {
            return <p>No hospitals available</p>;
        }
    
        return (
            <>
                <div className={` hospital-sort-by ${isMapExpanded ? 'mapExpanded-hospital-sort-by' : ''}`}>
                    <div className="form-group">
                        <select value={selectedHospital}
                            onChange={(e) => setSelectedHospital(e.target.value)}>
                            <option value="" disabled selected>Select Hospital</option>
                            {doctor.hospitals.map((hospital, index) => (
                                <option key={index} value={hospital.name}>
                                    {hospital.name || 'Unnamed Hospital'}
                                </option>
                            ))}
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />
                    </div>
                </div>
            </>
            
        );
    };
    
    

    return (
        <>
                <ToastContainer />
            <div className={`row doctor-card ${isMapExpanded ? 'mapExpanded-doctor-card' : ''}`}>
                <div className={`col-7 ${isMapExpanded ? 'col-12' : ''}`}>
                    <div className="doctor-info">
                        <div>
                            <Link to={`/doctor/${doctor._id}`}>
                                <img src={profilePicture} alt={doctor.name || "Doctor"} className="sponsored-doctor-photo" />
                            </Link>
                            <div className={` ${isMapExpanded ? 'mapExpanded-sponsor-rating-stars' : 'd-none'}`}>
                                {doctor.rating !== undefined ? renderStars(doctor.rating) : renderStars(0)}
                            </div>
                            <div className={`distance-div ${isMapExpanded ? 'mapExpanded-sponsor-distance-div' : 'd-none'}`}>
                                <div className='d-flex flex-row'>
                                    <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                                    <p className='distance'> {hospitalDistance ? `${hospitalDistance} km Away` : 'Calculating distance...'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-details1">
                      
                             <Link to={`/doctor/${doctor._id}`}>
                                <h2>{doctor.name}</h2>
                            </Link> 
                            <p className="speciality">{doctor.speciality }</p>
                            <p className="experience">{doctor.experience || "16 years experience overall"}</p>
                            <p className={`location ${isMapExpanded ? 'mapExpanded-location' : ''}`}>{doctor.city || "Pare, Mumbai"}</p>
                            <p className={`clinic ${isMapExpanded ? 'mapExpanded-clinic' : ''}`}>
                            <div className="row mt-2">
                                <div className="col">
                                    {renderHospitalOptions()}
                                </div>
                            </div>
                            </p>
                            <div className={`consultation-type ${isMapExpanded ? 'mapExpanded-consultation-type' : ''}`}>
                                {renderConsultationType()}
                            </div>
                            <div className={`percentage-data d-flex ${isMapExpanded ? 'mapExpanded-percentage-data' : ''}`}>
                                <div className='liked'>
                                    <img src={thumbsUp} alt="thumbsUp" />
                                    <span>{doctor.likedPercentage || "99%"}</span>
                                </div>
                                <span>{doctor.patientStories || "93 Patient Stories"}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-5 appointment d-flex flex-column ${isMapExpanded ? 'col-12 mapExpanded-appointment' : ''}`}>
                    <div className={`rating-stars ${isMapExpanded ? 'd-none' : ''}`}>
                        {doctor.rating !== undefined ? renderStars(doctor.rating) : renderStars(0)}
                    </div>
                    <div>
                        <div className={`distance-div ${isMapExpanded ? 'd-none' : ''}`}>
                            <div className='d-flex flex-row'>
                                <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                                <p className='distance'> {hospitalDistance ? `${hospitalDistance} km Away` : 'Calculating distance...'}</p>
                            </div>
                            <p className="availability">{doctor.availability ? "Available" : "Not Available"}</p>
                        </div>
                        <div className='d-flex flex-row'>
                            <button className={`book-button mr-2 ${isMapExpanded ? 'mapExpanded-button' : ''}`} onClick={handleShowCard}>Book Appointment</button>
                            <button className={`book-button ${isMapExpanded ? 'mapExpanded-button' : ''}`}><FontAwesomeIcon icon={faPaperPlane} /></button>
                        </div>
                    </div>
                </div>
                {showDoctorCard && (
                    <div className="container doctor-card-date">
                        <div className="date-nav">
                            <button className="arrow" onClick={showPrev} disabled={startIndex === 0}>‹</button>
                            <div className="date-carousel">
                                {dates.length > 0 ? (
                                    dates.slice(startIndex, startIndex + (isMapExpanded ? 2 : 3)).map((date, index) => (
                                        <div
                                        key={index}
                                        className={`date-item ${index + startIndex === selectedDate ? 'active' : ''}`}
                                        onClick={() => setSelectedDate(index + startIndex)}
                                        style={{
                                            pointerEvents: date.slots === 0 ? 'none' : 'auto', 
                                            opacity: date.slots === 0 ? 0.5 : 1, 
                                            cursor: date.slots === 0 ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        <h3>{date.day}</h3>
                                        <span className="slots-available">{date.slots} Slots Available</span>
                                    </div>
                                    ))
                                ) : (
                                    <p>No slots are available</p>
                                )}
                            </div>
                            <button className="arrow" onClick={showNext} disabled={startIndex + 3 >= dates.length}>›</button>
                        </div>
                        <div className="underline">
                            <div
                                className="underline-active"
                                style={{
                                    left: `calc(100% / ${isMapExpanded ? 2 : 3} * ${selectedDate - startIndex})`,
                                    width: `calc(100% / ${isMapExpanded ? 2 : 3})`
                                }}
                            ></div>
                        </div>
                        {dates[selectedDate] && (
                            <div className="container mt-3">
                                <div className="time-slots-group d-flex flex-row">
                                    <h6>Morning</h6>
                                    <div className="time-slots">
                                        {groupedSlots.morning.map((slot, index) => (
                                            <button
                                                key={`morning-${index}`}
                                                className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''}`}
                                                onClick={() => handleTimeSlotClick(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="time-slots-group d-flex flex-row">
                                    <h6>Afternoon</h6>
                                    <div className="time-slots">
                                        {groupedSlots.afternoon.map((slot, index) => (
                                            <button
                                                key={`afternoon-${index}`}
                                                className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''}`}
                                                onClick={() => handleTimeSlotClick(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="time-slots-group d-flex flex-row">
                                    <h6>Evening</h6>
                                    <div className="time-slots">
                                        {groupedSlots.evening.map((slot, index) => (
                                            <button
                                                key={`evening-${index}`}
                                                className={`time-slot ${selectedTimeSlot === slot ? 'selected btn-primary' : ''}`}
                                                onClick={() => handleTimeSlotClick(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        )}
                        {selectedTimeSlot && (
                            <div className="book-now">
                                <button className="btn btn-primary" onClick={handleBookAppointment}>Book Now</button>
                            </div>
                        )}
                    </div>

                )}
            </div>
        </>
    );
};

export default DoctorCard;