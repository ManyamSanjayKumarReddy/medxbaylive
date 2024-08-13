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

import Typed from 'typed.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Provider = ({ show, handleClose,openRegisterModal }) => {
  useEffect(() => {
    import('../login/login.css');
    // import ('../signup/signup.css')
  }, []);
  const navigate = useNavigate();
  const typedElement = useRef('');
  const typedElementTwo = useRef('');

  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

 

  const [emailError, setEmailError] = useState('');



  
  
  const provider = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post('https://beta.medxbay.com/submit-lead', { email, name }, );
       
      } catch (err) {
        console.error('Error during login:', err);
        alert('Login failed. Please try again.');
      }
    }
  };




  const validateForm = () => {
    return   validateEmail(email) && validateName(name);
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
  

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    validateEmail(value);
  };
  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    validateName(value);
  };


  
  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <Modal.Title>
        <span className="model-header-login"></span>{' '}
        <span className="model-header-sub-login"> </span>
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
    
     

     <div className="sign-up-button-container"></div>
        <Form  onSubmit={provider} className="form-overall-container-login">

        <Form.Group className="mb-3" controlId="formEmail">
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

       
       
       


                <Button variant="primary" type="submit" className="btn-custom login-button-home">
             Submit
                </Button>
              
           
          


        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Provider;