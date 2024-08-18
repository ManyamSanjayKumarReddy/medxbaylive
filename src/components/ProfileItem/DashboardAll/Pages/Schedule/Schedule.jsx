import React, { useState } from 'react';
import './myschedule.css';
import ReactBigCalendar from './ReactBigCalendar';
import Sidebar from './schedulesidebar';

function Schedule() {
  const [scheduleList, setScheduleList] = useState([]);

  const handleScheduleChange = (newScheduleList) => {
    setScheduleList(newScheduleList);
  };

  return (
    <div className='my-schedule-container'>
      <h2>My Schedule</h2>
      <div className="schedule-page">
        <Sidebar scheduleList={scheduleList} />
        <div className="allandcal">
          <div className="calender">
            <ReactBigCalendar onScheduleChange={handleScheduleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
