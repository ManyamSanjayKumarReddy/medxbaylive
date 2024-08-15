import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineFileDownload } from "react-icons/md";
import './prescriptions.css';

const Prescriptions = () => {
  const [visibleAppointments, setVisibleAppointments] = useState(5); // Default number of visible appointments
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/patient/prescriptions', { withCredentials: true });
        console.log('Fetched data:', response.data);
        if (Array.isArray(response.data)) {
          const startingSerial = 10001;
          const prescriptionsWithSerials = response.data.map((prescription, index) => ({
            ...prescription,
            serialNumber: startingSerial + index,
          }));
          setStatuses(prescriptionsWithSerials);
        } else {
          console.error('Fetched data is not an array:', response.data);
          setStatuses([]);
        }
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
      const response = await axios.get(`http://localhost:8000/patient/prescriptions/${id}/download`, {
        responseType: 'blob',
        withCredentials: true
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
              <th>S.NO</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Doctor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {statuses.slice(0, visibleAppointments).map(({ _id, meetingDate, meetingTime, doctorName, serialNumber }) => (
              <tr key={_id}>
                <td>{serialNumber}</td>
                <td>{meetingDate.slice(0, 10)}</td>
                <td>{meetingTime}</td>
                <td>{doctorName}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => downloadPrescription(_id)}
                  >
                    View Prescription <MdOutlineFileDownload />
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
