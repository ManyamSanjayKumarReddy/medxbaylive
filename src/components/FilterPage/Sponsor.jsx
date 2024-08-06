import React, { useState } from 'react'
import doctorProfile from '../../assests/img/Ellipse-30.png'
import videoCall from '../../assests/img/video_call.svg'
import MedicalService from '../../assests/img/medical_services.svg'
import thumbsUp from '../../assests/img/ThumbsUp.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faStar as fasStar } from '@fortawesome/free-solid-svg-icons'; // Filled star
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Not filled star

const DoctorCard = ({isMapExpanded}) => {
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

  return (
    <div className={`row doctor-card ${isMapExpanded ? 'mapExpanded-doctor-card' : ''}`}>
    <div className={`col-7 ${isMapExpanded ? 'col-12' : ''}`}>
        <div className="doctor-info">
            <div>
                <img src={doctorProfile} alt="Dr. Shantanu Jambhekar" className="doctor-photo" />
                <div className={` ${isMapExpanded ? 'mapExpanded-sponsor-rating-stars' : 'd-none'}`}>
                    <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "11px" }} />
                    <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "11px" }} />
                    <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "11px" }} />
                    <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "11px" }} />
                    <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "11px" }} />
                </div>
                <div className={`distance-div ${isMapExpanded ? 'mapExpanded-sponsor-distance-div' : 'd-none'}`}>
                    <div className='d-flex flex-row'>
                        <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                        <p className='distance'>1.3km Away</p>
                    </div>
                </div>
            </div>
            <div className="doctor-details">
                <h2>Dr. Shantanu Jambhekar</h2>
                <p className="speciality">Dentist</p>
                <p className="experience">16 years experience overall</p>
                <p className={`location ${isMapExpanded ? 'mapExpanded-location' : ''}`}>Pare, Mumbai</p>
                <p className={`clinic ${isMapExpanded ? 'mapExpanded-clinic' : ''}`}>Smilesense Center for Advanced Dentistry + 1 more</p>
                <div className={`consultation-type ${isMapExpanded ? 'mapExpanded-consultation-type' : ''}`}>
                    <img src={MedicalService} alt="videoCall" />
                    <span>In-Person</span>
                    <img src={videoCall} alt="videoCall" style={{ color: "#37adff" }} />
                    <span>Video Consultation</span>
                </div>
                <div className={`percentage-data d-flex ${isMapExpanded ? 'mapExpanded-percentage-data' : ''}`}>
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
    <div className={`"col-5 appointment d-flex flex-column" ${isMapExpanded ? 'col-12 mapExpanded-appointment ' : ''}`}>
        <div className={`rating-stars ${isMapExpanded ? 'd-none' : ''}`}>
            <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
            <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
            <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
            <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />
            <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />
        </div>
        <div className=''>
            <div className={`distance-div ${isMapExpanded ? 'd-none' : ''}`}>
                <div className='d-flex flex-row'>
                    <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                    <p className='distance'>1.3km Away</p>
                </div>
                <p className="availability">Available Today</p>
            </div>
            <div className='d-flex flex-row'>
                <button className={`book-button mr-2 ${isMapExpanded ? 'mapExpanded-button' : ''}`} onClick={handleBookAppointment}>Book Appointment</button>
                <button className={`book-button ${isMapExpanded ? 'mapExpanded-button' : ''}`}><FontAwesomeIcon icon={faPaperPlane} /></button>
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
  )
}

export default DoctorCard
