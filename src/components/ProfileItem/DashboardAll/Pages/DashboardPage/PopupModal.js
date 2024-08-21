import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PopupModal.css';

const PopupModal = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenPopup');
    const isProfilePage = location.pathname === '/profile';

    if (!hasSeenModal && !isProfilePage) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setShowModal(false);
    localStorage.setItem('hasSeenPopup', 'true');
  };

  const handleSubmit = () => {
    localStorage.setItem('hasSeenPopup', 'true');
    navigate('/Doctor/profile/Edit');
  };

  return (
    showModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="closebtn" onClick={handleClose}>
            &times;
          </button>
          <h1>🛸 Welcome to Medxbay!</h1>
          <p>You’re almost there! 🌟</p>
          <p>Just a few quick details and you’ll unlock your full dashboard.</p>
          <button className="submitbtn" onClick={handleSubmit}>
            Enter Details
          </button>
        </div>
      </div>
    )
  );
};

export default PopupModal;