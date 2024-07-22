import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { RiSendPlaneFill } from "react-icons/ri";
import brand from '../Assets/brand-logo.png';
import './footerrs.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="custom-footer-container">
        <div className="custom-footer-logo">
        <img className='gwaimage' src={brand} alt="Description of the image"/>

          <div className="custom-footer-socials">
            <div className="custom-social-icon">
              <FaFacebookF />
            </div>
            <div className="custom-social-icon">
              <FaTwitter />
            </div>
            <div className="custom-social-icon">
              <FaInstagram />
            </div>
          </div>
        </div>
        <div className="custom-footer-links">
          <div className="custom-footer-column">
            <h4 className='explore'>Explore</h4>
            <ul>
              <li>Home Page</li>
              <li>About Us</li>
              <li>FAQs</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="custom-footer-column">
            <h4>Legal</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Documentation</li>
              <li>Site Map</li>
            </ul>
          </div>
          <div className="custom-footer-column">
            <h4>Subscribe</h4>
            <p className='para'>Subscribe to get the latest news  from us</p>
            <div className="custom-subscribe-form">
              <input type="email" placeholder="Email Address" />
              <button type="submit">
              <RiSendPlaneFill />
  
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-footer-bottom">
        <p className='rights-reserved'>© 2024 Global Wellness Alliance. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
