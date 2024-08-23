import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import  reviewsImg from './Assets/reviewsImg.png';
import consultationimg from './Assets/consultationimg.png';
import { FaUserInjured } from "react-icons/fa6";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";

import Newpatient from './Assets/Newpatient.png';

import Yourincome from './Yourincome';
import BookingRate from './BookingRate';
import Schedule from './Schedule';

import { CiClock2 } from "react-icons/ci";
import { RiListView } from "react-icons/ri";
import axios from 'axios';
import profileImage from "../../Assets/profileimg.png";

const bufferToBase64 = (buffer) => {
  if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
    const bytes = new Uint8Array(buffer.data);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/jpeg;base64,${btoa(binary)}`;
  } else {
    console.error('Unexpected buffer type:', typeof buffer);
    return '';
  }
};

const DashboardPage = () => {
  const [timePeriod, setTimePeriod] = useState('This Month');
  const [data,setData]=useState([])
  const [booking,setBooking]=useState([])
  const [doctor,setDoctor]=useState([])
  const [slots,setSlots]=useState([])

  const getProfileImage = (formData) => {
  
    if (formData?.data?.type === 'Buffer') {
      return bufferToBase64(formData.data);
    } else if (typeof formData?.data === 'string') {
      return `data:image/jpeg;base64,${formData.data}`;
    } else {
      return profileImage;
    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/doctor/insights`, { withCredentials: true })
      .then(response => {
        console.log(response.data)
        setData(response.data);
        setBooking(response.data.bookingRates)
        setDoctor(response.data.doctor)
        setSlots(response.data.bookings)
      })
      .catch(error => {
        console.error('There was an error fetching the bookings!', error.message);
        setData([]); // Set an empty array on error
      });
  }, []);
  // Dummy data for different time periods
  const insightsData = {
    'This Month': {
      newPatients: '1,500+',
      pendingRequests: '1,000+',
      appointments: '200+',
    },
    'This Week': {
      newPatients: '500+',
      pendingRequests: '300+',
      appointments: '50+',
    },
    'This Year': {
      newPatients: '18,000+',
      pendingRequests: '12,000+',
      appointments: '2,400+',
    },
  };
  return (
    <div className='main-dashboard-page'>
      <h1>Dashboard</h1>
      <div className='dashboard-scoll-head'>
        <div className="dashboard-gird-layout">

          <div className="insight-patient">
            <div className='dashboard-head-common'>
              <p>My Insights</p>
              {/* <div className="select-container">
                <select
                  className="select-box-common"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                >
                  <option value="This Month">This Month</option>
                  <option value="This Week">This Week</option>
                  <option value="This Year">This Year</option>
                </select>
                <RiArrowDownSLine className="arrow-icon-filter" />
              </div> */}
            </div>

            <div className="insight-item">
              <div className="insight-img-container blue-color">
                <img src={Newpatient} alt="New Patients" className='image-insight' />
              </div>
              <div className="insight-info">
                <h4>Total patient</h4>
                <p>{data?.totalPatients}</p>
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-img-container dark-blue-color">
                <CiClock2 className='image-insight text-light' />
              </div>
              <div className="insight-info">
                <h4>Waiting Appointments</h4>
                <p>{data?.waitingAppointmentsCount}</p>
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-img-container green-color">
                <RiListView className='image-insight text-light' />
              </div>
              <div className="insight-info">
                <h4>Rating</h4>
                <p>{data?.averageRating}</p>
              </div>
            </div>
          </div>

          <div className="income-head">
            <Yourincome/>
          </div>

          <div className="profiles-head">
            <img src={getProfileImage(doctor?.profilePicture)} className='profiles-imgage'/>
            <h2 className='name-head'>{doctor?.name}</h2>
            <p className='subtitle'>{doctor?.title}</p>
            <div className='dashboardprofile-logo'>
              <div className='content-background'>
                <div className='logo-background'>
                  <FaUserInjured className='profiles-icons' size='1.3rem'/>
                </div>
                <p className='logo-name'>Patients</p>
                <p className='logo-count'>{data?.totalPatients}</p>
              </div>
              <div className='content-background'>
                <div className='logo-background'>
                  <BsCheckCircleFill className='profiles-icons' size='1.3rem'/>
                </div>
                <p className='logo-name'>Slots</p>
                <p className='logo-count'>{data?.totalFilledSlots}/{data?.totalPostedSlots}</p>
              </div>
              <div className='content-background'>
                <div className='logo-background'>
                  <IoIosMail className='profiles-icons' size='1.5rem' />
                </div>
                <p className='logo-name'>Inbox</p>
                <p className='logo-count'>{data?.totalUnreadMessages}</p>
              </div>
            </div>
            <div className='button-profiles'>
              <button>View Profile</button>
            </div>
          </div>
          
          <div className="consultation">
            <div className='consultation-coverarea'>
              <div className='consultation-info'>
                <p className='consultation-count'>{data?.totalConsultations}+</p>
                <p className='consultation-label'>Consultation</p>
              </div>
              <img src={consultationimg} className='consultation-img' alt="Consultation" />
            </div>
          </div>

          <div className="reviews">
            <div className='reviews-coverarea'>
              <div className='reviews-info'>
                <h2 className='reviews-count'>{data?.totalReviews}+</h2>
                <p className='reviews-label'>Patient's reviews</p>
              </div>
              <img src={reviewsImg} className='reviews-img' alt="Reviews icon"/>
            </div>
          </div>  

          <div className="booking-rate">
            <BookingRate booking={booking}/>
          </div>

          <div className="schedule">
            <Schedule doctor={slots}/>
          </div> 

        </div>
      </div>
    </div>
  )
}

export default DashboardPage