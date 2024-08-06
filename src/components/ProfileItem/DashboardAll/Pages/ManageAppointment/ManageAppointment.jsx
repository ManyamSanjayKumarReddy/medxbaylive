import React, { useState, useEffect } from 'react';
import { MdOutlineCalendarToday } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import './manageappointment.css';


const ManageAppointments = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [statuses, setStatuses] = useState([]);

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8000/doctor/bookings');
        
        // Check if the response is OK
        if (!response.ok) {
          // Handle non-200 responses
          const errorText = await response.text(); // Read response text
          console.error('Error fetching data:', errorText);
          return;
        }
        
        // Attempt to parse the response as JSON
        try {
          const data = await response.json();
          setStatuses(data.bookings.map(booking => ({
            id: booking._id,
            patient: booking.patient, // Adjust based on your schema
            doctor: booking.doctor, // Adjust based on your schema
            date: booking.date,
            time: booking.time,
            status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1), // Capitalize the first letter
          })));
        } catch (jsonError) {
          // Handle JSON parse errors
          console.error('Error parsing JSON:', jsonError);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchAppointments();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setStatuses(statuses.map(status => status.id === id ? { ...status, status: newStatus } : status));
  };

  const filteredStatuses = activeTab === 'All' ? statuses : statuses.filter(status => status.status === activeTab);

  return (
    <div className="dashboard-appointments">
   
      <h2>All Appointments</h2>
      <div className="dashboard-tabs-container">
        <div className="tabs-button">
          <button className={`tab-side ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>All</button>
          <button className={`tab-side ${activeTab === 'Pending' ? 'active' : ''}`} onClick={() => setActiveTab('Pending')}>Pending</button>
          <button className={`tab-side ${activeTab === 'Approved' ? 'active' : ''}`} onClick={() => setActiveTab('Approved')}>Approved</button>
          <button className={`tab-side ${activeTab === 'Cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('Cancelled')}>Cancelled</button>
        </div>
        <button className="dashboard-calendar-button">
          <MdOutlineCalendarToday />
          Calendar
        </button>
      </div>
      <div className='manage-appointments-table-container'>
        <table className="manage-appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStatuses.map(({ id, patient, doctor, date, time, status }) => (
              <tr key={id}>
                <td>{patient}</td>
                <td>{doctor}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td><span className={`status-dot ${status.toLowerCase()}`}></span></td>
                <td>
                  <div className="select-container">
                    <select
                      className={`status-select ${status.toLowerCase()}`}
                      value={status}
                      onChange={(e) => handleStatusChange(id, e.target.value)}
                    >
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <RiArrowDownSLine className="arrow-icon" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAppointments;
