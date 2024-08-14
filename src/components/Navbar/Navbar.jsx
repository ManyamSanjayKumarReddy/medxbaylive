import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBell } from '@fortawesome/free-solid-svg-icons';
import SignupCard from '../signup/signup';
import LoginCard from '../login/login';
import brand from '../Assets/medbrand.png';
import Provider from './Provider';

const Navbar = () => {
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [isCorporateDropdownOpen, setCorporateDropdownOpen] = useState(false);
  const [isProvidersDropdownOpen, setProvidersDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

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
    sessionStorage.removeItem('doctorId');
    sessionStorage.removeItem('doctorEmail');
    sessionStorage.removeItem('role');
    setIsLoggedIn(false);
    setIsSignInClicked(false);  // Hide sign-in modal
    setIsRegisterClicked(false); // Hide register modal
    navigate('/'); // Redirect to home or login page after logout
  };

  const handleLogin = (role) => {
    // Assuming login logic is handled here
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('role', role);

    setIsLoggedIn(true);
    setUserRole(role);
    setIsSignInClicked(false);  // Hide sign-in modal
    setIsRegisterClicked(false); // Hide register modal
  };

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
    const role = sessionStorage.getItem('role');
    setIsLoggedIn(loggedIn);
    setUserRole(role);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light navbar-head-style">
          <a className="navbar-brand" href="/"><img src={brand} alt="Brand Logo" height="36px" className='brand-img' /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto nav-ul">
              <li className="nav-item active ml-md-4">
                <Link className="find-doctor nav-link nav-link-style" to="/Filters">Find Doctor</Link>
              </li>
              <li className="nav-item active ml-md-4">
                <Link className="about-nav nav-link nav-link-style " to="#">About</Link>
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
                  <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                </Link>
              </li>
            </ul>
            {!isLoggedIn && (
              <ul className="navbar-nav ml-auto mr-md-2">
                <li className="nav-item ml-md-4">
                  <button type="button" className="btn nav-signin-button" onClick={handleShowLoginPopup}>Sign In</button>
                </li>
                <li className="nav-item ml-md-3">
                  <button type="button" className="btn nav-register-button" onClick={handleShowPopup}>Register</button>
                </li>
              </ul>
            )}
            {isLoggedIn && (
              <ul className="navbar-nav ml-auto mr-md-2">
                {userRole === 'doctor' && (
                  <li className="nav-item active ml-md-4">
                    <Link className="nav-dashbord nav-link nav-link-style" to="/doctorprofile/dashboardpage/">Dashboard</Link>
                  </li>
                )}
                <li className="nav-item ml-md-4">
                  <div className='dashboard-setting-bell'>
                    <button type="button" className="btn nav-notification-button">
                      <FontAwesomeIcon icon={faBell} />
                    </button>
                  </div>
                </li>
               
              </ul>
            )}
          </div>
        </nav>
        {isSignInClicked && (
          <div className="blur-background">
            <LoginCard onClose={handleCloseSignupCard} onSwitchToSignup={handleRegisterClick}
               handleClose={handleCloseLogin} 
               handleLogin={handleLogin} /> 
          </div>
        )}
        {isRegisterClicked && (
          <div className="blur-background">
            <SignupCard onCloseSignupCard={handleCloseLoginCard} onSwitchToLogin={handleSignInClick}
               handleClose={handleCloseRegister} />
          </div>
        )}
      </header>
      <SignupCard show={showPopup} handleClose={handleClosePopup} openLoginModal={handleShowLogin}/>
      <LoginCard show={showLoginPopup} handleClose={handleCloseLoginPopup} openRegisterModal={handleShowRegister} handleLogin={handleLogin}/>
      <Provider show={showProviderModal} handleClose={() => setShowProviderModal(false)} />
    </>
  );
};

export default Navbar;
