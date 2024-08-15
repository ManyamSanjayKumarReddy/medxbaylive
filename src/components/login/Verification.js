import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    const role = query.get('role');

    if (token && role) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/auth/verify-email?token=${token}&role=${role}`)
        .then(response => {
          alert(response.data.message);
          // Redirect to the login page after verification
          navigate('/login');
        })
        .catch(error => {
          alert(error.response?.data?.message || 'Verification failed. Please try again.');
        });
    }
  }, [navigate]);

  return <div>Loading...</div>; // Or a spinner or any other loading indicator
};

export default Verification;
