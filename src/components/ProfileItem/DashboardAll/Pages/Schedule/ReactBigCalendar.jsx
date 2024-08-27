import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const styles = `
 .rbc-event {
 background :transparent;
    border-radius: 5px;
    text-align: center;
    padding: 2px 5px;
    color: white;
    border :none !important;
  }
     .rbc-event.booked {
    background-color: grey;
  }

  .rbc-event.free {
    background-color: #0167FF;
  }
`;
const CustomEvent = ({ event }) => (
  <div className={`${event.status === 'booked' ? 'rbc-event booked' : 'rbc-event free'}`}>
    <strong>{moment(event.start).format("HH:mm")}</strong> -{" "}
    <strong>{moment(event.end).format("HH:mm")}</strong>{" "}
    {event?.title ? (
      `(${event.title})`
    ) : (
      event.consultationType ? ` (${event.consultationType})` : ''
    )}
  </div>
);

export default function ReactBigCalendar({ onScheduleChange }) {
  const [doctor, setDoctor] = useState({});
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("loggedIn");

    if (!user) {
      alert("You need to log in to book an appointment.");
      return;
    }

    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/doctor/manage-time-slots`,
          {
            withCredentials: true,
          }
        );

        const doctorData = response.data;
        setDoctor(doctorData);
        console.log(doctor);
        

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
              status : slot.status
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
          setEvents([...timeSlots, ...bookings]);
          const statuses = events.map((event,index)=>{ 
            return event.status
          });
          console.log(statuses);
          
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [navigate]);

  function onSelectEvent(e) {
    Swal.fire({
      title: "Scheduled Visit",
      html: `
        <div class="addtimeslot">
          <div id="lineargroup">
            <div class="inputgroup">
              <label htmlFor="starttime">Start Time</label>
              <input type="text" id="starttime" readonly value="${e.start.toLocaleTimeString()}" />
            </div>
            <div class="inputgroup">
              <label htmlFor="endtime">End Time</label>
              <input type="text" id="endtime" readonly value="${e.end.toLocaleTimeString()}" />
            </div>
          </div>
          <div class="inputgroup">
            <label htmlFor="Hospital">Hospital</label>
            <input type="text" readonly value="${e.title}" />
          </div>
          <div class="inputgroup">
            <label htmlFor="consultationType">Consultation Type</label>
            <input type="text" readonly value="${e.consultationType || 'N/A'}" />
          </div>
        </div>
      `,
      confirmButtonText: "Ok",
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

    const freeSlotsCount = events.filter(event => event.status === 'free').length;
  
    if (freeSlotsCount >= 3) {
      Swal.fire({
        icon: 'warning',
        title: 'Upgrade Required',
        text: 'You have reached the limit of 3 free time slots. Please upgrade to add more.',
      });
      return;
    }
  
    const selectedEndDate = moment(new Date())
      .add(1, "days")
      .format("YYYY-MM-DD");
  
    const filteredEvents = events.filter((event) => {
      const eventDate = moment(event.start).format("YYYY-MM-DD");
      return eventDate === selectedDate;
    });
  
    onScheduleChange(filteredEvents);
  
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
              <input type="date" id="date" value="${selectedDate}" readonly/>
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
                <input type="date" id="date" value="${selectedDate}" readonly/>
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
        
        if (slotType === 'Single' && (!starttime || !endtime || !hospital || !date)) {
          Swal.showValidationMessage("Please fill all details before proceeding!");
          return null;
        } else if (slotType === 'Multiple' && (!startdate || !enddate || !starttime || !endtime || !hospital)) {
          Swal.showValidationMessage("Please fill all details before proceeding!");
          return null;
        } else {
          return { slotType, date, startdate, enddate, starttime, endtime, hospital };
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { slotType, date, startdate, enddate, starttime, endtime, hospital } = result.value;
        
        const newEvent = {
          title: hospital,
          start: new Date(`${slotType === 'Single' ? date : startdate}T${starttime}:00`),
          end: new Date(`${slotType === 'Single' ? date : enddate}T${endtime}:00`),
          slotType,
          status: 'free', // Assuming all new slots are free
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
    <>
      <style>{styles}</style>
      <Calendar
        views={["month", "day"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        components={{ event: CustomEvent }}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
      />
    </>
  );
}
