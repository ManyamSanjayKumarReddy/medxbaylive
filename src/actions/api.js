import axios from 'axios';

// Create an Axios instance with a base URL and withCredentials option
const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchFromPatient = async (endpoint, data = {}, method = 'GET') => {
  try {
    let response;
    if (method === 'POST') {
      response = await api.post(`/patient${endpoint}`, data);
    } else {
      // Convert the data object to query string for GET requests
      const queryString = new URLSearchParams(data).toString();
      response = await api.get(`/patient${endpoint}?${queryString}`);
    }

    // Log the response to inspect it
    console.log('Response:', response);

    // Return the response data
    return response.data;
  } catch (error) {
    // Log error details
    console.error('Fetch patient data error:', error.response ? error.response.data : error.message);

    // If the error response has a status, log the headers
    if (error.response && error.response.status) {
      console.error('Error response headers:', error.response.headers);
    }

    throw error;
  }
};
export const fetchFromDoctor = async (endpoint, data = {}, method = 'GET') => {
  try {
      let response;
      if (method === 'POST') {
          response = await api.post(`/patient${endpoint}`, data);
          console.log(response)
      } else {
          response = await api.get(`/patient${endpoint}`);
      }

      // return response.data;

      if (response.headers['content-type']?.includes('application/json')) {
          return response.data;
      } else {
          const responseText = await response.json();
          throw new Error(`Received non-JSON response: ${responseText}`);
      }
  } catch (error) {
      console.error('Fetch patient data error:', error.response ? error.response.data : error.message);
      throw error;
  }
};

export default api;
