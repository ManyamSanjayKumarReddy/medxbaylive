import React, { useState } from 'react';

//imported react-router-dom in NavLink using active chnages and Outlet using right side showing profileItem
import { NavLink, Outlet ,useNavigate} from 'react-router-dom';

//style.css
import './profilelayout.css';

//Using image aslo and imported
import profileimg from '../Assets/profileimg.png';

//imported react-icons
import { BsCardHeading } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdOutlineInbox } from "react-icons/md";
import { LiaFileAltSolid } from "react-icons/lia";
import { FaRegStar } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuBell } from "react-icons/lu";
import { TbWorld } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

const languages = [
  { name: 'English', code: 'ENG' },
  { name: 'French', code: 'FRA' },
  { name: 'Spanish', code: 'SPA' },
  { name: 'German', code: 'GER' },
  { name: 'Chinese', code: 'CHN' }
];

const ProfileLayout = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [notificationStatus, setNotificationStatus] = useState('Allow');
  const navigate = useNavigate();
  const handleLanguageChange = (e) => {
    const selectedLang = languages.find(lang => lang.code === e.target.value);
    setSelectedLanguage(selectedLang);
  };

  const handleNotificationChange = (e) => {
    setNotificationStatus(e.target.value);
  };
  const handleLogout = () => {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('role');
    navigate('/'); 
  };
  return (
    <div className='layout-profile'>
      <div className='container'>
        <h1>User Profile</h1>
        <div className="container-profile-head"> 
          <div className="profile-card">
            <div className="profile-content">
              <img src={profileimg} className='profileimg' alt="Profile" />
              <div className='hold-content'>
                <p className="name">Your name</p>
                <p className="email">yourname@gmail.com</p>
              </div>
            </div>
            <nav>
              <ul>
                <li>
                  <NavLink to="manage/appointments" className={({ isActive }) => isActive ? 'active' : ''}>
                    <BsCardHeading size='1.2rem' />
                    <span>Manage Appointments</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="edit/profile" className={({ isActive }) => isActive ? 'active' : ''}>
                    <FiUser size='1.2rem' />
                    <span>My Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="inbox" className={({ isActive }) => isActive ? 'active' : ''}>
                    <MdOutlineInbox size='1.2rem' />
                    <span>Inbox</span>
                    <IoIosArrowForward />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="prescription" className={({ isActive }) => isActive ? 'active' : ''}>
                    <LiaFileAltSolid size='1.2rem' />
                    <span>Prescriptions</span>
                    <IoIosArrowForward />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="reviews" className={({ isActive }) => isActive ? 'active' : ''}>
                    <FaRegStar size='1.2rem' />
                    <span>Reviews</span>
                    <IoIosArrowForward />
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink to="settings" className={({ isActive }) => isActive ? 'active' : ''}>
                    <IoSettingsOutline size='1.2rem' />
                    <span>Settings</span>
                  </NavLink>
                </li> */}
                <li>
                  <NavLink to="notification" className={({ isActive }) => isActive ? 'active' : ''}>
                    <LuBell size='1.2rem' />
                    <span>Notification</span>
                    <select className="dropdown-notification" value={notificationStatus} onChange={handleNotificationChange}>
                      <option value="Allow">Allow</option>
                      <option value="Not Allow">Not Allow</option>
                    </select>
                  </NavLink>
                </li>
                <li>
                  {/* <NavLink to="language" className={({ isActive }) => isActive ? 'active' : ''}>
                    <TbWorld size='1.2rem' />
                    <span>Language</span>
                    <select className="dropdown-language" value={selectedLanguage.code} onChange={handleLanguageChange}>
                      {languages.map((lang, index) => (
                        <option key={index} value={lang.code}>
                          {selectedLanguage.code === lang.code ? lang.code : `${lang.name} `}
                        </option>
                      ))}
                    </select>
                  </NavLink> */}
                </li>
                <li>
                <button onClick={handleLogout} className='logout-button'>
                    <RiLogoutCircleRLine size='1.2rem' />
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className='outlet-content'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;