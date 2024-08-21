import React, { useState, useEffect } from 'react';
import './sidebar.css';
import { FaHome, FaRegFileAlt, FaBars } from 'react-icons/fa';
import { PiStorefrontBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CgList } from "react-icons/cg";
import { FiX } from 'react-icons/fi';
import { RiInboxLine } from 'react-icons/ri';
import { TbStar } from 'react-icons/tb';
import { PiUserListBold } from "react-icons/pi";
import { ImBlogger2 } from 'react-icons/im';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Link, useLocation ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import brandLogo from '../Assets/brand-logo-2.png';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isVerified, setIsVerified] = useState(false); // Verification status state

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`,{withCredentials:true})
      .then(() => {
        sessionStorage.clear();
        navigate('/'); 
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setActiveItem(location.pathname);
    
    // Fetch the doctor's verification status from sessionStorage or backend
    const verificationStatus = sessionStorage.getItem('verified');
    setIsVerified(verificationStatus === 'Verified');
  }, [location.pathname]);

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="logo-container">
        {isSidebarOpen ? (
          <>
            <img src={brandLogo} alt="Logo" className="logo" />
            <button className="toggle-button" onClick={toggleSidebar}>
              <FaBars />
            </button>
          </>
        ) : (
          <button className="toggle-button" onClick={toggleSidebar}>
            <FiX />
          </button>
        )}
      </div>
      <ul className="sidebar-menu">
       
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/start-dashboard' ? 'active' : ''}`}
          onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/start-dashboard')}
          onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to="/doctorprofile/dashboardpage/start-dashboard" className="menu-link">
            <div className="sidebar-icon"><PiStorefrontBold    size='1.1rem' /></div>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/manage' ? 'active' : ''}`}
           onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/manage')}
           onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to="/doctorprofile/dashboardpage/manage" className="menu-link">
            <div className="sidebar-icon"><CgList /></div>
            <span>My Appointments</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/schedule' ? 'active' : ''}`}
          onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/schedule')}
          onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to="/doctorprofile/dashboardpage/schedule" className="menu-link">
            <div className="sidebar-icon"><FaRegCalendarAlt /></div>
            <span>My schedule</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/patient' ? 'active' : ''}`}
         onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/patient')}
         onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to="/doctorprofile/dashboardpage/patient" className="menu-link">
            <div className="sidebar-icon"><PiUserListBold /></div>
            <span>My Patient</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/inbox' ? 'active' : ''}`}
          onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/inbox')}
          onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to="/doctorprofile/dashboardpage/inbox" className="menu-link">
            <div className="sidebar-icon"><RiInboxLine /></div>
            <span>Inbox</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/reviews' ? 'active' : ''}`}
         onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/reviews')}
         onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to="/doctorprofile/dashboardpage/reviews" className="menu-link">
            <div className="sidebar-icon"><TbStar /></div>
            <span>Reviews</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/blog' ? 'active' : ''}`}
         onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/blog')}
         onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to="/doctorprofile/dashboardpage/blog" className="menu-link">
            <div className="sidebar-icon"><ImBlogger2 /></div>
            <span>Blog</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/Logout' ? 'active' : ''}`}
         onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/Logout')}
         onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to="logout" onClick={handleLogout} className="menu-link">
            <div className="sidebar-icon"><RiLogoutCircleRLine /></div>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
