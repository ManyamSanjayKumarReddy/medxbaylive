import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import './reviews.css';

const Reviews = () => {

  let [reviews, setReview] = useState([]);

  useEffect(()=>{
    fetchReview();
  },[])


  async function fetchReview() {
    try {
      const doctorId = sessionStorage.getItem('userId'); 
      if (!doctorId) {
        console.error('Doctor ID not found in session storage');
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/doctor/reviews/${doctorId}`, {
        withCredentials: true,
      });
      setReview(response.data.reviews);
    } catch (error) {
      console.error(error);
    }
  }



  function getdate(date){
    const dateObject = new Date(date);
    let hours = dateObject.getHours() % 12 || 12;
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const ampm = dateObject.getHours() >= 12 ? 'PM' : 'AM';
    const timeString = `${hours}:${minutes} ${ampm}`;
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[month];
    const day = dateObject.getDate();
    const formatteddate = `${day.toString().padStart(2, '0')} ${monthName} ${year}`
    return `${timeString}, ${formatteddate}`
  }

  function getday(date){
    const dateObject = new Date(date);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = daysOfWeek[dateObject.getDay()];
    return day
  }

  return (
    <div className="dashboard-page-item-review-head">
      <h2>Reviews</h2>
      <div className='review-scroll'>
      {reviews && reviews.map((review, index) => (
        <div className="review-container" key={review._id}>
          <div className="review-header">
            <p className='review-idnumber'>{index+1}</p>
            <div className="review-details-item">
              <p className="review-day">{getday(review.createdAt)}</p>
              <p className="review-date-time">{getdate(review.createdAt)}</p>
            </div>
          </div>
          <div className="line-code"></div>
          <div className="review-body">
            <p>{review.reviewText}</p>
          </div>
          <div className="line-code"></div>
          <div className="review-rating">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < review.rating ? '#ffc107' : '#e4e5e9'}
                className='rating-icon'
              />
            ))}
          </div>
        </div>
      ))}
        </div>
    </div>
  );
};

export default Reviews;
