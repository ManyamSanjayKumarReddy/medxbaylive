import React, { useState } from 'react';
// Use Style.css
import './prescriptions.css';

const Prescriptions = () => {
  const [visibleAppointments, setVisibleAppointments] = useState(5); // Default number of visible appointments
  const [statuses, setStatuses] = useState([
    { id: 100001, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100002, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100003, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100004, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100005, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100006, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100007, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100008, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100010, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100011, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100012, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100013, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100014, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" },
    { id: 100015, date: "12/10/24", time: "11.00 AM", doctor: "Dr. Pardhu" }
  ]);

  const toggleAppointmentsVisibility = () => {
    setVisibleAppointments(prevVisibleAppointments =>
      prevVisibleAppointments === 5 ? statuses.length : 5
    );
  };

  return (
    <div className="prescriptions-container">
      <h2>All Prescriptions</h2>
      <div className="prescriptions-table-container">
        <table className="prescriptions-table">
          <thead>
            <tr>
              <th>Prescription ID</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Doctor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {statuses.slice(0, visibleAppointments).map(({ id, date, time, doctor }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>{doctor}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => alert(`Viewing prescription for ${doctor}`)}
                  >
                    View Prescription
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {statuses.length > 5 && (
        <button className="view-all-button" onClick={toggleAppointmentsVisibility}>
          {visibleAppointments === 5 ? 'View All' : 'View Less'}
        </button>
      )}
    </div>
  );
};

export default Prescriptions;
