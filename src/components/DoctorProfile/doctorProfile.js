
import React, { useEffect, useState ,useRef} from 'react';
import StarRating from './StarRating';
import '../DoctorProfile/doctorProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFilePrescription } from '@fortawesome/free-solid-svg-icons';
import Reviewpage from '../../components/Reviewpage/Reviewpage';
import Articles from '../Article/Article';
import Languages from '../Languages/Language';
import AwardsRecognition from '../Awards/Awards';
import AcceptedInsurances from '../Insurance/Acceptedinsurance';
import "../Faq/FAQ.css";
import smilee from '../../assests/img/smilee.svg'
import hospitalimage from '../../assests/img/Image.svg'
import image from '../../assests/img/Image.png'
import hospitallogo from '../../assests/img/hospitallogo.png'
import faqimage from '../../assests/img/faqimage.png'
import hanfheart from '../../assests/img/handheart.svg'
import axios from 'axios'; 
function DoctorProfile() {
  const [visibleCards, setVisibleCards] = useState([0, 1, 2]); 
  const totalCards = 5;
  const [showAppointmentDropdown, setShowAppointmentDropdown] = useState(false);
  const [appointmentContainerHeight, setAppointmentContainerHeight] = useState('409px');
  const [activeDotIndex, setActiveDotIndex] = useState(0); 
  const [doctor, setDoctor] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState('');
    const handleInsuranceChange = (event) => {
      setSelectedInsurancePlace(event.target.value);
    };
    const [selectedInsurance, setSelectedInsurancePlace] = useState('');

    const handleChange = (event) => {
      setSelectedPlace(event.target.value);
    };

    const toggleAppointmentDropdown = () => {
      setShowAppointmentDropdown(!showAppointmentDropdown);
      setAppointmentContainerHeight(showAppointmentDropdown ? '409px' : '948px'); 
    };

    const [selected, setSelected] = useState(null);
  
    const toggle = (i) => {
      setSelected(selected === i ? null : i);
    };
 const reviewRef = useRef(null);
    const scrollToReviews = () => {
      if (reviewRef.current) {
        window.scrollTo({
          top: reviewRef.current.offsetTop,
          behavior: 'smooth' 
        });
      }
    };
  
  useEffect(() => {
    document.title = "Doctor-Profile";
  }, []);



  useEffect(() => {
  
    
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/doctor/profile/update', { withCredentials: true });
        const doctorData = response.data;

      
        if (doctorData.dateOfBirth) {
          const date = new Date(doctorData.dateOfBirth);
          const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
          doctorData.dateOfBirth = formattedDate;
        }

        console.log("API Response:", doctorData);
        setDoctor(doctorData);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, []);

  const daysAndSlots = [
    { day: 'Today', slotsAvailable: '11 slots available' },
    { day: 'Tomorrow', slotsAvailable: '18 slots available' },
    { day: 'Fri, 5 May', slotsAvailable: '21 slots available' },
    { day: 'Sat, 6 May', slotsAvailable: '28 slots available' },
    { day: 'Sun, 7 May', slotsAvailable: '13 slots available' },

  ];

  const handleLeftClick = () => {
    setVisibleCards((prevCards) => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 820) {
        const newCard = (prevCards[0] - 1 + totalCards) % totalCards;
        return [newCard];
      } else if (screenWidth > 2000) {
        const newCard = (prevCards[prevCards.length - 1] - 1 + totalCards) % totalCards;
        return [(newCard - 2 + totalCards) % totalCards, (newCard - 1 + totalCards) % totalCards, newCard];
      }

      const newCards = prevCards.map((index) => (index - 1 + totalCards) % totalCards);
      return newCards;
    });
  };
  
  const handleRightClick = () => {
    setVisibleCards((prevCards) => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 820) {
        const newCard = (prevCards[0] + 1) % totalCards;
        return [newCard];
      } else if (screenWidth > 2000) {
        const newCard = (prevCards[prevCards.length - 1] + 1) % totalCards;
        return [(newCard - 2 + totalCards) % totalCards, (newCard - 1 + totalCards) % totalCards, newCard];
      }
      const newCards = prevCards.map((index) => (index + 1) % totalCards);
      return newCards;
    });
  };
  
  
  const handleCardClick = (index) => {
    const activeIndex = visibleCards.indexOf(index);
    setActiveDotIndex(activeIndex);
  };
  

  const faqRef = useRef(null);

  const scrollToFaq = () => {
    faqRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  


  const faqData = [
    {
      question: "Why choose our medical for your family?",
      answer:
        "We provide top-notch medical services with a family-friendly environment.",
    },
    {
      question: "Why we are different from others?",
      answer:
        "Our commitment to personalized care and advanced technology sets us apart.",
    },
    {
      question: "Trusted & experience senior care & love",
      answer:
        "Our experienced staff offers compassionate care for seniors, ensuring their well-being.",
    },
    {
      question: "How to get appointment for emergency cases?",
      answer:
        "You can call our emergency hotline or visit our website to book an urgent appointment.",
    },
  ];

  return (
    <div className='doctor-profile'>
      
      <div className='share-box'>
        <div className='share-icon'></div>
        <p className='share-text'>Share</p>
        <div className='save-icon'></div>
        <p className='save-text'>Save</p>
        <div className='Appointment-container' style={{ height: appointmentContainerHeight }}>
            <p className='book-appointment'>Book an Appointment</p>
            <div className='Appointment-container-box'>
<div className='book-appointment-inperson'>
<div className='book-appointment-inperson-icon'></div>
  <p className='book-appointment-inperson-container'>In-Person</p>
</div>

<div className='video-consultation-container'>
  <div className='video-consultation-container-icon'></div>
  <p className='video-consultation-text'>Video Consultation</p>
</div>
</div>
<div className='Appointment-select-place'>Select Place</div>
 <div className='Appointment-select-place-dropdown'>
 <select 
                            className='Appointment-select-place-text'
                            value={selectedPlace}
                            onChange={handleChange}
                        >
                            <option value='Memorial Sloan-Kettering Cancer Center'>
Select Place
                            </option>
                            <option value='Cleveland Clinic'>
                            Memorial Sloan-Kettering Cancer Center
                            </option>
                            <option value='Mayo Clinic'>
                                Mayo Clinic
                            </option>
                            <option value='Johns Hopkins Hospital'>
                                Johns Hopkins Hospital
                            </option>
                        </select>
                        <svg
                            className='dropdown-arrow'
                            width='10.61'
                            height='6.48'
                            viewBox='0 0 12 8'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path d='M6.00057 4.97633L10.1254 0.851562L11.3039 2.03007L6.00057 7.33341L0.697266 2.03007L1.87578 0.851562L6.00057 4.97633Z' fill='#FF7F50'/>
                        </svg>
    </div>
    <div className='select-insurance-plan'>Select Insurance Plan</div>
                    <div className='insurance-plan-dropdown'>
                        <select
                            className='Appointment-select-insurance-text'
                            value={selectedInsurance}
                            onChange={handleInsuranceChange}
                        >
                            <option>Select Insurance Plan</option>
                            <option>Plan 2</option>
                            <option>Plan 3</option>
                        </select>
                        <svg
                            className='dropdown-arrow-insurance'
                            width='10.61'
                            height='6.48'
                            viewBox='0 0 12 8'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path d='M6.00057 4.97633L10.1254 0.851562L11.3039 2.03007L6.00057 7.33341L0.697266 2.03007L1.87578 0.851562L6.00057 4.97633Z' fill='#FF7F50'/>
                        </svg>
                    </div>
                    <div className='Appointment-select-date-slot'>
                    <div className='Appointment-select-date'>Select Date & Slot</div>
                    <div className='Appointment-slot-drop-down'>
            <svg
              className='Appointment-slot-drop-down-icon'
              width='12.61'
              height='8.48'
              viewBox='0 0 12 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={toggleAppointmentDropdown}
            >
              <path d='M6.00057 4.97633L10.1254 0.851562L11.3039 2.03007L6.00057 7.33341L0.697266 2.03007L1.87578 0.851562L6.00057 4.97633Z' fill='#FF7F50'/>
            </svg>
            {showAppointmentDropdown && (
                <div className='Appointment-drop-down-content'>
                  <div className='Appointment-date-container'>
                    {visibleCards.map((index) => (
                      <div
                        key={index}
                        className={`Appointment-${index % 3 === 0 ? 'today' : index % 3 === 1 ? 'tomorrow' : 'day-after-tomorrow'}`}
                        onClick={() => handleCardClick(index)}
                      >
                        <p className={`Appointment-${index % 3 === 0 ? 'today' : index % 3 === 1 ? 'tomorrow' : 'day-after-tomorrow'}`}>
                          {daysAndSlots[index].day}
                        </p>
                        <div className={`Appointment-${index % 3 === 0 ? 'today' : index % 3 === 1 ? 'tomorrow' : 'day-after-tomorrow'}-slots-available`}>
                          {daysAndSlots[index].slotsAvailable}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='slick-dots Appointment-dots'>
                    {[0, 1, 2].map((dotIndex) => (
                      <span
                        key={dotIndex}
                        className={`slick-dot Appointment-dot ${dotIndex === activeDotIndex ? 'active' : ''}`}
                      />
                    ))}
</div>

               


      

                <div className='Appointment-navigation'>
                  <div className='Appointment-previous-box' onClick={handleLeftClick}>
                    <svg
                      width='20'
                      height='18'
                      viewBox='0 0 15 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6.76775 7.49994L9.86133 10.5936L8.97745 11.4774L4.99994 7.49994L8.97745 3.52246L9.86133 4.40635L6.76775 7.49994Z'
                        fill='#FF7F50'
                      />
                    </svg>
                  </div>
                  <div className='Appointment-next-box' onClick={handleRightClick}>
                    <svg
                      width='20'
                      height='18'
                      viewBox='0 0 15 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M8.23225 7.50006L5.13867 4.40644L6.02255 3.52257L10.0001 7.50006L6.02255 11.4775L5.13867 10.5937L8.23225 7.50006Z'
                        fill='#FF7F50'
                      />
                    </svg>
                  </div>
                </div>
                <div className='morning'>
                  <div className='morning-text'>Morning  </div>
                </div>
                <div className='Appointment-morning-time-container'>
                    {[...Array(5)].map((_, rowIndex) => (
                      <div key={`row-${rowIndex}`} className='Appointment-morning-time-row'>
                        {[...Array(4)].map((_, colIndex) => (
                          <div key={`slot-${rowIndex}-${colIndex}`} className='morning-time'>
                            <p className='morning-time-text'>11:30 AM</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className='afternoon'>
                  <div className='afternoon-text'>Afternoon  </div>
                </div>
                <div className='Appointment-afternoon-time-container'>
                    {[...Array(5)].map((_, rowIndex) => (
                      <div key={`row-${rowIndex}`} className='Appointment-afternoon-time-row'>
                        {[...Array(4)].map((_, colIndex) => (
                          <div key={`slot-${rowIndex}-${colIndex}`} className='afternoon-time'>
                            <p className='afternoon-time-text'>11:30 AM</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className='evening'>
                  <div className='evening-text'>Evening  </div>
                </div>
                <div className='Appointment-evening-time-container'>
                    {[...Array(5)].map((_, rowIndex) => (
                      <div key={`row-${rowIndex}`} className='Appointment-evening-time-row'>
                        {[...Array(4)].map((_, colIndex) => (
                          <div key={`slot-${rowIndex}-${colIndex}`} className='evening-time'>
                            <p className='evening-time-text'>11:30 AM</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <button className='continue-booking'>  
                  Continue Booking
                       </button>
              </div>
            )}
          </div>
                    </div>
                </div>
            </div>
      <div className='doctor-profile-container'>
        <div className='doctor-profile-img'></div>
        <div className='doctor-details'>
          <p className='doctorname'>{doctor ? doctor.name : 'Loading...'}</p>

          <div className='education'>
            <StarRating totalStars={5} />
            <div className='degree'>Vascular Surgery (MBBS, MD)</div>
          </div>
          <div className='doctor-discription'>
            <div className='inperson'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.736 4.16031H12.1603V2.48799C12.1603 1.29247 11.217 0.320312 10.0182 0.320312H5.98271C4.78335 0.320312 3.84031 1.29247 3.84031 2.48799V4.16031H2.26431C1.19039 4.16031 0.320312 4.98943 0.320312 6.06015V13.4224C0.320312 14.4928 1.19039 15.3603 2.26431 15.3603H13.736C14.8096 15.3603 15.6803 14.4928 15.6803 13.4221V6.06015C15.6803 4.98943 14.8096 4.16031 13.736 4.16031ZM5.12031 2.48799C5.12031 2.04031 5.53375 1.60031 5.98271 1.60031H10.0182C10.4659 1.60031 10.8803 2.04031 10.8803 2.48799V4.16031H5.12031V2.48799ZM11.5203 11.2003H9.28031V13.4403H6.72031V11.2003H4.48031V8.64031H6.72031V6.40031H9.28031V8.64031H11.5203V11.2003Z" fill="#37ADFF"/>
</svg>
<p>In-Person</p>
            </div>
            <div className='videoconsultation'>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 4.5V1C14 0.45 13.55 0 13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V7.5L16.29 9.79C16.92 10.42 18 9.97 18 9.08V2.91C18 2.02 16.92 1.57 16.29 2.2L14 4.5ZM10 7H8V9C8 9.55 7.55 10 7 10C6.45 10 6 9.55 6 9V7H4C3.45 7 3 6.55 3 6C3 5.45 3.45 5 4 5H6V3C6 2.45 6.45 2 7 2C7.55 2 8 2.45 8 3V5H10C10.55 5 11 5.45 11 6C11 6.55 10.55 7 10 7Z" fill="#37ADFF"/>
</svg>     
<p >Video Consultation</p>           </div>
            <div className='onlineprescription'>
            <FontAwesomeIcon icon={faFilePrescription} className='doctor-discription-icon'/> Online Prescription

                </div>
          </div>
          <div className='doctor-objective'> Voluptate exercitation officia adipisicing ullamco Lorem proident ipsum duis est adipisicing laborum.</div>
        </div>

      </div>
      <div className={`doctor-details-header ${showAppointmentDropdown ? 'moved' : ''}`}>
 
         <p className='doctor-details-header-Location'>Location</p>
   <p className='doctor-details-header-Insurances'>Insurances</p>
   <p className='doctor-details-header-About'>About Me</p>
   <p className='doctor-details-header-Ratings' onClick={scrollToReviews}>
  Ratings
</p>
   <p className='doctor-details-header-faq' onClick={scrollToFaq}>FAQ’s</p>
   </div>
   <div className={`doctor-appoinment-card-container ${showAppointmentDropdown ? 'moved' : ''}`}>
   <div className='doctor-appoinment-card-one'>
<div className='hospital-name-box'>
  <img  src={hospitalimage}  atl="hospital-Name"></img>
  <p className='hospital-name-text'>Johns Hopkins Medicine</p>
  <p className='hospital-today'>Today</p>
  <p className='hospital-time'>24 hours open</p>
  <div className='hospital-name-icon'>
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.49896 8.23127L10.5926 5.1377L11.4765 6.02158L7.49896 9.99908L3.52148 6.02158L4.40537 5.1377L7.49896 8.23127Z" fill="#FF7F50"/>
</svg>
  </div>
</div>
<div className='hospital-charge'>  
  <div className='hospital-charge-dollar'>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 15H9C9 16.08 10.37 17 12 17C13.63 17 15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7C10.37 7 9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z" fill="#9CA6B1"/>
</svg>
  </div>
 
    <img src={image} alt="Dollar" className='hospital-charge-ammount'></img>

<p className='hospital-charge-video'>(For Video Consultation) </p>
</div>
<div className='hospital-name-logo-container'>
  <div ><img src={hospitallogo} alt="logo" className='hospital-name-logo'></img>
  </div>
  <div className='hospital-name-logo-location-container'>
  <p className='hospital-name-logo-location'>Washington D.C., DC, USA</p>
  <p className='call-now'>Call Now</p>
  <p className='get-direction'>Get Direction</p>
  </div>
  <button className='hospital-charge-book-appoinment'><p className='hospital-charge-book-appoinment-text'>Book Appointment</p></button>
</div>
</div>
<div className='doctor-appoinment-card-two'>
<div className='hospital-name-box'>
  <img  src={hospitalimage}  atl="hospital-Name"></img>
  <div className='hospital-name-text'>Johns Hopkins Medicine</div>
  <p className='hospital-today'>Today</p>
  <p className='hospital-time'>24 hours open</p>
  <div className='hospital-name-icon'>
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.49896 8.23127L10.5926 5.1377L11.4765 6.02158L7.49896 9.99908L3.52148 6.02158L4.40537 5.1377L7.49896 8.23127Z" fill="#FF7F50"/>
</svg>
  </div>
</div>
<div className='hospital-charge'>  
  <div className='hospital-charge-dollar'>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 15H9C9 16.08 10.37 17 12 17C13.63 17 15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7C10.37 7 9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z" fill="#9CA6B1"/>
</svg>
  </div>
 
    <img src={image} alt="Dollar" className='hospital-charge-ammount'></img>

<p className='hospital-charge-video'>(For Video Consultation) </p>
</div>
<div className='hospital-name-logo-container'>
  <div ><img src={hospitallogo} alt="logo" className='hospital-name-logo'></img>
  </div>
  <div className='hospital-name-logo-location-container'>
  <p className='hospital-name-logo-location'>Washington D.C., DC, USA</p>
  <p className='call-now'>Call Now</p>
  <p className='get-direction'>Get Direction</p>
  </div>
  <button className='hospital-charge-book-appoinment'><p className='hospital-charge-book-appoinment-text'>Book Appointment</p></button>
</div>
</div>

   </div>
   <AcceptedInsurances/>
   <AwardsRecognition/>
   <Languages/>
<Articles/>
<div ref={reviewRef}>
    <Reviewpage/>
    </div>

   <div className="faq " ref={faqRef}>
      <h2 className="heading">Frequently Asked Questions</h2>
      <div className="faq-container">
        <div className="faq-left">
        <img src={faqimage} alt="faq" className='faq-image-doctor'></img>
<div className='smile-emoji-container'>
  <img src={smilee} alt='smile' className='smile-emoji'></img>
  <p className='people-count-faq'>84k+</p>
  <p className='happy-patient'>Happy Patients</p>
  <div className='heart-hands-container'>
    <img src={hanfheart} alt='welcome' className='hand-heart'></img>
  </div>
  
</div>
        </div>
        <div className="faq-right">
          {faqData.map((item, i) => (
            <div key={i} className="faq-item">
              <div className="faq-question" onClick={() => toggle(i)}>
                {item.question}
                <span>{selected === i ? "-" : "+"}</span>
              </div>
              <div className={`faq-answer ${selected === i ? "show" : ""}`}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    </div>
  );
}

export default DoctorProfile;
