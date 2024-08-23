import { useState, useEffect } from "react";
import "./Dashboard.css";
import scheduleimg from "./Assets/scheduleimg.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import moment from "moment/moment";

const Schedule = ({doctor}) => {
  const today = new Date();
  const [startDate, setStartDate] = useState(new Date(today.setDate(today.getDate() - 5)));
  const [selectedDay, setSelectedDay] = useState(5); 

  const handleDayClick = (index) => {
    setSelectedDay(index);
  };

  const handlePrevious = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  const handleNext = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  const generateDateRange = (start, numDays) => {
    const dates = [];
    for (let i = 0; i < numDays; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dateRange = generateDateRange(startDate, 10);
  console.log(doctor)
  const getScheduleForSelectedDay = (selectedDate) => {
    const selectedDateString = moment(selectedDate).format('YYYY-MM-DD');
    console.log(selectedDateString);
    
    const scheduleForSelectedDay = doctor.filter(
      (item) =>
        moment(item.date).format('YYYY-MM-DD') === selectedDateString &&
        (item.status === "accepted" || item.status === "completed")
    );
  
    return scheduleForSelectedDay.length > 0 ? scheduleForSelectedDay : [];
  };
  

  const selectedDate = dateRange[selectedDay];
  const scheduleItems = getScheduleForSelectedDay(selectedDate);
  console.log(scheduleItems)

  useEffect(() => {
    // Automatically set selectedDay to today within the dateRange
    const todayIndex = dateRange.findIndex(date => date.toDateString() === new Date().toDateString());
    if (todayIndex !== -1) {
      setSelectedDay(todayIndex);
    }
  }, [startDate]);

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2>My schedule</h2>
        <div className="select-container">
          <select className="recently">
            <option>Recently</option>
            <option>This Month</option>
            <option>This Week</option>
            <option>This Year</option>
          </select>
          <RiArrowDownSLine className="arrow-icon-filter" />
        </div>
      </div>
      <div className="calendar">
        <button onClick={handlePrevious}>
          <BiSolidLeftArrow className="icon-arrow-calendar" />
        </button>
        {dateRange.map((date, index) => {
          const isToday = date.toDateString() === new Date().toDateString();
          return (
            <div
              key={index}
              className={`day ${index === selectedDay ? "selected" : ""} ${isToday ? "today" : ""}`}
              onClick={() => handleDayClick(index)}
            >
              {date.getDate()}
              <br />
              <span>{date.toLocaleString("default", { weekday: "short" })}</span>
            </div>
          );
        })}
        <button onClick={handleNext}>
          <BiSolidRightArrow className="icon-arrow-calendar" />
        </button>
      </div>
      <div className="schedule-list">
        {scheduleItems.map((item, index) => (
          <div key={index} className="schedule-item">
            <div className="time">{item.time}</div>
            <div className="details">
              <div className="details-section">
                <div className="schedule-image-container">
                  <img src={scheduleimg} className="scheduleimg" alt="schedule" />
                </div>
                <div>
                  <div className="schedule-title">{item.consultationType}</div>
                  <div className="sub-details">
                    <p>{item.patient.name}</p>
                  </div>
                </div>
                {/* <div className="status-container">
                  <p>{item.status}</p>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
