import './App.css';
import Section from './components/section/section';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import PatientWelcomePage from './components/welcome/PatientWelcomePage';
import DoctorWelcomePage from './components/welcome/DoctorWelcomePage';
import AdminWelcomePage from './components/welcome/AdminWelcomePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChangePassword from './components/login/changepassword';
function App() {
  return (
   
    <Router>
      <Routes>
        <Route path="/" element={ <Section/>}/>

        <Route path="/patient/patient-index" element={<PatientWelcomePage />} />
        <Route path="/doctor/doctor-index" element={<DoctorWelcomePage />} />
        <Route path="/admin/admin-home" element={<AdminWelcomePage />} />
        <Route path="/reset-password" element={<ChangePassword />} />

      </Routes>
    </Router>
  );
}

export default App;