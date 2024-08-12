import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Swal from "sweetalert2";
import events from "./events";
import axios from "axios";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const styles = ".rbc-event{background:blue;border-radius:5px;text-align:center}";

export default function ReactBigCalendar() {
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
    
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get('https://medxbay-deploy-1-431103.uc.r.appspot.com/doctor/doctor-index',{
          params: {
            email: "deivasigamani@gmail.com",
          },}, config); // Replace with your API endpoint
        console.log(response)
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
    fetchDoctorData();
  }, []);

  function onselectevent(e){
    Swal.fire({
      title: "scheduled visit",
      html: `
        <div class="addtimeslot">
      <div id="lineargroup">
        <div class="inputgroup">
          <label htmlFor="starttime">Start Time</label>
          <input type="text" id="starttime" readonly value=`+e.start.toLocaleTimeString()+`></input>
        </div>
        <div class="inputgroup">
          <label htmlFor="endtime">End Time</label>
          <input type="text" id="endtime" readonly value=`+e.end.toLocaleTimeString()+`/>
        </div>
      </div>
      <div class="inputgroup">
        <label htmlFor="Hospital">Hospital</label>
        <input type="text" readonly value=`+ e.title +`/>
      </div>
    </div>`,
    confirmButtonText: `Ok`,
    })
  }

  function onSelectSlot(e){
    console.log(doctor)
    let date = e.start.toDateString();
    Swal.fire({
      title: "Add new time slot",
      html: `
            <form class="addtimeslot">
            <div class="inputgroup">
            <label htmlFor="date">Date</label>
            <input type="Date" id="date"/>
          </div>
          <div id="lineargroup">
            <div class="inputgroup">
              <label htmlFor="starttime">Start Time</label>
              <input type="text" id="starttime" />
            </div>
            <div class="inputgroup">
              <label htmlFor="endtime">End Time</label>
              <input type="text" id="endtime" />
            </div>
          </div>
          <div class="inputgroup">
            <label htmlFor="SelectHospital">Select Hospital</label>
          <select id="hospital" name="hospital" class="form-control">
            <option value=""</option>
          </select>
          </div>
        </form>
        `,
        confirmButtonText: `Add Time Slot `,
        showCancelButton: true,
        preConfirm: () => {
          let starttime = document.getElementById("starttime").value;
          let endtime = document.getElementById("endtime").value;
          let hospital = document.getElementById("selecthospital").value;
          if(starttime==="" || endtime==="" || hospital===""){
            Swal.showValidationMessage(`Please fill all details before proceeding!`)
          }
          else{
          return [
          starttime,endtime,hospital
          ];
        }
        }
        
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(JSON.stringify(result.value));
        Swal.fire('Time Slot Added!', '', 'success')
      } else if (result.isDismissed) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  
  }

  return (
    
      <Calendar
        views={["month", "day"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        // style={{ height: "150%", width:"150%" }}
        onSelectSlot={(e)=>{
          onSelectSlot(e)
        }}
        onSelectEvent={(e)=>{
          onselectevent(e)
        }}
      />
  );
}
