import React from "react";

//imported style.css
import './header.css';

//imported react-icons 
import { SlBell } from "react-icons/sl";
import { RiSearchLine } from "react-icons/ri";

//imported image
import profile from '../Assets/profileimg.png';

const Header = () => {
  return (
    <>
      <header className="header-head">
        <div className="search-bar">
          <input type="text" placeholder="Search for products..." />
          <RiSearchLine className="icon-style" />
        </div>
        <div className="profile-container">
          <div className="icon-container">
            <div className="icon">
              <SlBell />
            </div>
          </div>
          <div className="image-container">
            <img src={profile} alt="Profile" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
