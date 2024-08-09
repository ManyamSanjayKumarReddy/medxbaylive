import React, { useEffect, useState, useRef } from "react";
import StarRating from "./StarRating";
import "../DoctorProfile/doctorProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePrescription } from "@fortawesome/free-solid-svg-icons";
import Reviewpage from "../../components/Reviewpage/Reviewpage";
import Articles from "../Article/Article";
import Languages from "../Languages/Language";
import AwardsRecognition from "../Awards/Awards";
import AcceptedInsurances from "../Insurance/Acceptedinsurance";
import "../Faq/FAQ.css";
import smilee from "../../assests/img/smilee.svg";
import hospitalimage from "../../assests/img/Image.svg";
import image from "../../assests/img/Image.png";
import hospitallogo from "../../assests/img/hospitallogo.png";
import faqimage from "../../assests/img/faqimage.png";
import hanfheart from "../../assests/img/handheart.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchFromDoctor } from "../../actions/api";
import moment from "moment";

const bufferToBase64 = (buffer) => {
  if (buffer.type === 'Buffer' && Array.isArray(buffer.data)) {
      const binary = String.fromCharCode.apply(null, new Uint8Array(buffer.data));
      return `data:image/jpeg;base64,${window.btoa(binary)}`;
  } else {
      console.error('Unexpected buffer type:', typeof buffer);
      return '';
  }
};

