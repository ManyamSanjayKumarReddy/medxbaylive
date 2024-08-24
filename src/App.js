
//defult Fatching Navbar and Footer with dynmaic
import Navbar from './components/Navbar/Navbar'
import Footer from './components/footer/footerrs';

//imported bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import DoctorPopUp from './components/DoctorEdit/DoctorPopUp';
//Landing page imported
import Section from './components/section/section';

//all components imported
import ChangePassword from './components/login/changepassword';
import DoctorEdit from './components/DoctorEdit/doctorEdit';
import DoctorProfile from './components/DoctorProfile/doctorProfile';
import ProfileRoutes from './components/Routes/ProfileRoutes';
import ConnectedRoutes from './components/ProfileItem/DashboardAll/ConnectedRoutes/ConnectedRoutes';
import FilterPage from './components/FilterPage/FilterPage';
import VerifyLogin from './components/login/VerifyLogin';
import Verification from './components/login/Verification';
import  BlogPage from './components/patientBlog/blog';
import Nestednavbar from './components/Nestednavbar2/Nestednavbar';

function App() {
  useEffect(() => {
    document.title = "MedxBay";
}, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={[<Navbar/>,<Section />,<Footer/>]} />
          <Route path="/reset-password" element={<ChangePassword />} />
          <Route path="/Doctor/profile/Edit" element={[<Navbar/>,<DoctorEdit />,<Footer/>]} />     
          <Route path="/doctor/:id" element={[<Nestednavbar/>,<DoctorProfile />,<Footer/>]}/>
          <Route path="/profile/*" element={<ProfileRoutes />} />
          <Route path="/doctorprofile/dashboardpage/*" element={<ConnectedRoutes />} />
          <Route path="/Filters" element={<FilterPage />} />
          <Route path="/verify/login" element={<VerifyLogin />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/blogs" element={[<Nestednavbar/>,<BlogPage />,<Footer/>]}/>
          <Route path="/edit/profile/doctor" element={[<Navbar/>,<DoctorPopUp />,<Footer/>]}  />
        </Routes>
      </Router>
    </>
  );
}

export default App;