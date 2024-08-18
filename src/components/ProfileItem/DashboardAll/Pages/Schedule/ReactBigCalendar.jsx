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
    background: blue;
    border-radius: 5px;
    text-align: center;
  }
`;

const CustomEvent = ({ event }) => (
  <span>
    <strong>{moment(event.start).format("HH:mm")}</strong> -{" "}
    <strong>{moment(event.end).format("HH:mm")}</strong><br />
    {event.title} <br />
    {event.consultationType}
  </span>
);

export default function ReactBigCalendar({ onScheduleChange }) {
  const [doctor, setDoctor] = useState({});
  const [events, setEvents] = useState([]);
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
          "http://localhost:8000/doctor/manage-time-slots",
          {
            // headers: {
            //   "Access-Control-Allow-Origin": "*",
            // },
            withCredentials: true,
          }
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
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value="${selectedDate}" readonly/>
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
                doctor.doctor.hospitals
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
      preConfirm: () => {
        const date = document.getElementById("date").value;
        const starttime = document.getElementById("starttime").value;
        const endtime = document.getElementById("endtime").value;
        const hospital = document.getElementById("hospital").value;
        if (!starttime || !endtime || !hospital) {
          Swal.showValidationMessage("Please fill all details before proceeding!");
          return null;
        } else {
          return { date, starttime, endtime, hospital };
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { date, starttime, endtime, hospital } = result.value;

        const newEvent = {
          title: hospital,
          start: new Date(`${date}T${starttime}:00`),
          end: new Date(`${date}T${endtime}:00`),
        };

        console.log("New Event:", newEvent); // Debugging: Log the new event details

        setEvents((prevEvents) => [...prevEvents, newEvent]);

        // Optionally, make an API call to save the new time slot
        axios.post("http://localhost:8000/doctor/add-time-slot", {
          date,
          startTime: starttime,
          endTime: endtime,
          hospital,
        },{withCredentials:true})
        .then(() => {
          Swal.fire("Time Slot Added!", "", "success");
          console.log("Event added successfully");
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
