import React, { useState } from 'react';
//style.css
import './manageAppointments.css';

//react-iocns
import { MdOutlineCalendarToday } from "react-icons/md";

const ManageAppointments = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [visibleAppointments, setVisibleAppointments] = useState(5); // Default number of visible appointments
  const [statuses, setStatuses] = useState([
    { id: 1, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "green" },
    { id: 2, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "green" },
    { id: 3, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "orange" },
    { id: 4, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "red" },
    { id: 5, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "green" },
    { id: 6, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "green" },
    { id: 7, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "orange" },
    { id: 8, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "red" },
    { id: 9, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "green" },
    { id: 10, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "green" },
    { id: 11, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "orange" },
    { id: 12, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "red" },
    { id: 13, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "green" },
    { id: 14, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "red" },
    { id: 15, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "green" },
    { id: 16, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "green" },
    { id: 17, doctor: "Dr. Pardhu", date: "12/10/24", time: "11.00 AM", status: "orange" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setStatuses(statuses.map(status => status.id === id ? { ...status, status: newStatus } : status));
  };

  const filteredStatuses = activeTab === 'All' ? statuses : statuses.filter(status => status.status === activeTab);

  const toggleAppointmentsVisibility = () => {
    if (visibleAppointments === 5) {
      setVisibleAppointments(filteredStatuses.length);
    } else {
      setVisibleAppointments(5);
    }
  };

  return (
    <div className="appointments-container">
      <h2>All Appointments</h2>
      <div className="tabs-container">
        <div className="tabs">
          <button className={`tab ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>All</button>
          <button className={`tab ${activeTab === 'orange' ? 'active' : ''}`} onClick={() => setActiveTab('orange')}>Upcoming</button>
          <button className={`tab ${activeTab === 'green' ? 'active' : ''}`} onClick={() => setActiveTab('green')}>Completed</button>
        </div>
        <button className="calendar-button">
          <MdOutlineCalendarToday />
          Calendar
        </button>
      </div>
      <div className='appointments-table-container'>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStatuses.slice(0, visibleAppointments).map(({ id, doctor, date, time, status }) => (
              <tr key={id}>
                <td>{doctor}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td><span className={`status-dot ${status}`}></span></td>
                <td>
                  <button className="view-button" onClick={() => alert(`Viewing appointment for ${doctor}`)}>View Appointment</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredStatuses.length > 5 && (
        <button className="view-all-button" onClick={toggleAppointmentsVisibility}>
          {visibleAppointments === 5 ? 'View All' : 'View Less'}
        </button>
      )}
    </div>
  );
};

export default ManageAppointments;
