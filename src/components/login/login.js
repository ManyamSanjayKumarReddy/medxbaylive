import React, { useState, useEffect,useRef } from 'react';
// import './login.css';
import { Modal, Button, Form } from 'react-bootstrap';
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
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginCard = ({ show, handleClose }) => {
  useEffect(() => {
    import('./login.css');
  }, []);
  const navigate = useNavigate();
  const typedElement = useRef('');
  const typedElementTwo = useRef('');

  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  
  const [emailError, setEmailError] = useState('');


  const [passwordError, setPasswordError] = useState('');
  const login = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post('http://localhost:8000/auth/login', { email, password }, { withCredentials: true });
        if (res.data.success) {
          const { user } = res.data;
          const { role, _id: userId, email: userEmail, subscriptionType, subscriptionVerification } = user;
  
          // Set default values for subscriptionType and subscriptionVerification if they are undefined
          const userSubscriptionType = subscriptionType || 'none';
          const userSubscriptionVerification = subscriptionVerification || 'not verified';
  
          sessionStorage.setItem('userId', userId);
          sessionStorage.setItem('userEmail', userEmail);
          sessionStorage.setItem('role', role);
          sessionStorage.setItem('loggedIn', 'true');
          sessionStorage.setItem('subscriptionType', userSubscriptionType);
          sessionStorage.setItem('subscriptionVerification', userSubscriptionVerification);
  
          switch (role) {
            case 'doctor':
              navigate('/Doctor/profile/Edit');
              break;
            case 'patient':
              navigate('profile/userprofile/');
              break;
            case 'admin':
              navigate('/admin/admin-home');
              break;
            default:
              alert('Unexpected role.');
              break;
          }
        } else {
          alert(res.data.message || 'Login failed. Please try again.');
        }
      } catch (err) {
        console.error('Error during login:', err);
        alert('Login failed. Please try again.');
      }
    }
  };
  
  
  const forgetPassword = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        const res = await axios.post('http://localhost:8000/auth/forgot-password', { email });
        if (res.data.success) {
          alert('Password reset email sent successfully.');
          setIsForgotPassword(false);
        } else {
          alert(res.data.message || 'Failed to send reset email. Please try again.');
        }
      } catch (err) {
        console.error('Error during password reset:', err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert('Failed to send reset email. Please try again.');
        }
      }
    } else {
      alert('Please enter a valid email address.');
    }
  };




  const validateForm = () => {
    return   validateEmail(email) && validatePassword(password);
  };


  useEffect(() => {
    if (typedElement.current) {
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
    if (typedElementTwo.current) {
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

  const validatePassword = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setPasswordError('Password is required.');
      return false;
    }

    // if (trimmedValue.length < 6) {
    //   setPasswordError('Password should be at least 6 characters.');
    //   return false;
    // }

    setPasswordError('');
    return true;
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    validateEmail(value);
  };
  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    validatePassword(value);
  };


  
  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <Modal.Title>
        <span className="model-header-login">Sign In</span>{' '}
        <span className="model-header-sub-login"> Sign In to your account.</span>
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
    
        <div className='or-sign-up-container-login'>
       
       <div className='or-sign-up'>OR</div>
          <div className='end-line-sign-up'></div>
          <div className='end-line-sign-up-two'>
            <div className='button-sign-up-container'>
            <button className='google-button-sign-up'><img src={google} alt='Google' className='google-sign-up-image'></img></button>
            <button className='apple-button-sign-up'><img src={apple} alt='Apple' className='apple-sign-up-image'></img></button>
            </div>

          </div>
          <div className='login-option-container'>
<div className='account-sign-up'>Don't have an account?</div>

<Link className='login-link-signup-login'>Sign Up</Link>

            </div>
  

     </div>

     <div className="sign-up-button-container"></div>
        <Form onSubmit={isForgotPassword ? forgetPassword : login} className="form-overall-container-login">
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

          {!isForgotPassword && (
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
          )}




          <div className="d-grid gap-2">
            {!isForgotPassword ? (
              <>
                <Button variant="primary" type="submit" className="btn-custom login-button-home">
                  {isForgotPassword ? 'Reset Password' : 'Sign In'}
                </Button>
                {!isForgotPassword && !isForgotPassword && (
                  <Link to="#" onClick={() => setIsForgotPassword(true)} className="forgot-password-login">
                    Forgot Password?
                  </Link>
                )}
              </>
            ) : (
              <>
                <Button variant="primary" type="submit" className="btn-custom login-button-home">
                  Reset Password
                </Button>
                <Link to="#" onClick={() => setIsForgotPassword(false)} className="forgot-password-login">
                  Back to Login
                </Link>
              </>
            )}
          </div>


        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginCard;