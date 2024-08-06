import React from 'react'
import './Dashboard.css';
import  reviewsImg from './Assets/reviewsImg.png';
import consultationimg from './Assets/consultationimg.png';
import { FaUserInjured } from "react-icons/fa6";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import Dashboardprofile from './Assets/dashboardprofile.png';
import Newpatient from './Assets/Newpatient.png';
import surgery from './Assets/Surgery.png';
import experience from './Assets/Experience.png'; 
import Yourincome from './Yourincome';
import BookingRate from './BookingRate';
import Schedule from './Schedule';
import { RiArrowDownSLine } from "react-icons/ri";

const DashboardPage = () => {

  return (
    <div className='main-dashboard-page'>
      <h1>Dashboard</h1>
      <div className='dashboard-scoll-head'>
        <div className="dashboard-gird-layout">

          <div className="insight-patient">
            <div className='dashboard-head-common'>
              <p>My Insights</p>
              <div className="select-container">
                <select className="select-box-common">
                  <option>This month</option>
                </select>
              <RiArrowDownSLine className="arrow-icon-filter" />
              </div> 
            </div>  
            <div className="insight-item">
              <div className="insight-img-container blue-color">
               <img src={Newpatient} className='image-insight'/>
              </div>
              <div className="insight-info">
                <h4>New patient</h4>
                <p>1,500</p>
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-img-container dark-blue-color">
              <img src={surgery}  className='image-insight'/>
              </div>
              <div className="insight-info">
                <h4>Surgery</h4>
                <p>1,000</p>
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-img-container green-color">
              <img src={experience}  className='image-insight'/>
              </div>
              <div className="insight-info">
                <h4>Experience</h4>
                <p>10+ years</p>
              </div>
            </div>
          </div>

          <div className="income-head">
            <Yourincome/>
          </div>

          <div className="profiles-head">
            <img src={Dashboardprofile} className='profiles-imgage'/>
            <h2 className='name-head'>Dr. Jerome Bell</h2>
            <p className='subtitle'>xxxx specialist</p>
            <div className='dashboardprofile-logo'>
              <div className='content-background'>
                <div className='logo-background'>
                  <FaUserInjured className='profiles-icons' size='1.3rem'/>
                </div>
                <p className='logo-name'>Total Patients</p>
                <p className='logo-count'>400 patients</p>
              </div>
              <div className='content-background'>
                <div className='logo-background'>
                  <BsCheckCircleFill className='profiles-icons' size='1.3rem'/>
                </div>
                <p className='logo-name'>Slots</p>
                <p className='logo-count'>20/50</p>
              </div>
              <div className='content-background'>
                <div className='logo-background'>
                  <IoIosMail className='profiles-icons' size='1.5rem' />
                </div>
                <p className='logo-name'>Chat</p>
                <p className='logo-count'>24</p>
              </div>
            </div>
            <div className='button-profiles'>
              <button>View Profile</button>
            </div>
          </div>
          
          <div className="consultation">
            <div className='consultation-coverarea'>
              <div className='consultation-info'>
                <p className='consultation-count'>160+</p>
                <p className='consultation-label'>Consultation</p>
              </div>
              <img src={consultationimg} className='consultation-img' alt="Consultation" />
            </div>
          </div>

          <div className="reviews">
            <div className='reviews-coverarea'>
              <div className='reviews-info'>
                <h2 className='reviews-count'>250+</h2>
                <p className='reviews-label'>Patient's reviews</p>
              </div>
              <img src={reviewsImg} className='reviews-img' alt="Reviews icon"/>
            </div>
          </div>  

          <div className="booking-rate">
            <BookingRate/>
          </div>

          <div className="schedule">
            <Schedule/>
          </div> 

        </div>
      </div>
    </div>
  )
}

export default DashboardPage