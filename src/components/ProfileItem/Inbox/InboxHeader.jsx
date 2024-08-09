import React from 'react';
import './InboxHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import profileimg from '../../Assets/profileimg.png';

const Header = ({ doctorName ,image}) => {
  return (
    <div className="header-container">
      <div className="chatProfile">
        <img src={image||profileimg} alt="chatProfile" />
        <div className="chatProfile-name">{doctorName}</div>
      </div>
      <div className="header-actions">
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </div>
  );
};

export default Header;
