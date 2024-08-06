import React, { useState } from 'react';
import { login } from '../../actions/api';

const MyComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const loginResponse = await login(email, password);
      console.log('Login successful:', loginResponse);

      // Fetch data after successful login
      const doctorData = await fetch('http://localhost:5000/patient/bookings');
      setData(doctorData);
      console.log('Fetched doctor data:', doctorData);
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {/* {data && <div>Data: {JSON.stringify(data)}</div>} */}
    </div>
  );
};

export default MyComponent;