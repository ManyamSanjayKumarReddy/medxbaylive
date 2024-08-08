import React, { useState, useEffect } from 'react';
import { TiTick } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  useMediaQuery,
  useTheme,
  TableFooter,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  FormGroup,
  Grid,
} from '@mui/material';
import axios from 'axios';
import './patient.css';
import { useNavigate } from 'react-router-dom';


const PatientTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();
  const [prescriptionData, setPrescriptionData] = useState({
    patientAge: '',
    medicines: [{ name: '', dosage: '', beforeFood: false, afterFood: false, timing: { morning: false, afternoon: false, night: false } }]
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:8000/doctor/completed-bookings', { withCredentials: true })
      .then(response => {
        console.log('Bookings data:', response.data.bookings);
        setBookings(response.data.bookings || []);
      })
      .catch(error => {
        console.error('There was an error fetching the bookings!', error.message);
        setBookings([]); // Set an empty array on error
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = (booking) => {
    setSelectedBooking(booking);
    console.log('Opening dialog for booking:', booking);
    axios.get(`http://localhost:8000/doctor/bookings/${booking._id}/prescription`, { withCredentials: true })
      .then(response => {
        const { patientAge, medicines } = response.data;
        setPrescriptionData({
          patientAge,
          medicines: medicines || [{ name: '', dosage: '', beforeFood: false, afterFood: false, timing: { morning: false, afternoon: false, night: false } }]
        });
        setOpen(true);
      })
      .catch(error => {
        console.error('There was an error fetching the booking details!', error.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null);
  };

  const handleAddMedicine = () => {
    setPrescriptionData({
      ...prescriptionData,
      medicines: [...prescriptionData.medicines, { name: '', dosage: '', beforeFood: false, afterFood: false, timing: { morning: false, afternoon: false, night: false } }]
    });
  };

  const handleChange = (index, event) => {
    const values = [...prescriptionData.medicines];
    if (event.target.name === 'beforeFood' || event.target.name === 'afterFood') {
      values[index][event.target.name] = event.target.checked;
    } else if (event.target.name.includes('timing')) {
      const timingKey = event.target.name.split('.')[1];
      values[index].timing[timingKey] = event.target.checked;
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setPrescriptionData({ ...prescriptionData, medicines: values });
  };

  const handleSubmit = () => {
    if (!selectedBooking) {
      console.error('Booking ID is missing');
      return;
    }
  
    const { patient, doctor, date, time } = selectedBooking;
    if (!doctor) {
      console.error('Doctor information is missing');
      return;
    }
  
    const prescriptionPayload = {
      patientId: patient?._id,
      doctorId: doctor?._id,
      patientName: patient?.name,
      doctorName: doctor?.name,
      doctorSpeciality: Array.isArray(doctor?.speciality) ? doctor.speciality.join(', ') : doctor?.speciality,
      doctorEmail: doctor?.email,
      patientAge: prescriptionData.patientAge,
      medicines: prescriptionData.medicines,
      meetingDate: date,
      meetingTime: time
    };
  
    console.log('Submitting prescription with data:', prescriptionPayload);
  
    axios.post('http://localhost:8000/doctor/prescriptions/upload', prescriptionPayload, { withCredentials: true })
      .then(response => {
        console.log('Prescription submitted successfully:', response.data);
        setOpen(false);
        setSelectedBooking(null);
        // Optionally, refresh bookings or show a success message
      })
      .catch(error => {
        console.error('There was an error submitting the prescription!', error.message);
      });
  };
  
  const displayData = bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className="header">
        <h2 className='mypatients'>My Patients</h2>
        <div className="actions">
          <Button variant="contained" color="primary" className="button">
            + All Appointments
          </Button>
          <Button variant="outlined" color="primary" className="button" onClick={() => navigate('/doctorprofile/dashboardpage/calendar')}>
            Calendar
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} className="table-container reduced-width">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" className="table-header">
                <Checkbox />
              </TableCell>
              <TableCell className="table-header">Patient ID</TableCell>
              {!isMobile && (
                <>
                  <TableCell className="table-header">Date Check In</TableCell>
                  <TableCell className="table-header">Patient Name</TableCell>
                  <TableCell className="table-header">Patient Email</TableCell>
                  <TableCell className="table-header">Consultation</TableCell>
                </>
              )}
              <TableCell className="table-header">Prescription</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="table-data" padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{row.patient?._id}</TableCell>
                {!isMobile && (
                  <>
                    <TableCell className="table-data">{row.date}</TableCell>
                    <TableCell className="table-data">{row.patient?.name}</TableCell>
                    <TableCell className="table-data">{row.patient?.email}</TableCell>
                    <TableCell className="table-data">{row.consultationType}</TableCell>
                  </>
                )}
                <TableCell className="table-data">
                  {row.prescription ? (
                    <Button variant="contained" color="primary" className="prescription-button">
                      <TiTick style={{ marginRight: '5px' }} />
                      Added
                    </Button>
                  ) : (
                    <Button variant="outlined" color="primary" className="prescription-button" onClick={() => handleClickOpen(row)}>
                      <IoMdAdd style={{ marginRight: '5px' }} />
                      Add prescription
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={12}>
                <div className="pagination">
                  <Button onClick={(event) => handleChangePage(event, page - 1)} disabled={page === 0}>
                    Previous
                  </Button>
                  {[...Array(Math.ceil(bookings.length / rowsPerPage))].map((_, index) => (
                    <Button
                      key={index}
                      onClick={(event) => handleChangePage(event, index)}
                      variant={index === page ? 'contained' : 'outlined'}
                      color="primary"
                      className="pagination-button"
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button onClick={(event) => handleChangePage(event, page + 1)} disabled={page >= Math.ceil(bookings.length / rowsPerPage) - 1}>
                    Next
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Prescription</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Patient Age"
              type="number"
              fullWidth
              value={prescriptionData.patientAge}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, patientAge: e.target.value })}
              margin="normal"
            />
            {prescriptionData.medicines.map((medicine, index) => (
              <div key={index}>
                <TextField
                  label="Medicine Name"
                  name="name"
                  fullWidth
                  value={medicine.name}
                  onChange={(e) => handleChange(index, e)}
                  margin="normal"
                />
                <TextField
                  label="Dosage"
                  name="dosage"
                  fullWidth
                  value={medicine.dosage}
                  onChange={(e) => handleChange(index, e)}
                  margin="normal"
                />
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="beforeFood"
                        checked={medicine.beforeFood}
                        onChange={(e) => handleChange(index, e)}
                      />
                    }
                    label="Before Food"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="afterFood"
                        checked={medicine.afterFood}
                        onChange={(e) => handleChange(index, e)}
                      />
                    }
                    label="After Food"
                  />
                </FormGroup>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="timing.morning"
                        checked={medicine.timing.morning}
                        onChange={(e) => handleChange(index, e)}
                      />
                    }
                    label="Morning"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="timing.afternoon"
                        checked={medicine.timing.afternoon}
                        onChange={(e) => handleChange(index, e)}
                      />
                    }
                    label="Afternoon"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="timing.night"
                        checked={medicine.timing.night}
                        onChange={(e) => handleChange(index, e)}
                      />
                    }
                    label="Night"
                  />
                </FormGroup>
              </div>
            ))}
            <Button variant="contained" color="primary" onClick={handleAddMedicine} fullWidth>
              + Add Medicine
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PatientTable;
