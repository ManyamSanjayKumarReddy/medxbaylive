import React, { useState, useEffect } from 'react';
import { MdOutlineFileDownload } from "react-icons/md";
import { fetchFromPatient } from '../../../../actions/api';
import './prescriptions.css';

const Prescriptions = () => {
  const [visibleAppointments, setVisibleAppointments] = useState(5);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await fetchFromPatient('/prescriptions');
        setStatuses(data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  const toggleAppointmentsVisibility = () => {
    setVisibleAppointments(prevVisibleAppointments =>
      prevVisibleAppointments === 5 ? statuses.length : 5
    );
  };

  const downloadPrescription = async (id) => {
    try {
      const response = await fetchFromPatient(`/prescriptions/${id}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `prescription_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the prescription:', error);
    }
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
            {Array.isArray(statuses) && statuses.slice(0, visibleAppointments).map(({ prescription_id, meetingDate, meetingTime, doctorName }) => (
              <tr key={prescription_id}> {/* Ensure that `prescription_id` is unique */}
                <td>{prescription_id}</td>
                <td>{meetingDate}</td>
                <td>{meetingTime}</td>
                <td>{doctorName}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => downloadPrescription(prescription_id)}
                  >
                    View Prescription <MdOutlineFileDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Array.isArray(statuses) && statuses.length > 5 && (
        <button className="view-all-button" onClick={toggleAppointmentsVisibility}>
          {visibleAppointments === 5 ? 'View All' : 'View Less'}
        </button>
      )}
    </div>
  );
};

export default Prescriptions;