function DoctorProfile() {
  const { id } = useParams();
  const [visibleCards, setVisibleCards] = useState([0, 1, 2]);
  const totalCards = 5;
  const [showAppointmentDropdown, setShowAppointmentDropdown] = useState(false);
  const [appointmentContainerHeight, setAppointmentContainerHeight] =
    useState("409px");
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [doctorData, setDoctorData] = useState([]);
  const [profile, setProfile] = useState("");
  const [insurance, setInsurance] = useState([])
  const [blogs,setBlogs]=useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showDoctorCard, setShowDoctorCard] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [consultationType, setConsultationType] = useState('inPerson');

  const [selectedPlace, setSelectedPlace] = useState("");
  const handleInsuranceChange = (event) => {
    setSelectedInsurancePlace(event.target.value);
  };
  const [selectedInsurance, setSelectedInsurancePlace] = useState("");

  const handleChange = (event) => {
    setSelectedPlace(event.target.value);
  };

  const toggleAppointmentDropdown = () => {
    setShowAppointmentDropdown(!showAppointmentDropdown);
    setAppointmentContainerHeight(showAppointmentDropdown ? "409px" : "948px");
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
        behavior: "smooth",
      });
    }
  };

  const getProfile = (a) => {
    if (a.profilePicture && a.profilePicture.data) {
      const base64String = bufferToBase64(a.profilePicture.data);
      setProfile(base64String);
    }
  };

  useEffect(() => {
    document.title = "Doctor-Profile";
    if (id) {
      const fetchDoctors = async () => {
        try {
          const response = await fetchFromDoctor(`/doctors/${id}/slots`);
          setDoctorData(response.doctor);
          setInsurance(response.insurances)
          setBlogs(response.blogs)
          getProfile(response.doctor);
          console.log(profile)
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };

      fetchDoctors();
    }
  }, []);

  const daysAndSlots = [
    { day: "Today", slotsAvailable: "11 slots available" },
    { day: "Tomorrow", slotsAvailable: "18 slots available" },
    { day: "Fri, 5 May", slotsAvailable: "21 slots available" },
    { day: "Sat, 6 May", slotsAvailable: "28 slots available" },
    { day: "Sun, 7 May", slotsAvailable: "13 slots available" },
  ];

  const handleLeftClick = () => {
    setVisibleCards((prevCards) => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 820) {
        const newCard = (prevCards[0] - 1 + totalCards) % totalCards;
        return [newCard];
      } else if (screenWidth > 2000) {
        const newCard =
          (prevCards[prevCards.length - 1] - 1 + totalCards) % totalCards;
        return [
          (newCard - 2 + totalCards) % totalCards,
          (newCard - 1 + totalCards) % totalCards,
          newCard,
        ];
      }

      const newCards = prevCards.map(
        (index) => (index - 1 + totalCards) % totalCards
      );
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
        return [
          (newCard - 2 + totalCards) % totalCards,
          (newCard - 1 + totalCards) % totalCards,
          newCard,
        ];
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
  const insuranceRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToFaq = () => {
    faqRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToInsurace = () => {
    insuranceRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const locationRef = useRef(null);
  const scrollTOLocation = () => {
    locationRef.current.scrollIntoView({ behavior: "smooth" });
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

  const timeSlots = doctorData.timeSlots || [];
  const datesMap = timeSlots.reduce((acc, slot) => {
      const date = new Date(slot.date).toDateString();
      if (!acc[date]) {
          acc[date] = { day: date, slots: 0, timeSlots: [] };
      }
      acc[date].slots += 1;
      acc[date].timeSlots.push(slot);
      return acc;
  }, {});

  const dates = Object.values(datesMap);

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
  try {
      const selectedDay = dates[selectedDate];
      const bookingData = {
          doctorId: doctorData._id,
          date: moment(selectedDay.day).format('YYYY-MM-DD'),
          startTime: selectedTimeSlot,
          consultationType: consultationType
      };
      console.log('Booking data:', bookingData);

      // const result = await fetchFromPatient('/book', bookingData, 'POST');
      // console.log('Booking response JSON:', result);
      alert('Booking successful!');
  } catch (error) {
      console.error('Error booking appointment:', error.message);
      alert('Error booking appointment. Please try again.');
  }
};

const handleConsultationTypeChange = (type) => {
  setConsultationType(type);
};

  return (
    <div className="doctor-profile">
      <div className="share-box">
        <div className="share-icon"></div>
        <p className="share-text">Share</p>
        <div className="save-icon"></div>
        <p className="save-text">Save</p>
        <div
          className="Appointment-container"
          style={{ height: appointmentContainerHeight }}
        >
            <div className="book-appointment">Book Appointment</div>
            <div className="Appointment-container-box">
              <div 
                className={`book-appointment-inperson ${consultationType !== 'inPerson' ? 'inactive' : ''}`}
                onClick={() => handleConsultationTypeChange('inPerson')}
              >
                <div className="book-appointment-inperson-icon"></div>
                <div className="book-appointment-inperson-container">In-person</div>
              </div>
              <div 
                className={`video-consultation-container ${consultationType === 'video' ? 'active' : ''}`}
                onClick={() => handleConsultationTypeChange('video')}
              >
                <div className="video-consultation-container-icon"></div>
                <div className="video-consultation-text">Video Consultation</div>
              </div>
            </div>
          <div className="Appointment-select-place">Select Place</div>
          <div className="Appointment-select-place-dropdown">
            <select
              className="Appointment-select-place-text"
              value={selectedPlace}
              onChange={handleChange}
            >
              <option value="Memorial Sloan-Kettering Cancer Center">
                Select Place
              </option>
              {doctorData.hospitals?.map((i,index) => (
                <option key={i._id} value={i._id}>{i.name}</option>
              ))}
            </select>
            <svg
              className="dropdown-arrow"
              width="10.61"
              height="6.48"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.00057 4.97633L10.1254 0.851562L11.3039 2.03007L6.00057 7.33341L0.697266 2.03007L1.87578 0.851562L6.00057 4.97633Z"
                fill="#FF7F50"
              />
            </svg>
          </div>
          <div className="select-insurance-plan">Select Insurance Plan</div>
          <div className="insurance-plan-dropdown">
            <select
              className="Appointment-select-insurance-text"
              value={selectedInsurance}
              onChange={handleInsuranceChange}
            >
              <option>Select Insurance Plan</option>
              {insurance.map(i => (
                <option key={i._id} value={i._id}>{i.name}</option>
              ))}
            </select>
            <svg
              className="dropdown-arrow-insurance"
              width="10.61"
              height="6.48"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.00057 4.97633L10.1254 0.851562L11.3039 2.03007L6.00057 7.33341L0.697266 2.03007L1.87578 0.851562L6.00057 4.97633Z"
                fill="#FF7F50"
              />
            </svg>
          </div>
          <div className="Appointment-select-date-slot">
            <div className="Appointment-select-date">Select Date & Slot</div>
            <div className="Appointment-slot-drop-down">
              <svg
                className="Appointment-slot-drop-down-icon"
                width="12.61"
                height="8.48"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={toggleAppointmentDropdown}
              >
                <path
                  d="M6.00057 4.97633L10.1254 0.851562L11.3039 2.03007L6.00057 7.33341L0.697266 2.03007L1.87578 0.851562L6.00057 4.97633Z"
                  fill="#FF7F50"
                />
              </svg>
              {showAppointmentDropdown && (
                  <div className="container doctor-card-date">
                      <div className="date-nav">
                          <button className="arrow" onClick={showPrev} disabled={startIndex === 0}>‹</button>
                          <div className="date-carousel">
                              {dates.slice(startIndex, startIndex + 2).map((date, index) => (
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
                              style={{
                                  left: `calc(100% / ${2} * ${selectedDate - startIndex})`,
                                  width: `calc(100% / ${2})`
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
                              <button className="btn btn-primary" onClick={handleBookAppointment}>Continue Booking</button>
                          </div>
                      )}
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="doctor-profile-container">
        <div className="doctor-profile-img">
          <img src={profile} alt={doctorData.name || "Doctor"} className="doctor-profile-img"/>
        </div>
        <div className="doctor-details">
          <p className="doctorname">{doctorData.name}</p>

          <div className="education">
            <StarRating totalStars={doctorData.rating} />
            <div className="degree">{doctorData.title}</div>
          </div>
          <div className="doctor-discription">
            <div className="inperson">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.736 4.16031H12.1603V2.48799C12.1603 1.29247 11.217 0.320312 10.0182 0.320312H5.98271C4.78335 0.320312 3.84031 1.29247 3.84031 2.48799V4.16031H2.26431C1.19039 4.16031 0.320312 4.98943 0.320312 6.06015V13.4224C0.320312 14.4928 1.19039 15.3603 2.26431 15.3603H13.736C14.8096 15.3603 15.6803 14.4928 15.6803 13.4221V6.06015C15.6803 4.98943 14.8096 4.16031 13.736 4.16031ZM5.12031 2.48799C5.12031 2.04031 5.53375 1.60031 5.98271 1.60031H10.0182C10.4659 1.60031 10.8803 2.04031 10.8803 2.48799V4.16031H5.12031V2.48799ZM11.5203 11.2003H9.28031V13.4403H6.72031V11.2003H4.48031V8.64031H6.72031V6.40031H9.28031V8.64031H11.5203V11.2003Z"
                  fill="#37ADFF"
                />
              </svg>
              <p>In-Person</p>
            </div>
            <div className="videoconsultation">
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 4.5V1C14 0.45 13.55 0 13 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H13C13.55 12 14 11.55 14 11V7.5L16.29 9.79C16.92 10.42 18 9.97 18 9.08V2.91C18 2.02 16.92 1.57 16.29 2.2L14 4.5ZM10 7H8V9C8 9.55 7.55 10 7 10C6.45 10 6 9.55 6 9V7H4C3.45 7 3 6.55 3 6C3 5.45 3.45 5 4 5H6V3C6 2.45 6.45 2 7 2C7.55 2 8 2.45 8 3V5H10C10.55 5 11 5.45 11 6C11 6.55 10.55 7 10 7Z"
                  fill="#37ADFF"
                />
              </svg>
              <p>Video Consultation</p>{" "}
            </div>
            <div className="onlineprescription">
              <FontAwesomeIcon
                icon={faFilePrescription}
                className="doctor-discription-icon"
              />{" "}
              Online Prescription
            </div>
          </div>
          <div className="doctor-objective">
            {" "}
            {doctorData.aboutMe}
          </div>
        </div>
      </div>
      <div
        className={`doctor-details-header ${
          showAppointmentDropdown ? "moved" : ""
        }`}
      >
        <p className="doctor-details-header-Location" onClick={scrollTOLocation}>Location</p>
        <p className="doctor-details-header-Insurances" onClick={scrollToInsurace}>Insurances</p>
        <p className="doctor-details-header-About" onClick={scrollToAbout}>About Me</p>
        <p className="doctor-details-header-Ratings" onClick={scrollToReviews}>
          Ratings
        </p>
        <p className="doctor-details-header-faq" onClick={scrollToFaq}>
          FAQ’s
        </p>
      </div>
      <div className="location" ref={locationRef}>
      <div
        className={`doctor-appoinment-card-container ${
          showAppointmentDropdown ? "moved" : ""
        }`}
      >
        {doctorData.hospitals?.map((data) => {
          return (
            <div className="doctor-appoinment-card-one">
              <div className="hospital-name-box">
                <img src={hospitalimage} atl="hospital-Name"></img>
                <p className="hospital-name-text">{data.name}</p>
                <p className="hospital-today">Today</p>
                <p className="hospital-time">24 hours open</p>
                <div className="hospital-name-icon">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.49896 8.23127L10.5926 5.1377L11.4765 6.02158L7.49896 9.99908L3.52148 6.02158L4.40537 5.1377L7.49896 8.23127Z"
                      fill="#FF7F50"
                    />
                  </svg>
                </div>
              </div>
              <div className="hospital-charge">
                <div className="hospital-charge-dollar">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 15H9C9 16.08 10.37 17 12 17C13.63 17 15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7C10.37 7 9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z"
                      fill="#9CA6B1"
                    />
                  </svg>
                </div>

                <img
                  src={image}
                  alt="Dollar"
                  className="hospital-charge-ammount"
                ></img>

                <p className="hospital-charge-video">
                  (For Video Consultation){" "}
                </p>
              </div>
              <div className="hospital-name-logo-container">
                <div>
                  <img
                    src={hospitallogo}
                    alt="logo"
                    className="hospital-name-logo"
                  ></img>
                </div>
                <div className="hospital-name-logo-location-container">
                  <p className="hospital-name-logo-location">{`${data.street} ${data.city} ${data.state}`}</p>
                  <p className="call-now">Call Now</p>
                  <p className="get-direction">Get Direction</p>
                </div>
                <button className="hospital-charge-book-appoinment">
                  <p className="hospital-charge-book-appoinment-text">Visit</p>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      <div ref={insuranceRef}>
        <AcceptedInsurances insurance={insurance}/>
      </div>
      <div ref={aboutRef}>
      <AwardsRecognition Awards={doctorData.awards} />
      </div>
      <Languages Languages={doctorData.languages} />
      <Articles  blogs={blogs}/>
      <div ref={reviewRef}>
        <Reviewpage reviews={doctorData.reviews}/>
      </div>

      <div className="faq " ref={faqRef}>
        <h2 className="heading">Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-left">
            <img src={faqimage} alt="faq" className="faq-image-doctor"></img>
            <div className="smile-emoji-container">
              <img src={smilee} alt="smile" className="smile-emoji"></img>
              <p className="people-count-faq">84k+</p>
              <p className="happy-patient">Happy Patients</p>
              <div className="heart-hands-container">
                <img src={hanfheart} alt="welcome" className="hand-heart"></img>
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
