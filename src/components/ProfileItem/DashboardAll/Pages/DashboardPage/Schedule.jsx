import { useState, useEffect } from "react";
import "./Dashboard.css";
import scheduleimg from "./Assets/scheduleimg.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";

const Schedule = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(new Date(today.setDate(today.getDate() - 5))); // Start date for the calendar
  const [selectedDay, setSelectedDay] = useState(5); // Default selected day index to be the middle of the range

  const schedules = [
    [
      { time: "9:00 - 10:00 AM", title: "Meeting", details: "Project meeting" },
      { time: "11:00 - 12:00 PM", title: "Consultation", details: "Client consultation" },
      { time: "1:00 - 2:00 PM", title: "Lunch Break", details: "Lunch at the cafeteria" },
      { time: "2:30 - 3:30 PM", title: "Conference Call", details: "Call with overseas team" },
      { time: "4:00 - 5:00 PM", title: "Documentation", details: "Update project documentation" },
    ],
    [
      { time: "10:00 - 11:00 AM", title: "Review", details: "Code review" },
      { time: "11:30 AM - 12:30 PM", title: "Planning", details: "Sprint planning meeting" },
      { time: "1:00 - 2:00 PM", title: "Team Lunch", details: "Team lunch at cafe" },
      { time: "3:00 - 4:00 PM", title: "Design Review", details: "Review design mockups" },
      { time: "4:30 - 5:30 PM", title: "Client Follow-up", details: "Follow-up with client" },
    ],
    [
      { time: "8:00 - 9:00 AM", title: "Workshop", details: "Tech workshop" },
      { time: "9:30 - 10:30 AM", title: "Standup Meeting", details: "Daily standup meeting" },
      { time: "11:00 AM - 12:00 PM", title: "Brainstorming", details: "Brainstorming session" },
      { time: "1:00 - 2:00 PM", title: "Lunch Break", details: "Lunch at the cafeteria" },
      { time: "3:00 - 4:00 PM", title: "Consultation", details: "Client consultation" },
    ],
    [
      { time: "9:00 - 10:00 AM", title: "Kickoff Meeting", details: "Project kickoff meeting" },
      { time: "10:30 - 11:30 AM", title: "Team Sync", details: "Team synchronization meeting" },
      { time: "12:00 - 1:00 PM", title: "Lunch Break", details: "Lunch at the cafeteria" },
      { time: "2:00 - 3:00 PM", title: "One-on-One", details: "One-on-one with manager" },
      { time: "4:00 - 5:00 PM", title: "Report Writing", details: "Writing weekly report" },
    ],
    [
      { time: "8:00 - 9:00 AM", title: "Daily Check-in", details: "Daily check-in meeting" },
      { time: "9:30 - 10:30 AM", title: "Client Call", details: "Call with the client" },
      { time: "11:00 AM - 12:00 PM", title: "Presentation", details: "Project presentation" },
      { time: "1:00 - 2:00 PM", title: "Lunch Break", details: "Lunch at the cafeteria" },
      { time: "3:00 - 4:00 PM", title: "Product Demo", details: "Product demo to stakeholders" },
    ],
  ];

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

  const getScheduleForSelectedDay = (selectedDateIndex) => {
    return schedules[selectedDateIndex % schedules.length] || [];
  };

  const selectedDate = dateRange[selectedDay];
  const scheduleItems = getScheduleForSelectedDay(selectedDay);

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
                  <div className="schedule-title">{item.title}</div>
                  <div className="sub-details">
                    <p>{item.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
