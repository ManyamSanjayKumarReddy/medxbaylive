import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SlBell } from "react-icons/sl";
import { RiLogoutCircleRLine } from "react-icons/ri";
import profilePlaceholder from '../Assets/profileimg.png'; 
import SignupCard from '../signup/signup';
import LoginCard from '../login/login';
import brand from '../Assets/medbrand.png';
import Provider from './Provider';
import axios from 'axios';

const Navbar = () => {
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [isCorporateDropdownOpen, setCorporateDropdownOpen] = useState(false);
  const [isProvidersDropdownOpen, setProvidersDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [profileImage, setProfileImage] = useState(profilePlaceholder); 
  const [verified, setVerified] = useState(false); 
  const navigate = useNavigate();
  const corporateDropdownRef = useRef(null);
  const providersDropdownRef = useRef(null);

  const toggleCorporateDropdown = () => setCorporateDropdownOpen(!isCorporateDropdownOpen);
  const toggleProvidersDropdown = () => setProvidersDropdownOpen(!isProvidersDropdownOpen);

  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleShowLoginPopup = () => setShowLoginPopup(true);
  const handleCloseLoginPopup = () => setShowLoginPopup(false);
  const handleShowPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleCloseRegister = () => setShowPopup(false);
  const handleShowRegister = () => setShowPopup(true);

  const handleShowLogin = () => setShowLoginPopup(true);
  const handleCloseLogin = () => setShowLoginPopup(false);

  const handleClickOutside = (event) => {
    if (corporateDropdownRef.current && !corporateDropdownRef.current.contains(event.target)) {
      setCorporateDropdownOpen(false);
    }
    if (providersDropdownRef.current && !providersDropdownRef.current.contains(event.target)) {
      setProvidersDropdownOpen(false);
    }
  };

  const [showProviderModal, setShowProviderModal] = useState(false);

  const toggleProviderModal = () => setShowProviderModal(!showProviderModal);

  const handleSignInClick = () => {
    setIsSignInClicked(true);
    setIsRegisterClicked(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterClicked(true);
    setIsSignInClicked(false);
  };

  const handleCloseSignupCard = () => {
    setIsSignInClicked(false);
  };

  const handleCloseLoginCard = () => {
    setIsRegisterClicked(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('subscriptionVerification');
    sessionStorage.removeItem('subscriptionType');

    setIsLoggedIn(false);
    setUserRole('');
    setProfileImage(profilePlaceholder); 
    navigate('/'); 

    window.location.reload();  
  };

  const handleLogin = (role) => {
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('role', role);

    setIsLoggedIn(true);
    setUserRole(role);
    setIsSignInClicked(false); 
    setIsRegisterClicked(false); 
    handleCloseLoginPopup(); 
    handleClosePopup(); 
  };

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const role = sessionStorage.getItem('role');
        const apiUrl = role === 'doctor' 
          ? `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`
          : `${process.env.REACT_APP_BASE_URL}/patient/profile`; 

        const response = await axios.get(apiUrl, { withCredentials: true });
        const userData = response.data;

        if (userData) {
          if (role === 'doctor') {
            setVerified(userData.doctor.verified === 'Verified');
            if (userData.doctor.profilePicture) {
              const profileImageData = `data:${userData.doctor.profilePicture.contentType};base64,${userData.doctor.profilePicture.data}`;
              setProfileImage(profileImageData);
            } else {
              setProfileImage(profilePlaceholder);
            }
          } else {
            if (userData.patient.profilePicture) {
              const profileImageData = `data:${userData.patient.profilePicture.contentType};base64,${userData.patient.profilePicture.data}`;
              setProfileImage(profileImageData);
            } else {
              setProfileImage(profilePlaceholder);
            }
          }
        } else {
          setProfileImage(profilePlaceholder);
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
        setProfileImage(profilePlaceholder);
      }
    };

    fetchProfileDetails();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
    const role = sessionStorage.getItem('role');
    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, []); 

  const navbarClass = userRole === 'doctor' ? 'navbar navbar-expand-lg navbar-light navbar-doctor' : 'navbar navbar-expand-lg navbar-light navbar-default';

  return (
    <>
      <header>
        <nav className={navbarClass}>
          <a className="navbar-brand" href="/"><img src={brand} alt="Brand Logo" className='brand-img' /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {userRole !== 'doctor' && (
                <li className="nav-item active ml-md-4">
                  <Link className="find-doctor nav-link nav-link-style" to="/Filters">Find Provider</Link>
                </li>
              )}

              <li className="nav-item active ml-md-4">
                <Link className="about-nav nav-link nav-link-style" to="#">About</Link>
              </li>
              <li className="nav-item dropdown active ml-md-4" ref={corporateDropdownRef}>
                <Link 
                  className="for-corporates nav-link nav-link-style dropdown-toggle" 
                  to="#" 
                  role="button" 
                  onClick={toggleProviderModal}
                >
                  For Corporates
                  <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                </Link>
              </li>
              <li className="nav-item dropdown active ml-md-4" ref={providersDropdownRef}>
                <Link 
                  className="for-providers nav-link nav-link-style dropdown-toggle" 
                  to="https://mxb-providerslaunch.zoholandingpage.com/zoho-marketing-automation-workspace/Prelaunch%20-%20Providers/" 
                  role="button" 
                  onClick={toggleProvidersDropdown}
                >
                  For Providers
                  <FontAwesomeIcon icon={faChevronDown} className="ml-2"/>
                </Link>
              </li>
              <li className="nav-item active ml-md-1">
                <Link className="find-doctor nav-link nav-link-style" to="/blogs">Blog</Link>
              </li>
            </ul>

            {!isLoggedIn ? (
              <ul className="navbar-nav ml-auto mr-md-2">
                <li className="nav-item ml-md-4">
                  <button type="button" className="nav-signin-button" onClick={handleShowLoginPopup}>Sign In</button>
                </li>
                <li className="nav-item ml-md-3">
                  <button type="button" className="nav-register-button" onClick={handleShowPopup}>Register</button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto mr-md-2">
                {userRole === 'doctor' && (
                  <li className="nav-item active ml-md-4">
                    <Link className="nav-link dashboard-text-button" to="/doctorprofile/dashboardpage/">Dashboard</Link>
                  </li>
                )}

                {userRole === 'doctor' && verified && (
                  <li className="nav-item active ml-md-4">
                    <Link className="nav-link dashboard-text-button" to="/SubscriptionPlans">Upgrade</Link>
                  </li>
                )}

                {userRole === 'doctor' && (
                  <li className="nav-item active ml-md-4">
                    <Link to='/Doctor/profile/Edit'>
                      <div className='image-container'>
                        <button type="button" className="nav-notification-button">
                          <img src={profileImage} alt="Profile" />
                        </button>
                      </div>
                    </Link>
                  </li>
                )}

                {isLoggedIn && userRole !== 'doctor' && (
                  <li className="nav-item ml-md-4">
                    <Link to='/profile/userprofile/notification'>
                      <div className='dashboard-setting-bell'>
                        <button type="button" className="nav-notification-button">
                          <SlBell className='notification-icon'/>
                        </button>
                      </div>
                    </Link>
                  </li>
                )}

                {isLoggedIn && userRole !== 'doctor' && (
                  <li className="nav-item ml-md-4">
                    <Link to='/profile/userprofile/'>
                      <div className='image-container'>
                        <button type="button" className="nav-notification-button">
                          <img src={profileImage} alt="Profile" />
                        </button>
                      </div>
                    </Link>
                  </li>
                )}

                <li className="nav-item ml-md-4">
                  <div className='logout-container-button'>
                    <button className='logout-button' onClick={handleLogout}><RiLogoutCircleRLine size='1.1rem' /></button>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </nav>
        {isSignInClicked && (
          <div className="blur-background">
            <LoginCard 
              onClose={handleCloseSignupCard} 
              onSwitchToSignup={handleRegisterClick}
              handleClose={handleCloseLogin} 
              handleLogin={handleLogin} 
            /> 
          </div>
        )}
        {isRegisterClicked && (
          <div className="blur-background">
            <SignupCard 
              onCloseSignupCard={handleCloseLoginCard} 
              onSwitchToLogin={handleSignInClick}
              handleClose={handleCloseRegister} 
            />
          </div>
        )}
      </header>
      <SignupCard show={showPopup} handleClose={handleClosePopup} openLoginModal={handleShowLogin}/>
      <LoginCard 
        show={showLoginPopup} 
        handleClose={handleCloseLoginPopup} 
        openRegisterModal={handleShowRegister} 
        handleLogin={handleLogin}
      />
      <Provider show={showProviderModal} handleClose={() => setShowProviderModal(false)} />
    </>
  );
};

export default Navbar;
