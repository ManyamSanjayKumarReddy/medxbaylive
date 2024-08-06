// src/components/StarRating.js
import React, { useState } from 'react';
import '../DoctorProfile/StarRating.css';

const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index) => {
    setRating(index + 1);
  };

  const handleMouseEnter = (index) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          index={index}
          rating={rating}
          hoverRating={hoverRating}
          handleClick={handleClick}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

const Star = ({
  index,
  rating,
  hoverRating,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const fill = hoverRating >= index + 1 ? 'hovered' : rating >= index + 1 ? 'filled' : 'empty';

  return (
    <div
      className={`star ${fill}`}
      onClick={() => handleClick(index)}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    >
      &#9733;
    </div>
  );
};

export default StarRating;
