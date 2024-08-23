import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TestimonialSlider.css';

import { GrFormPrevious, GrFormNext } from "react-icons/gr";


const testimonials = [
  {
    image: './picture.jpeg',
    text: 'Lorem ipsum dolor sit amet consectetur. Tortor molestie faucibus facilis fermentum. Varius orci pellentesque tortor consequat risus senectus aenean. Ullamcorper suspendisse nisl scelerisque vulputate cursus pharetra.',
    name: 'Lale T,',
    country: 'Turkey'
  },
  {
    image: './picture.jpeg',
    text: 'Lorem ipsum dolor sit amet consectetur. Tortor molestie faucibus facilis fermentum. Varius orci pellentesque tortor consequat risus senectus aenean. Ullamcorper suspendisse nisl scelerisque vulputate cursus pharetra.',
    name: 'Lale T,',
    country: 'Turkey'
  },
  {
    image: './picture.jpeg',
    text: 'Lorem ipsum dolor sit amet consectetur. Tortor molestie faucibus facilis fermentum. Varius orci pellentesque tortor consequat risus senectus aenean. Ullamcorper suspendisse nisl scelerisque vulputate cursus pharetra.',
    name: 'Lale T,',
    country: 'Turkey'
  },
  {
    image: './picture.jpeg',
    text: 'Lorem ipsum dolor sit amet consectetur. Tortor molestie faucibus facilis fermentum. Varius orci pellentesque tortor consequat risus senectus aenean. Ullamcorper suspendisse nisl scelerisque vulputate cursus pharetra.',
    name: 'Lale T,',
    country: 'Turkey'
  },
];

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
    prevArrow: <GrFormPrevious id='slider-previous-icon' />,
    nextArrow: <GrFormNext id='slider-next-icon' />,
  };

  return (
 
    <div className="testimonial-slider">
      <div className='loremipsum'>Testimonials</div>

      <div className="title-testimonial">Our Patients Love Us</div>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <div className="container testimonial-container">
              <div className="row">
                <div className="col-md-4 col-lg-3">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                </div>
                <div className="col-md-8 ">
                  <div className="testimonial-content">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="50" height="38" className="quote-icon">
  <path fill="white" stroke="#0167FF" strokeWidth="1" d="M4.58341 17.3211C3.55316 16.2274 3 15 3 13.0103C3 9.51086 5.45651 6.37366 9.03059 4.82318L9.92328 6.20079C6.58804 8.00539 5.93618 10.346 5.67564 11.822C6.21263 11.5443 6.91558 11.4466 7.60471 11.5105C9.40908 11.6778 10.8312 13.159 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0095 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2274 13 15 13 13.0103C13 9.51086 15.4565 6.37366 19.0306 4.82318L19.9233 6.20079C16.588 8.00539 15.9362 10.346 15.6756 11.822C16.2126 11.5443 16.9156 11.4466 17.6047 11.5105C19.4091 11.6778 20.8312 13.159 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0095 14.5834 17.3211Z"></path>
</svg>

                  
                    <p className="testimonial-text">{testimonial.text}</p>
                    <p className="testimonial-name">{testimonial.name}</p>
                    <p className="testimonial-country">{testimonial.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>

  );
};

export default TestimonialSlider;
