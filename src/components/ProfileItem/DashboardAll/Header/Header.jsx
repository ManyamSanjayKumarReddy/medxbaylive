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
          <Link to='/edit/profile/doctor' className="text-profile-return" >Edit Profile</Link>
        </div>

        <div className="profile-container">
        <li className="nav-item active ml-md-4" style={{ listStyle: 'none' }}>
    <Link to='/Doctor/profile/Edit'>
      <div className='image-container'>
        <button type="button" className="nav-notification-button">
          <img src={profile} alt="Profile" />
        </button>
      </div>
    </Link>
  </li>
{/*           
          <div className="image-container">
            <img src={profile} alt="Profile" />
          </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
