import React from 'react'
import './myschedule.css'
import ReactBigCalendar from './ReactBigCalendar';

function Schedule() {
  return (
    <div className='my-schedule-container'>
    <h2>My Schedule</h2>
    <div className="schedule-page">
      <div className="allandcal">
        <div className="calender">
          <ReactBigCalendar/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Schedule