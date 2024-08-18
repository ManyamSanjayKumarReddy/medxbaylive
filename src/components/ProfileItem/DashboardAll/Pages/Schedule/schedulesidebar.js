import React from 'react';
import './myschedule.css';
import moment from 'moment';

function Sidebar({ scheduleList }) {
  // Separate events and time slots
  const events = scheduleList.filter(schedule => schedule.consultationType);
  const timeSlots = scheduleList.filter(schedule => !schedule.consultationType);

  return (
    <div className="schedule-sidebar">
      <h3>All Schedule</h3>

      <p>TimeSlots</p>
      <ul className="schedule-sidebar-list">
        {timeSlots.map((schedule, index) => (
          <li key={index}>
            <div>
              {moment(schedule.start).format('MMM DD, YYYY HH:mm')} - {moment(schedule.end).format('HH:mm')}
            </div>
          </li>
        ))}
      </ul>

      <p>Events</p>
      <ul className="schedule-sidebar-list">
        {events.map((schedule, index) => (
          <li key={index}>
            <div>
              <strong>{schedule.consultationType}</strong><br />
              {moment(schedule.start).format('MMM DD, YYYY HH:mm')} - {moment(schedule.end).format('HH:mm')}
            </div>
          </li>
        ))}
      </ul>

      <div className="remove-option">
        <input type="checkbox" id="remove" />
        <label htmlFor="remove">Remove after drop</label>
      </div>
    </div>
  );
}

export default Sidebar;
