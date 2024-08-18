import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import './signup.css';
import schedule from '../Assets/schedule.svg'
import meds from '../../assests/img/meds.svg';
import stethoscope from '../../assests/img/stethoscope.svg';
import scheduletwo from '../../assests/img/schedule-two.svg';
import doctorconsultation from '../Assets/doctorconsultation .svg';
import medicalexamsvg from '../Assets/medicalexamsvg.svg';
import heartbeat from '../Assets/heartbeat.svg';
import brand from '../Assets/medbrand.png'
import curvedesign from '../../assests/img/curvedesign.svg'
import curvedsigntwo from '../../assests/img/curvedsigntwo.svg';
import google from '../../assests/img/google.png'
import apple from '../../assests/img/apple.png'
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupCard = ({ show, handleClose,openLoginModal }) => {
  useEffect(() => {
    import('./signup.css');
  }, []);
  const [isLoading, setIsLoading] = useState(false); 

  const typedElement = useRef(null);
  const typedElementTwo = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (typedElement.current && show) {
      const options = {
        strings: ['Greetings! 👋 Book your visit <br>today. 📅'],
        typeSpeed: 50,
        backSpeed: 50,
        showCursor: false,
      };
  
      const typed = new Typed(typedElement.current, options);
  
      return () => {
        typed.destroy();
      };
    }
  }, [show]);
  
  
  useEffect(() => {
    if (typedElementTwo.current && show) {
      const optionsTwo = {
        strings: ['Hey! 😊 Hope you\'re well! 🌟'],
        typeSpeed: 50,
        backSpeed: 50,
        showCursor: false,
      };
  
      const typedTwo = new Typed(typedElementTwo.current, optionsTwo);
  
      return () => {
        typedTwo.destroy();
      };
    }
  }, [show]);
  

  const handleGoogleSignIn = (role) => {
    setIsLoading(true);
    const url = role === 'patient'
      ? `${process.env.REACT_APP_BASE_URL}/auth/google/patient?state=${JSON.stringify({ role })}`
      : `${process.env.REACT_APP_BASE_URL}/auth/google/doctor?state=${JSON.stringify({ role })}`;
  
    window.location.href = url;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    const name = urlParams.get('name');
    const id = urlParams.get('id');
    const email = urlParams.get('email');
    const userSubscriptionType = urlParams.get('userSubscriptionType');
    const userSubscriptionVerification = urlParams.get('userSubscriptionVerification');
  
    console.log('Role:', role);
    console.log('Name:', name);
    console.log('ID:', id);
    console.log('Email:', email);
    console.log('Subscription Type:', userSubscriptionType);
    console.log('Subscription Verification:', userSubscriptionVerification);
  
    if (role && name && id) {
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userName', name);
      sessionStorage.setItem('userId', id);
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('subscriptionType', userSubscriptionType);
      sessionStorage.setItem('subscriptionVerification', userSubscriptionVerification);
      
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  


  const register = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    const user = { name, email, mobile, password };
    const endpoint = isProvider 
      ? `${process.env.REACT_APP_BASE_URL}/auth/signup/doctor`
      : `${process.env.REACT_APP_BASE_URL}/auth/signup/patient`;
  
    if (validateForm()) {
      try {
        const res = await axios.post(endpoint, user);
        console.log(res.data);
        toast.success("Registration successful! Please check your email and verify.", {
          position: "top-center"
        });
        

        setName('');
        setEmail('');
        setMobile('');
        setPassword('');
        handleClose(); 
      } catch (err) {
        console.error("Error during registration:", err);
        if (err.response) {
          if (err.response.status === 400 && err.response.data.error) {
            if (err.response.data.error.includes("User already exists")) {
              toast.error("User already exists. Please use a different email.", {
                position: "top-center"
              });
            } else {
              toast.error(err.response.data.error, {
                position: "top-center"
              });
            }
          } else {
            toast.error("Registration failed. Please try again.", {
              position: "top-center"
            });
          }
        } else {
          toast.error("Registration failed. Please try again.", {
            position: "top-center"
          });
        }
      } finally {
        setIsSubmitting(false);  
      }
    } else {
      setIsSubmitting(false);  
    }
  };
  
  
  const [isProvider, setIsProvider] = useState(false);

  const validateForm = () => {
    return validateName(name) && validateEmail(email) && validateMobile(mobile) && validatePassword(password);
  };

  const handleProviderClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsProvider(true);
      setIsLoading(false);
    }, 500); 
  };

  const handlePatientClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsProvider(false);
      setIsLoading(false);
    }, 500);
  };


  const validateName = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setNameError('Name is required.');
      return false;
    }

    if (trimmedValue[0] === ' ') {
      setNameError('Name should not start with a space.');
      return false;
    }

    if (!/^[a-zA-Z ]+$/.test(trimmedValue)) {
      setNameError('Name should only contain alphabets and spaces.');
      return false;
    }

    if (trimmedValue.includes('  ')) {
      setNameError('Name should not have more than 2 consecutive spaces.');
      return false;
    }

    if (trimmedValue.length < 3 || trimmedValue.length > 50) {
      setNameError('Name should be between 3 to 50 characters.');
      return false;
    }

    setNameError('');
    return true;
  };

  const validateEmail = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setEmailError('Email is required.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedValue)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }

    setEmailError('');
    return true;
  };

  const validateMobile = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setMobileError('Mobile number is required.');
      return false;
    }

    // if (!/^\d{10}$/.test(trimmedValue)) {
    //   setMobileError('Please enter a valid 10-digit mobile number.');
    //   return false;
    // }

    setMobileError('');
    return true;
  };

  const validatePassword = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setPasswordError('Password is required.');
      return false;
    }

    if (trimmedValue.length < 6) {
      setPasswordError('Password should be at least 6 characters.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    validateEmail(value);
  };

  const handleMobileChange = (event) => {
    const { value } = event.target;
    setMobile(value);
    validateMobile(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    validatePassword(value);
  };

  

  return (
    <>
   
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
    <ToastContainer />
      <Modal.Title>
        <span className="model-header">Sign up</span>{' '}
        <span className="model-header-sub"> Sign up as {isProvider ? 'Provider' : 'Patient'}</span>
      </Modal.Title>
      <button type="button" className="btn-close-custom" aria-label="Close" onClick={handleClose}>
        x
      </button>
      <Modal.Body>
        <div className="smile-emoji">
   
          <img src={brand} alt="logo" className="brand-image-logo" />
          <div className="emoji-ring">😇</div>
          <div className="calender-emoji-container">
            <img src={schedule} alt="meds" className="calender-emoji" />
          </div>
          <img src={meds} alt="meds" className="band-aid-emoji" />
          <img src={stethoscope} alt="meds" className="stethoscope-emoji" />
          <img src={scheduletwo} alt="meds" className="scheduletwo-emoji" />
          <img src={doctorconsultation} alt="meds" className="consultation-emoji" />
          <img src={medicalexamsvg} alt="meds" className="medicalexam-emoji" />
          <div className="hand-emoji">👋</div>
          <img src={heartbeat} alt="meds" className="heartbeat-emoji" />
          <div>
            <img src={curvedsigntwo} alt="meds" className="curvedsigntwo" />
            <p className="running-text-two">
              <span ref={typedElement}></span>
            </p>
          </div>
          <img src={curvedesign} alt="meds" className="curvedesign" />
          <p className="running-text">
            <span ref={typedElementTwo}></span>
          </p>
      
        </div>
        {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      ) : (
        <>
        <div className='or-sign-up-container'>
       
       <div className='or-sign-up'>OR</div>
          <div className='end-line-sign-up'></div>
          <div className='end-line-sign-up-two'>
            <div className='button-sign-up-container'>
            <button className='google-button-sign-up'>                 
               <img src={google} alt="Google" onClick={() => handleGoogleSignIn(isProvider ? 'doctor' : 'patient')} className="social-sign-up" />
            </button>
            <button className='apple-button-sign-up'><img src={apple} alt='Apple' className='apple-sign-up-image'></img></button>
            </div>

          </div>
          <div className='login-option-container'>
<div className='account-sign-up'>Have an account?</div>

<Link className='login-link-signup' to="#" onClick={() => {
              handleClose(); // Close the login modal
              openLoginModal(); // Open the registration modal
            }}>
                Sign In
                </Link>

            </div>
            <div className='provider-option-container'>
              
              <div className="account-sign-up-provider">
                {isProvider ? 'Are you a patient?' : 'Are you a provider?'}
              </div>
              <button
                className="provider-link-signup"
                onClick={isProvider ? handlePatientClick : handleProviderClick}
              >
                {isProvider ? 'Sign Up Here' : 'Sign Up here'}
              </button>
            </div>
          </div>


     <div className='sign-up-button-container'></div>
        <Form onSubmit={register} className="form-overall-container">
        <Form.Group className={`form-container ${!isProvider ? 'form-container-visible' : 'form-container-hidden'}`}>
        <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Name"
              className="form-control-custom"
              value={name}
              onChange={handleNameChange}
              isInvalid={!!nameError}
            />
            <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              className="form-control-custom"
              value={email}
              onChange={handleEmailChange}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Mobile Number"
              className="form-control-custom"
              value={mobile}
              onChange={handleMobileChange}
              isInvalid={!!mobileError}
            />
            <Form.Control.Feedback type="invalid">{mobileError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your Password"
              className="form-control-custom"
              value={password}
              onChange={handlePasswordChange}
              isInvalid={!!passwordError}
            />
            <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
          </Form.Group>

          <Button
              variant="primary"
              type="submit"
              className="btn-custom" 
              disabled={isSubmitting}  
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Form>
        </>
      )}
      </Modal.Body>
    </Modal>
    </>
  );
};

export default SignupCard;
