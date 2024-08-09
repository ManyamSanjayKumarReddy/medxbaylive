import React, { useEffect, useRef, useState } from 'react';
import './nestednavbar.css';
import downarrowimage from '../Assets/dwon.gif';
import Navbar from '../Navbar/Navbar';
import gwatrailer from '../Assets/gwa-trailer.mp4';

const Nestednavbar = () => {
  const [isNestedVisible, setIsNestedVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const arrowSection = document.querySelector('.down-arrow');
      const arrowSectionBottom = arrowSection.getBoundingClientRect().top;

      if (arrowSectionBottom <= 0) {
        setIsNestedVisible(true);
      } else {
        setIsNestedVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const videoPlayer = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoPlayer.classList.add('zoomed');
            videoPlayer.classList.remove('zoomed-out');
          } else {
            videoPlayer.classList.add('zoomed-out');
            videoPlayer.classList.remove('zoomed');
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    observer.observe(videoPlayer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {isNestedVisible && (
        <div className="nested sticky-top">
          <div className="color-style">
            <Navbar />
          </div>
          
          <div className="navbar-back">
            <form>
              <div className="form-control-one">
                <label>What</label>
                <input className="width-input" type="text" placeholder="Search Doctors, providers or conditions" />
              </div>
              <div className="form-control-two">
                <label>Where</label>
                <input type="text" placeholder="United Arab Emirates" />
              </div>
              <button type="submit" className="btn button-color">
                Find My Doctor
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="down-arrow">
        <img src={downarrowimage} className="image-arrow" alt="Map" />
      </div>

      <div className="video-wrapper">
        <div ref={videoRef} className="video-player zoomed-out">
          <video loop autoPlay muted controls className="video">
            <source src={gwatrailer} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
};

export default Nestednavbar;
