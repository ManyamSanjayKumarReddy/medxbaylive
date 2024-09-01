import './header.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import profilePlaceholder from '../Assets/profileimg.png'; 

const Header = () => {
  const [profileImage, setProfileImage] = useState(profilePlaceholder);
  const [verified, setVerified] = useState(false); 
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const UserRole = sessionStorage.getItem('role');
    setUserRole(UserRole);

    if (UserRole === 'doctor') {
      const fetchDoctorDetails = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`,
            { withCredentials: true }
          );
          const doctorData = response.data;

          if (doctorData.doctor.verified === 'Verified') {
            setVerified(true);
          } else {
            setVerified(false);
          }

          if (doctorData.doctor.profilePicture && doctorData.doctor.profilePicture.data) {
            const profileImageData = `data:${doctorData.doctor.profilePicture.contentType};base64,${doctorData.doctor.profilePicture.data}`;
            setProfileImage(profileImageData);
          } else {
            setProfileImage(profilePlaceholder); 
          }
        } catch (error) {
          console.error("Error fetching doctor details:", error);
          setProfileImage(profilePlaceholder); 
        }
      };

      fetchDoctorDetails();
    }
  }, []);

  return (
    <>
      <header className="header-head">
        <div className="home-return">
          <Link to='/' className="text-home-return">Home</Link>
        </div>
        <div className="profile-return">
          <Link to='/edit/profile/doctor' className="text-profile-return">Edit Profile</Link>
        </div>
        {userRole === 'doctor' && verified && (
          <div className="profile-return">
            <Link className="text-profile-return" to="/SubscriptionPlans">Upgrade</Link>
          </div>
        )}
        <div className="profile-container">
          <li className="nav-item active ml-md-4" style={{ listStyle: 'none' }}>
            <Link to='/Doctor/profile/Edit'>
              <div className='image-container'>
                <button type="button" className="nav-notification-button">
                  <img src={profileImage} alt="Profile" />
                </button>
              </div>
            </Link>
          </li>
        </div>
      </header>
    </>
  );
};

export default Header;
