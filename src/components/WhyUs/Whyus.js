import React from "react";
import './WhyUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd,faUserFriends  ,faPills} from '@fortawesome/free-solid-svg-icons';
function Whyus() {
  return (
    <div className="background">
      <p className="lorem"></p>
      <h1 className="why">Why MedxBay?</h1>
      <div className="grid-container">
        <div className="grid-item">
        <FontAwesomeIcon icon={faUserFriends} className="icon-doctor"/>
          <h2>PATIENTS</h2>
          <p>MedXBay simplifies your healthcare experience by connecting you with trusted providers and offering convenient, real-time appointment scheduling. Access telemedicine services and reliable health information from anywhere.  Our platform streamlines your healthcare interactions and information.</p>
        </div>
        <div className="grid-item">
        <FontAwesomeIcon icon={faUserMd}  className="icon-doctor"/>         
         <h2>MEDICAL PROVIDERS</h2>
          <p>MedXBay revolutionizes healthcare management for providers by automating essential operations like scheduling, billing, and patient management. With advanced AI technology and access to the latest medical innovations, we ensure your practice stays competitive and effective.
          </p>
        </div>
        <div className="grid-item">
        <FontAwesomeIcon icon={faPills} className="icon-doctor"/> 
                 <h2>MEDICAL SUPPLIERS</h2>
          <p>MedXBay connects medical providers with an extensive network of suppliers, ensuring access to the latest healthcare innovations and supplies. This seamless integration enhances practice efficiency and elevates patient care, keeping providers at the forefront of the healthcare industry.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Whyus;