import './App.css';
import Section from './components/section/section';

import Footer from './components/footer/footerrs';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import PatientWelcomePage from './components/welcome/PatientWelcomePage';
import DoctorWelcomePage from './components/welcome/DoctorWelcomePage';
import AdminWelcomePage from './components/welcome/AdminWelcomePage';
import Header from './components/Header/Header';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChangePassword from './components/login/changepassword';
import DoctorEdit from './components/DoctorEdit/doctorEdit';
import DoctorProfile from './components/DoctorProfile/doctorProfile';
import ProfileRoutes from './components/Routes/ProfileRoutes';
import Defult from './Default';
import ConnectedRoutes from './components/ProfileItem/DashboardAll/ConnectedRoutes/ConnectedRoutes';
import FilterPage from './components/FilterPage/FilterPage';
function App() {
  return (
   
    <Router>
       {/* <Header /> */}
      <Routes>
      <Route path="/" element={<Defult><Section /></Defult>} />
    

        <Route path="/patient/patient-index" element={<Defult><PatientWelcomePage /> </Defult>} />
        <Route path="/doctor/doctor-index" element={<DoctorWelcomePage />} />
        <Route path="/admin/admin-home" element={<AdminWelcomePage />} />
        <Route path="/reset-password" element={<ChangePassword />} />
        <Route path="/Doctor/profile/Edit" element={<Defult><DoctorEdit /></Defult>} />     
           <Route path="/doctor/:id" element={ <DoctorProfile/>}/>
        <Route path="/profile/*" element={<ProfileRoutes />} />
        <Route path="/doctorprofile/dashboardpage/*" element={<ConnectedRoutes />} />
        <Route path="/Filters" element={<FilterPage />} />


      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;