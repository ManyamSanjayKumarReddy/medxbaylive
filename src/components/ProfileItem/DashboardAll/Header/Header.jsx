import React from "react";

//imported style.css
import './header.css';

//imported react-icons 
import { SlBell } from "react-icons/sl";


//imported image
import profile from '../Assets/profileimg.png';
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="header-head">
        <div className="home-return">
         <Link to='/' className="text-home-return">Home</Link>
        </div>
        <div className="profile-return">
         <Link to='/Doctor/profile/Edit' className="text-profile-return" >Profile</Link>
        </div>
        <div className="profile-container">
          {/* <div className="icon-container">
            <div className="icon">
              <SlBell />
            </div>
          </div> */}
          <div className="image-container">
            <img src={profile} alt="Profile" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
