import React from 'react';
import './Verifypopup.css';

const Verifypopup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-doctor">
      <div className="modal-content-doctor">
        {children}
        {/* <button className="modal-close-button-doctor" onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

export default Verifypopup;
