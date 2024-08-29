import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import './reviews.css';

const Reviews = () => {

  let [reviews, setReview] = useState([]);
  let [doctorId, getDoctorId] = useState("668d76552eb4eb992365391b")

  const data = {
    "reviews": [
      {
        "patientId": {
          "_id": "668d8247306f8fba3d20b34c",
          "name": "Hirushit"
        },
        "rating": 4,
        "reviewText": "Good!",
        "createdAt": "2024-08-17T06:02:25.905Z",
        "_id": "66c03cf1b4be9fbe809fddf9",
        "patientName": "Hirushit"
      },
      {
        "patientId": {
          "_id": "668d8247306f8fba3d20b34c",
          "name": "Hirushit"
        },
        "rating": 5,
        "reviewText": "Review test text",
        "createdAt": "2024-08-17T06:02:43.220Z",
        "_id": "66c03d03b4be9fbe809fde1e",
        "patientName": "Hirushit"
      }
    ],
    "doctor": {
      "socialHandles": {
        "twitter": "https://x.com/hirushit8",
        "facebook": "",
        "linkedin": "",
        "instagram": ""
      },
      "profilePicture": {
        "data": {
          "type": "Buffer",
          "data": [0]
        },
        "contentType": "image/jpeg"
      },
      "documents": "[object Object]",
      "_id": "668d76552eb4eb992365391b",
      "name": "Hirushit",
      "email": "hirushit8@gmail.com",
      "password": "$2a$10$rj7CB4sdou2JvyLizojdPeTimIRBSKRRVmr7lSBDxvJAGmsJDQGzK",
      "role": "doctor",
      "isVerified": true,
      "speciality": [
        "Heart Specialist"
      ],
      "languages": [
        "English",
        "Tamil",
        "Hindi"
      ],
      "insurances": [
        "66ac78377c5405aa9b2fa6b4",
        "66ac7a257c5405aa9b2fa6ba",
        "66ac7a387c5405aa9b2fa6bd"
      ],
      "consultation": "Both",
      "awards": [
        "Doctor of the Quarter 2024",
        "Doctor of the year 2023"
      ],
      "faqs": [
        ""
      ],
      "verified": "Verified",
      "rating": 5,
      "consultationsCompleted": 0,
      "profileViews": 0,
      "conditions": [
        "Heart Disease",
        "Skin Disease",
        "Genral Medicine"
      ],
      "subscriptionType": "Premium",
      "subscriptionVerification": "Verified",
      "hospitals": [
        {
          "name": "ABC Hospital",
          "street": "123, Street",
          "city": "Trichy",
          "state": "Tamil Nadu",
          "country": "India",
          "zip": "620001",
          "_id": "66c072ed8ded069ab47e512f"
        },
        {
          "name": "XYZ Hospital",
          "street": "456, Street",
          "city": "Namakkal",
          "state": "Tamil Nadu",
          "country": "India",
          "zip": "637001",
          "_id": "66c072ed8ded069ab47e5130"
        },
        {
          "name": "Thangam Hospital",
          "street": "54, Dr.Sankaran Road",
          "city": "Namakkal",
          "state": "Tamil Nadu",
          "country": "India",
          "zip": "637001",
          "_id": "66c072ed8ded069ab47e5131"
        },
        {
          "name": "Kauvery Hospital",
          "street": "No.1, K.C Road",
          "city": "Trichy",
          "state": "Tamil Nadu",
          "country": "India ",
          "zip": "620017",
          "_id": "66c072ed8ded069ab47e5132"
        }
      ],
      "timeSlots": [],
      "reviews": [
        {
          "patientId": {
            "_id": "668d8247306f8fba3d20b34c",
            "name": "Hirushit"
          },
          "rating": 4,
          "reviewText": "Good!",
          "createdAt": "2024-08-17T06:02:25.905Z",
          "_id": "66c03cf1b4be9fbe809fddf9"
        },
        {
          "patientId": {
            "_id": "668d8247306f8fba3d20b34c",
            "name": "Hirushit"
          },
          "rating": 5,
          "reviewText": "Review test text",
          "createdAt": "2024-08-17T06:02:43.220Z",
          "_id": "66c03d03b4be9fbe809fde1e"
        }
      ],
      "__v": 7,
      "aboutMe": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "availability": "true",
      "bloodGroup": "B+",
      "city": "Namakkal",
      "country": "India",
      "dateOfBirth": "2024-08-13T00:00:00.000Z",
      "gender": "Male",
      "state": "Tamil Nadu",
      "title": "Cardiologist",
      "website": "https://www.google.com",
      "paymentDetails": "{\"amount\":4900,\"currency\":\"usd\"}"
    }
  };

  useEffect(()=>{
    // setReview(data.reviews) // delete this line and delete static data after getting data from backend
    fetchReview();
  },[])

  async function fetchReview(){
    try {
      axios.get(`http://localhost:8000/doctor/reviews/${doctorId}`)
      .then(response => {
        setReview(response.data.reviews);
      })
      .catch(error => {
        console.error(error);
      });
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
