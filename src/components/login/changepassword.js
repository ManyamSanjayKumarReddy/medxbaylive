import React, { useState, useEffect, useRef } from 'react';
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

const ChangePassword = () => {
  useEffect(() => {
    import('./login.css');
  }, []);
  const navigate = useNavigate();
  const typedElement = useRef(null);
  const typedElementTwo = useRef(null);

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);



  const validatePassword = (value) => {
    if (value.trim().length < 6) {
      setPasswordError('Password should be at least 6 characters.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setNewPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
    if (value !== newPassword) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword(newPassword) && validatePassword(confirmPassword) && newPassword === confirmPassword) {
      try {
        const res = await axios.post('https://medxbay-deploy-1-431103.uc.r.appspot.com/reset-password', { email });
        if (res.data.success) {
          alert('Password reset email sent successfully.');
          setIsForgotPassword(false);
        } else {
          alert(res.data.message || 'Failed to send reset email. Please try again.');
        }
      } catch (err) {
        console.error('Error during password reset:', err);
        alert('Failed to send reset email. Please try again.');
      }
    } else {
      alert('Please correct the errors in the form.');
    }
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
  }, []);

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
  }, []);

  return (
    <Modal  centered className="custom-modal">
      <Modal.Title>
        <span className="model-header-login">Reset Password</span>{' '}
        <span className="model-header-sub-login"> Change password to your account.</span>
      </Modal.Title>
      <button type="button" className="btn-close-custom" aria-label="Close" >
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
        <Form onSubmit={handleSubmit} className="form-overall-container-login">
          {!isForgotPassword && (
            <>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Password"
                  className="form-control-custom"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  isInvalid={!!passwordError}
                />
                <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your Password"
                  className="form-control-custom"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  isInvalid={!!passwordError}
                />
                <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" className="btn-custom login-button-home">
              Reset Password
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePassword;
