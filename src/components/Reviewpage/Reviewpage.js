import React, { useState } from 'react';
import { FaStar } from "react-icons/fa6";
import './Reviewpage.css';
import tick from "../../assests/img/pic 2.png";

const CustomerReview = ({ reviews }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!reviews || reviews.length === 0) {
    return <div>No reviews available</div>;
  }

  const handleScrollUp = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : reviews.length - 1));
      setIsTransitioning(false);
    }, 300); // Duration of transition
  };

  const handleScrollDown = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex < reviews.length - 1 ? prevIndex + 1 : 0));
      setIsTransitioning(false);
    }, 300); // Duration of transition
  };

  const currentReview = reviews[currentReviewIndex];
  const nextReview = reviews[(currentReviewIndex + 1) % reviews.length];

  return (
    <div className="container main-section-review">
      <div className="doctor-review-section row">
        <div className="col-5 ">
          <h5>CUSTOMER REVIEWS</h5>
          <h1 className="mb-4">What People Say About Me.</h1>
        </div>
        <div className="col-7 ">
          <div className={`shadow-card ${isTransitioning ? 'fade-out' : ''}`}>
            <div className="d-flex review">
              <img src={tick} alt="profile" className="rounded-circle" />
              <div className="ml-3">
                <div className="d-flex align-items-center mb-2">
                  <span className="mydoctor-review-star">
                    {Array(nextReview.rating).fill().map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </span>
                </div>
                <p>“{nextReview.content}”</p>
                <p className="reviwer-name">{nextReview.name}</p>
                <p className="location">{nextReview.location}</p>
              </div>
            </div>
          </div>
          <div className={`card doctor-card-review ${isTransitioning ? 'swipe-up-in' : ''}`}>
            <div className="d-flex doctor-review">
              <img src={tick} alt="profile" className="rounded-circle" />
              <div className="ml-3">
                <div className="d-flex align-items-center mb-2">
                  <span className="mydoctor-review-star">
                    {Array(currentReview.rating).fill().map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </span>
                </div>
                <p className="doctor-review-content">“{currentReview.reviewText}”</p>
                <p className="reviwer-name">{currentReview.patientId.name}</p>
              </div>
            </div>
          </div>
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-up"
            onClick={handleScrollUp}
            role="button"
          >
            <path d="M1 8.5L8 1.5L15 8.5" stroke="#BCB7C2" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-down"
            onClick={handleScrollDown}
            role="button"
          >
            <path d="M1 1.5L8 8.5L15 1.5" stroke="#BCB7C2" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;