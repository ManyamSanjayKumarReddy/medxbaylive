import React, { useEffect, useState, useRef } from "react";

import "./doctoredit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faPlus, faUserMd } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { MdVerified } from 'react-icons/md'; 
// import Articles from "../ArticleEdit/ArticleEdit";
import Languages from "../LanguagesEdit/LanguageEdit";

import AcceptedInsurances from "../InsuranceEdit/InsuranceEdit";
import "../FaqEdit/FAQEdit.css";
import smilee from "../../assests/img/smilee.svg";
import hospitalimage from "../../assests/img/Image.svg";
import image from "../../assests/img/Image.png";
import hospitallogo from "../../assests/img/hospitallogo.png";
import faqimage from "../../assests/img/faqimage.png";
import hanfheart from "../../assests/img/handheart.svg";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import profileImage from "../Assets/profileimg.png";

function DoctorEdit() {
  const [doctor, setDoctor] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [ setBlogs] = useState([]);

  const [showEditPopup, setShowEditPopup] = useState(false);
  // const [isEditClicked, setIsEditClicked] = useState(false);
  const navigate = useNavigate();
  const handleShowEditPopup = () => setShowEditPopup(true);
  const handleCloseEditPopup = () => setShowEditPopup(false);

  const handleInsuranceChange = (event) => {
    setSelectedInsurancePlace(event.target.value);
  };
  const [selectedInsurance, setSelectedInsurancePlace] = useState("");

  const [profileimg, setProfileimage] = useState("");

 

  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    setSelected(selected === i ? null : i);
  };

  const handleShowEdit= () =>{
    navigate('/edit/profile/doctor'); 
  }

  useEffect(() => {
    document.title = "Doctor-Edit";

    fetchDoctorDetails();
  }, []);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`,
        { withCredentials: true }
      );
      const doctorData = response.data;

      console.log(doctorData);
      if (doctorData.doctor.dateOfBirth) {
        const date = new Date(doctorData.doctor.dateOfBirth);
        const formattedDate = `${String(date.getDate()).padStart(
          2,
          "0"
        )}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${date.getFullYear()}`;
        doctorData.doctor.dateOfBirth = formattedDate;
      }
      var formData = doctorData.doctor
      const profileImageData = formData?.profilePicture
      ? `data:image/jpeg;base64,${formData.profilePicture.data}` 
      : profileImage;
      setProfileimage(profileImageData)
      setDoctor(doctorData.doctor);
      setInsurance(doctorData.insurances);
      setBlogs(doctorData.blogs);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  const faqRef = useRef(null);

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
    <>
      <div className="doctor-profile-edit">
        <div className="doctor-profile-edit-container">
          <div className="doctor-profile-edit-img">
            <img
              src={profileimg}
              alt="Doctor-edit"
              className="doctor-edit-profile-photo"
            ></img>
          </div>
          <div className="doctor-details-edit">
          <div className='edit-left'>

            <div className="doctor-edit-name">
              {doctor ? doctor.name : "Loading..."}
       {doctor.verified === 'Verified' && (
   

   <span className="blue-tick"> <MdVerified style={{ color: '#1DA1F2' }} /></span>


        )}
            </div>

            <div className="edit-profile-degree">
              {doctor ? doctor.title : "Loading..."}
            </div>
            <div className="edit-profile-discription">
              {doctor ? doctor.aboutMe : "Loading..."}
            </div>
            </div>
            <div className='edit-right'>
            <div className="date-location-edit-container">
              <div className="doctor-edit-calender">
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.916748 25.7087C0.916748 28.1878 2.81258 30.0837 5.29175 30.0837H25.7084C28.1876 30.0837 30.0834 28.1878 30.0834 25.7087V14.042H0.916748V25.7087ZM25.7084 3.83366H22.7917V2.37533C22.7917 1.50033 22.2084 0.916992 21.3334 0.916992C20.4584 0.916992 19.8751 1.50033 19.8751 2.37533V3.83366H11.1251V2.37533C11.1251 1.50033 10.5417 0.916992 9.66675 0.916992C8.79175 0.916992 8.20841 1.50033 8.20841 2.37533V3.83366H5.29175C2.81258 3.83366 0.916748 5.72949 0.916748 8.20866V11.1253H30.0834V8.20866C30.0834 5.72949 28.1876 3.83366 25.7084 3.83366Z"
                    fill="#0167FF"
                  />
                </svg>
              </div>
              <div className="edit-profile-date">
                {doctor ? doctor.dateOfBirth : "Loading..."}
              </div>
              <div className="date-edit-vector"></div>
              <div className="doctor-edit-location">
                <svg
                  width="21"
                  height="31"
                  viewBox="0 0 21 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5001 14.7712C9.53315 14.7712 8.60581 14.387 7.92209 13.7033C7.23836 13.0196 6.85425 12.0923 6.85425 11.1253C6.85425 10.1584 7.23836 9.23106 7.92209 8.54733C8.60581 7.86361 9.53315 7.47949 10.5001 7.47949C11.467 7.47949 12.3943 7.86361 13.0781 8.54733C13.7618 9.23106 14.1459 10.1584 14.1459 11.1253C14.1459 11.6041 14.0516 12.0782 13.8684 12.5205C13.6852 12.9629 13.4166 13.3648 13.0781 13.7033C12.7395 14.0419 12.3376 14.3104 11.8953 14.4936C11.4529 14.6769 10.9789 14.7712 10.5001 14.7712ZM10.5001 0.916992C7.79266 0.916992 5.19613 1.99251 3.2817 3.90694C1.36727 5.82138 0.291748 8.41791 0.291748 11.1253C0.291748 18.7816 10.5001 30.0837 10.5001 30.0837C10.5001 30.0837 20.7084 18.7816 20.7084 11.1253C20.7084 8.41791 19.6329 5.82138 17.7185 3.90694C15.804 1.99251 13.2075 0.916992 10.5001 0.916992Z"
                    fill="#0167FF"
                  />
                </svg>
              </div>
              <div className="doctor-edit-location-text">
                {" "}
                {doctor ? doctor.city : "Loading..."}
              </div>
            </div>
    
            <div className="speciality-container">
              <div className="award-logo-container">
                <FontAwesomeIcon icon={faAward} className="award-logo" />
              </div>
              <div className="edit-profile-Heart-Specialist">
                {doctor ? doctor.speciality : "Loading..."}
              </div>
            </div>
            <div className="edit-profile-disease-container">
  <div className="plus-icon-container">
    <FontAwesomeIcon icon={faPlus} className="plus-icon" />
  </div>
  <div className="edit-profile-disease">
    {doctor
      ? doctor.conditions && doctor.conditions.length > 0
        ? doctor.conditions.map((condition, index) => (
            <React.Fragment key={index}>
              <span className="condition-item">{condition}</span>
              {index < doctor.conditions.length - 1 && (
                <span className="date-edit-vector-two"></span> 
              )}
            </React.Fragment>
          ))
        : "No conditions available"
      : "Loading..."}
  </div>
</div>

      
            <div className="video-consult-container">
              <div className="edit-person-icon">
                <FontAwesomeIcon icon={faUserMd} className="faUserMd-icon" />
              </div>
              <div className="video-consult-text">
                {doctor ? doctor.consultation : "Loading..."}
              </div>
            </div>
            <div className="social-links-container">
              <div className="faEnvelope">
                <a
                  href={doctor ? doctor.linkedin : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="faEnvelope-icon"
                  />
                </a>
              </div>
              <div className="faFacebooks">
                <a
                  href={doctor ? doctor.facebook : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="faFacebooks-icon"
                  />
                </a>
              </div>
              <div className="faTwitter">
                <a
                  href={doctor ? doctor.twitter : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="faTwitter-icon"
                  />
                </a>
              </div>
              <div className="faInstagram">
                <a
                  href={doctor ? doctor.instagram : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="faInstagram-icon"
                  />
                </a>
              </div>
            </div>
            <button
              className="edit-doctor-button"
              onClick={handleShowEdit}
            >
              Edit profile
            </button>
          </div>
        </div>
        </div>
        <div className="Locations-edit-doc-profile">Locations</div>
        <div className={`doctor-appoinment-card-container-edit `}>
          {doctor.hospitals?.map((data) =>{
            return(
          <div className="doctor-appoinment-card-one-edit">
            <div className="hospital-name-box">
              <img src={hospitalimage} atl="hospital"></img>
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

              <p className="hospital-charge-video">(For Video Consultation) </p>
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
                <p className="hospital-name-logo-location">
                    {`${data.street} ${data.city} ${data.state}`}
                </p>
                <p className="call-now">Call Now</p>
                <p className="get-direction">Get Direction</p>
              </div>
              <button className="hospital-charge-book-appoinment">
                <p className="hospital-charge-book-appoinment-text">
                  Visit 
                </p>
              </button>
            </div>
          </div>
          )
          })}
        </div>
        <AcceptedInsurances insurance={insurance} />
        <Languages Languages={doctor.languages}/>
        {/* <Articles blogs={blogs}/> */}

        <div className="faq " ref={faqRef}>
          <h2 className="heading">Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq-left">
              <img src={faqimage} alt="faq" className="faq-image-doctor"></img>
              <div className="smile-emoji-container">
                <img src={smilee} alt="smile" className="smile-emoji-faq-edit"></img>
                <p className="people-count-faq">84k+</p>
                <p className="happy-patient">Happy Patients</p>
                <div className="heart-hands-container">
                  <img
                    src={hanfheart}
                    alt="welcome"
                    className="hand-heart"
                  ></img>
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
    </>
  );
}

export default DoctorEdit;