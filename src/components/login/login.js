import React, { useState, useEffect,useRef } from 'react';
import './login.css';
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
import { Link } from 'react-router-dom';

const LoginCard = ({ show, handleClose }) => {
  const typedElement = useRef('');
  const typedElementTwo = useRef('');

  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');


  const [emailError, setEmailError] = useState('');

  const [passwordError, setPasswordError] = useState('');

  
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

    if (trimmedValue.length < 6) {
      setPasswordError('Password should be at least 6 characters.');
      return false;
    }

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
  const handleSubmit = async (event) => {
    event.preventDefault();


    const isEmailValid = validateEmail(email);
  
    const isPasswordValid = validatePassword(password);


    if (  !isEmailValid  || !isPasswordValid ) {
      return;
    }

    const formData = {

      email: email,

      password: password,
 
    };

    try {
      const response = await fetch('https://medxbay.com/form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.message) {
        alert(result.message);
      } else {
        console.log(result);
      }

      handleClose();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <Modal.Title>
        <span className="model-header-login">Sign In</span>{' '}
        <span className="model-header-sub-login"> Sign up to your account.</span>
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
        <div className='text-sign-up'>Yes, We Care!<br></br>
        Your Wellness, Our Mission</div>
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

<Link className='login-link-signup-login'>Sign In</Link>

            </div>
            <div className='provider-option-container'>
<div className='account-sign-up-provider'>Are you a provider?</div>

<button className='provider-link-signup'>Sign In Here</button>

            </div>

     </div>

     <div className='sign-up-button-container'></div>
        <Form onSubmit={handleSubmit} className="form-overall-container-login">
   

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


          <Button variant="primary" type="submit" className="btn-custom">
Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginCard;