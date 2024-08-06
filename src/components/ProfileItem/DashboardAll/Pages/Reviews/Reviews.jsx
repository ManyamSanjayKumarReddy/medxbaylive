import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './reviews.css';

const Reviews = () => {
  const [reviews] = useState([
    { 
      id: 1,
      day: 'Monday',
      date: '10:30 AM, 31 Jun 2023',
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 5,
    },
    { 
      id: 2,
      day: 'Monday',
      date: '10:30 AM, 31 Jun 2023',
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3,
    },
    { 
      id: 3,
      day: 'Monday',
      date: '10:30 AM, 31 Jun 2023',
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 4,
    },
    {
      id: 4,
      day: 'Monday',
      date: '10:30 AM, 31 Jun 2023',
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 1,
    },
    {
      id: 5,
      day: 'Monday',
      date: '10:30 AM, 31 Jun 2023',
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 2,
    }
  ]);

  return (
    <div className="dashboard-page-item-review-head">
      <h2>Reviews</h2>
      <div className='review-scroll'>
      {reviews.map((review) => (
        <div className="review-container" key={review.id}>
          <div className="review-header">
            <p className='review-idnumber'>{review.id}.</p>
            <div className="review-details-item">
              <p className="review-day">{review.day}</p>
              <p className="review-date-time">{review.date}</p>
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
