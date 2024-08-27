import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './manageAppointments.css';
import { MdOutlineCalendarToday } from "react-icons/md";
import tick from '../../../assests/img/tick.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
Modal.setAppElement('#root');

const ManageAppointments = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [visibleAppointments, setVisibleAppointments] = useState(5);
  const [bookings, setBookings] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 0, reviewText: '' });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/bookings`, { withCredentials: true });
        console.log('Fetched bookings response:', response.data);  // Log the entire response data
        if (Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
        } else {
          console.error('Expected an array for bookings data');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  // console.log(bookings.map(booking => booking.status))
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'green';
      case 'waiting':
        return 'orange';
      case 'rejected':
        return 'red';
      case 'completed':
        return 'blue';
      default:
        return 'gray'; // default or unknown status
    }
  };


  const handleStatusChange = (id, newStatus) => {
    setBookings(bookings.map(booking => booking._id === id ? { ...booking, status: newStatus } : booking));
  };

  const getFilteredAppointments = () => {
    switch (activeTab) {
      case 'Upcoming':
        return bookings.filter(booking => booking.status === 'accepted' && new Date(booking.date) >= new Date());
      case 'Completed':
        return bookings.filter(booking => booking.status === 'completed');
      case 'Cancelled':
        return bookings.filter(booking => booking.status === 'rejected');
      case 'All':
      default:
        return bookings;
    }
  };

  const filteredBookings = getFilteredAppointments();

  const toggleAppointmentsVisibility = () => {
    setVisibleAppointments(prev => (prev === 5 ? filteredBookings.length : 5));
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setModalIsOpen(false);
  };

  const openReviewModal = (appointment) => {
    setSelectedAppointment(appointment);
    setReviewModalIsOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedAppointment(null);
    setReviewModalIsOpen(false);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({ ...reviewForm, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setReviewForm({ ...reviewForm, rating });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(reviewForm);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/patient/review/${selectedAppointment.doctor._id}/${selectedAppointment._id}`, 
        reviewForm, 
        { withCredentials: true }
      );
      console.log('Review submitted:', response.data);
      

      toast.info('Review submitted successfully!', {
        className: 'toast-center ',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      

      setTimeout(() => {
        closeReviewModal();
      }, 5000); 
  
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.info('Failed to submit review. Please try again.', {
        className: 'toast-center ',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  

  const StarRating = ({ rating, onChange, starCount }) => {
    const handleClick = (index) => {
      onChange(index + 1);
    };


    return (
      <div className="star-rating">
        {[...Array(starCount)].map((_, index) => (
          <span
            key={index}
            className={`star ${rating > index ? 'filled' : ''}`}
            onClick={() => handleClick(index)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>
      <div className="tabs-container">
        <div className="tabs">
          <button className={`tab ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>All</button>
          <button className={`tab ${activeTab === 'Upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('Upcoming')}>Upcoming</button>
          <button className={`tab ${activeTab === 'Completed' ? 'active' : ''}`} onClick={() => setActiveTab('Completed')}>Completed</button>
          <button className={`tab ${activeTab === 'Cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('Cancelled')}>Cancelled</button>
        </div>
        <div className='d-flex'>
          <p className='appointment-acc'><span className={`status-dot green `}></span>Accepted</p>
          <p className='appointment-acc'><span className={`status-dot orange `}></span>Waiting</p>
          <p className='appointment-acc'><span className={`status-dot red `}></span>Rejected</p>
          <p className='appointment-acc'><span className={`status-dot blue `}></span>Completed</p>
        </div>
      </div>
      <div className="appointments-table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredBookings) && filteredBookings.slice(0, visibleAppointments).map(({ _id, doctor, date, time, status, consultationType, meetingLink }) => (
              <tr key={_id}>
                <td>{doctor.name}</td>
                <td>{new Date(date).toLocaleDateString()}</td>
                <td>{time}</td>
                <td><span className={`status-dot ${getStatusClass(status)}`}>

                </span></td>
                <td>
                  {activeTab === 'Completed' ? (
                    <button className="add-review-button mr-2" onClick={() => openReviewModal({ _id, doctor, date, time, status, consultationType, meetingLink })}>
                      Add Review
                    </button>
                  ) : (
                    <button className="view-button" onClick={() => openModal({ _id, doctor, date, time, status, consultationType, meetingLink })}>
                      View Appointment
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Array.isArray(filteredBookings) && filteredBookings.length > 5 && (
        <button className="view-all-button" onClick={toggleAppointmentsVisibility}>
          {visibleAppointments === 5 ? 'View All' : 'View Less'}
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Appointment Details"
        className="view-appointment-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-content">
          <h2>Appointment Details</h2>
          {selectedAppointment ? (
            <>
              <p><strong>Doctor:</strong> {selectedAppointment.doctor.name}</p>
              <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selectedAppointment.time}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
              {selectedAppointment.consultationType === 'In-person' ? (
                <div>
                  <strong>Doctor Location:</strong>
                  <ul>
                    {selectedAppointment.doctor.hospitals.map((hospital, index) => (
                      <li key={index}>
                        {hospital.street}, {hospital.city}, {hospital.state}, {hospital.country}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p><strong>Meeting Link:</strong> <a href={selectedAppointment.meetingLink} target="_blank" rel="noopener noreferrer">Join Meeting</a></p>
              )}
            </>
          ) : (
            <p>No appointment selected.</p>
          )}
          <button onClick={closeModal} className="close-modal-button">Close</button>
        </div>

      </Modal>

      <Modal
        isOpen={reviewModalIsOpen}
        onRequestClose={closeReviewModal}
        contentLabel="Add Review"
        className="review-custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="review-modal-content">
          {selectedAppointment ? (
            <>
              <h2>Add Review for {selectedAppointment.doctor.name}</h2>
              <form onSubmit={handleReviewSubmit}>
                <div>
                  <label>
                    Rating:
                    <StarRating
                      rating={reviewForm.rating}
                      onChange={handleRatingChange}
                      starCount={5}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Comments:
                    <textarea
                      name="reviewText"
                      id="reviewText"
                      value={reviewForm.reviewText}
                      onChange={handleReviewChange}
                      required
                    />
                  </label>
                </div>
                <button type="submit" className="submit-review-button">Submit Review</button>
                <button type="button" onClick={closeReviewModal} className="close-modal-button">Close</button>
              </form>
            </>
          ) : (
            <p>No appointment selected.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ManageAppointments;
