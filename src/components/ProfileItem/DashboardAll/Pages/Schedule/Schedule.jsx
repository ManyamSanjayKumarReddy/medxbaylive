import React, { useState, useEffect } from 'react';
import './myschedule.css';
import ReactBigCalendar from './ReactBigCalendar';
import Sidebar from './schedulesidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Schedule() {
  const [scheduleList, setScheduleList] = useState([]);
  const [events, setEvents] = useState([]);
  const [doctor, setDoctor] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const user = sessionStorage.getItem("loggedIn");

    if (!user) {
      alert("You need to log in to book an appointment.");
      navigate("/login");
      return;
    }

    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/doctor/manage-time-slots`,

        {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            },
   
   
        );

        const doctorData = response.data;
        setDoctor(doctorData);

        const parseDateTime = (dateStr, timeStr) => {
          try {
            const date = new Date(dateStr);

            if (isNaN(date.getTime())) {
              console.error(`Invalid Date created from: ${dateStr}`);
              return new Date(NaN);
            }

            const [hoursStr, minutesStr] = timeStr.split(":");
            const hours = parseInt(hoursStr, 10);
            const minutes = parseInt(minutesStr, 10);

            if (
              isNaN(hours) ||
              isNaN(minutes) ||
              hours < 0 ||
              hours > 23 ||
              minutes < 0 ||
              minutes > 59
            ) {
              console.error(`Invalid time values: ${timeStr}`);
              return new Date(NaN);
            }

            date.setHours(hours);
            date.setMinutes(minutes);

            return date;
          } catch (error) {
            console.error("Error parsing date and time:", error);
            return new Date(NaN);
          }
        };

        if (doctorData && doctorData.timeSlots && doctorData.bookings) {
          const timeSlots = doctorData.timeSlots.map((slot) => {
            const start = parseDateTime(slot.date, slot.startTime);
            const end = parseDateTime(slot.date, slot.endTime);

            return {
              id: slot._id,
              title: slot.hospital,
              start: start,
              end: end,
            };
          });
          
          const bookings = doctorData.bookings.map((booking) => {
            const start = parseDateTime(booking.date, booking.time);
            const end = new Date(start);
            end.setMinutes(end.getMinutes() + 30); // Assuming each booking is 30 minutes

            return {
              id: booking._id,
              start: start,
              end: end,
              consultationType: booking.consultationType || 'N/A',
            };
          });

          console.log("Bookings:", bookings); // Debugging: Log bookings with consultationType

          
          setEvents([...timeSlots, ...bookings]);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [navigate]);

  const handleScheduleChange = (newScheduleList) => {
    setScheduleList(newScheduleList);
  };

  return (
    <div className='my-schedule-container'>
      <h2>My Schedule</h2>
      <div className="schedule-page">
        <Sidebar 
          scheduleList={scheduleList} 
          doctor={doctor} 
          events = {events}
          setEvents={setEvents} 
        />
        <div className="allandcal">
          <div className="calender">
            <ReactBigCalendar 
              onScheduleChange={handleScheduleChange}  
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
