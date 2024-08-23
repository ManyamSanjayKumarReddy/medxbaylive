import React, { useState } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Myschedule.css';
import { MdDelete } from "react-icons/md";

function Sidebar({ scheduleList, doctor, setEvents }) {
  // Move the useState hooks to the top level of the component
  const [selectedStartDate, setSelectedStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [selectedEndDate, setSelectedEndDate] = useState(moment().add(1, 'days').format("YYYY-MM-DD"));

  const events = scheduleList.filter(schedule => schedule.consultationType);
  const timeSlots = scheduleList.filter(schedule => !schedule.consultationType);

    // Function to handle deleting a time slot
    async function handleDeleteTimeSlot(slotId) {
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
          if (result.isConfirmed) {
              try {
                  const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/doctor/manage-time-slots/${slotId}`, { withCredentials: true });
  
                  if (response.status === 200) {
                      const { deletedSlot } = response.data;
  
                      // Show success message with deleted time slot details
                      Swal.fire(
                        "Deleted!",
                        `Your time slot from ${moment(deletedSlot.start).format('MMM DD, YYYY HH:mm')} to ${moment(deletedSlot.end).format('HH:mm')} has been deleted.`,
                        "success"
                      ).then(() => {
                        // Refresh the page after confirming the deletion
                        window.location.reload();
                      });
          
  
                      // Update the scheduleList state to remove the deleted time slot
                      setEvents(prevEvents => prevEvents.filter(schedule => schedule.id !== slotId));
                  } else {
                      Swal.fire("Error!", "Failed to delete the time slot. Please try again.", "error");
                  }
              } catch (error) {
                  console.error("Error deleting time slot:", error);
                  Swal.fire("Error!", "There was an error deleting the time slot. Please try again.", "error");
              }
          }
      });
  }
  

  function onSelectSlot(e) {
    const selectedDate = moment(e.start).format("YYYY-MM-DD");
  
    // Check if the selected date is before today's date
    if (moment(selectedDate).isBefore(moment().format("YYYY-MM-DD"))) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'You cannot add time slots for past dates.',
      });
      return;
    }
  
    const selectedEndDate = moment(new Date())
      .add(1, "days")
      .format("YYYY-MM-DD");
  
    // const filteredEvents = events.filter((event) => {
    //   const eventDate = moment(event.start).format("YYYY-MM-DD");
    //   return eventDate === selectedDate;
    // });
  
  
    Swal.fire({
      title: "Add New Time Slot",
      html: `
        <form class="addtimeslot">
          <div class="inputgroup">
            <label>Timeslot Type</label>
            <div class="input-radio-button">
              <div>
                <input type="radio" id="single" name="slotType" value="Single" checked>
                <label for="single">Single</label>
              </div>
              <div>
                <input type="radio" id="multiple" name="slotType" value="Multiple">
                <label for="multiple">Multiple</label>
              </div>
            </div>
          </div>
          <div id="dategroup">
            <div class="inputgroup">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" value="${selectedDate}"/>
            </div>
          </div>
          <div id="lineargroup">
            <div class="inputgroup">
              <label htmlFor="starttime">Start Time</label>
              <input type="time" id="starttime" />
            </div>
            <div class="inputgroup">
              <label htmlFor="endtime">End Time</label>
              <input type="time" id="endtime" />
            </div>
          </div>
          <div class="inputgroup">
            <label htmlFor="hospital">Select Hospital</label>
            <select id="hospital" name="hospital" class="form-control">
              <option value=""></option>
              ${
                doctor?.doctor?.hospitals
                  ? doctor.doctor.hospitals
                      .map(
                        (hospital) =>
                          `<option value="${hospital.name}">${hospital.name} - ${hospital.street}, ${hospital.city}, ${hospital.state}</option>`
                      )
                      .join("")
                  : ""
              }
            </select>
          </div>
        </form>
      `,
      confirmButtonText: "Add Time Slot",
      showCancelButton: true,
      didOpen: () => {
        const singleRadio = document.getElementById('single');
        const multipleRadio = document.getElementById('multiple');
  
        singleRadio.addEventListener('change', () => {
          if (singleRadio.checked) {
            document.getElementById('dategroup').innerHTML = `
              <div class="inputgroup">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" value="${selectedDate}" />
              </div>
            `;
          }
        });
  
        multipleRadio.addEventListener('change', () => {
          if (multipleRadio.checked) {
            document.getElementById('dategroup').innerHTML = `
              <div id="lineargroup">
                <div class="inputgroup">
                  <label htmlFor="startdate">Start Date</label>
                  <input type="date" id="startdate" value="${selectedDate}" />
                </div>
                <div class="inputgroup">
                  <label htmlFor="enddate">End Date</label>
                  <input type="date" id="enddate" value="${selectedEndDate}" />
                </div>
              </div>
            `;
          }
        });
      },
     preConfirm: () => {
  const slotType = document.querySelector('input[name="slotType"]:checked').value;
  const date = document.getElementById("date") ? document.getElementById("date").value : null;
  const startdate = document.getElementById("startdate") ? document.getElementById("startdate").value : null;
  const enddate = document.getElementById("enddate") ? document.getElementById("enddate").value : null;
  const starttime = document.getElementById("starttime").value;
  const endtime = document.getElementById("endtime").value;
  const hospital = document.getElementById("hospital").value;

  // Check if date or time is in the past
  const now = moment();
  const isPastDate = (selectedDate) => moment(selectedDate).isBefore(now, 'day');
  const isPastTime = (selectedDate, selectedTime) => moment(`${selectedDate}T${selectedTime}`).isBefore(now);

  // Validate Single slotType
  if (slotType === 'Single') {
    if (isPastDate(date) || isPastTime(date, starttime)) {
      Swal.showValidationMessage("You cannot add time slots for past dates or times.");
      return null;
    }
    if (!starttime || !endtime || !hospital || !date) {
      Swal.showValidationMessage("Please fill all details before proceeding!");
      return null;
    }
  }

  // Validate Multiple slotType
  if (slotType === 'Multiple') {
    if (isPastDate(startdate) || isPastTime(startdate, starttime)) {
      Swal.showValidationMessage("You cannot add time slots for past dates or times.");
      return null;
    }
    if (!startdate || !enddate || !starttime || !endtime || !hospital) {
      Swal.showValidationMessage("Please fill all details before proceeding!");
      return null;
    }
  }

  return { slotType, date, startdate, enddate, starttime, endtime, hospital };
},
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { slotType, date, startdate, enddate, starttime, endtime, hospital } = result.value;
        
        const newEvent = {
          title: hospital,
          start: new Date(`${slotType === 'Single' ? date : startdate}T${starttime}:00`),
          end: new Date(`${slotType === 'Single' ? date : enddate}T${endtime}:00`),
          slotType,
        };
  
        setEvents((prevEvents) => [...prevEvents, newEvent]);
  
        axios.post(`${process.env.REACT_APP_BASE_URL}/doctor/add-time-slot`, {
          date: slotType === 'Single' ? date : startdate,
          endDate: enddate,
          startTime: starttime,
          endTime: endtime,
          hospital,
          slotType,
        }, { withCredentials: true })
        .then(() => {
          Swal.fire("Time Slot Added!", "", "success");
        })
        .catch((error) => {
          console.error("Error adding time slot:", error);
          Swal.fire("Error adding time slot", "", "error");
        });
      } else if (result.isDismissed) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  return (
    <div className="schedule-sidebar">
      <button className='Schedule-TimeSlot-button' onClick={onSelectSlot}>Add Timeslot</button>
      <h3>All Schedule</h3>

      <p>TimeSlots</p>
      <ul className="schedule-sidebar-list">
        {timeSlots.map((schedule, index) => (
          <div className='d-flex'>
          <li key={index} className={`${schedule.status === "booked" ? "booked":"free"}`}>
            <div >
              {moment(schedule.start).format('MMM DD, YYYY HH:mm')} - {moment(schedule.end).format('HH:mm')}
            </div>
          </li>
            <MdDelete className='schedule-sidebar-delete' onClick={()=> handleDeleteTimeSlot(schedule.id)}/>
          </div>
        ))}
      </ul>

      <p>Events</p>
      <ul className="schedule-sidebar-list">
        {events.map((schedule, index) => (
          <li key={schedule.id} className={`${schedule.status === "booked" ? "booked":"free"}`}>
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
