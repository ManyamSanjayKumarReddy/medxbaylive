import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import './reviews.css';

const Reviews = ({ doctorId }) => {
  const [reviews, setReviews] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/reviews/${doctorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data.reviews);
        setDoctorName(data.doctor.name);        } catch (error) {
        setError(error.message);
      }
    };

    fetchReviews();
  }, [doctorId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-page-item-review-head">
      <h2>Reviews for Dr. {doctorName}</h2>
      <div className='review-scroll'>
        {reviews.map((review) => (
          <div className="review-container" key={review._id}>
            <div className="review-header">
              <p className='review-idnumber'>{review._id}.</p>
              <div className="review-details-item">
                <p className="review-day">{new Date(review.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <p className="review-date-time">{new Date(review.date).toLocaleString()}</p>
              </div>
            </div>
            <div className="line-code"></div>
            <div className="review-body">
              <p>{review.text}</p>
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