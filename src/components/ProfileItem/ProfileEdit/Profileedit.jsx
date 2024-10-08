import React, { useState, useRef, useEffect } from "react";
import "./profileedit.css";
import { FiEdit3 } from "react-icons/fi";
import profileimg from "../../Assets/profileimg.png";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileEdit = () => {
  const [profileImage, setProfileImage] = useState(profileimg);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setaddress] = useState("");
  const [dob, setDob] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  

  const [isEditing, setIsEditing] = useState({
    profilePicture: false,
    name: false,
    email: false,
    mobileNumber: false,
    address: false,
    dob: false,
    age: false,
    gender: false,
    bloodGroup: false,
    insuranceProvider: false,
    policyNumber: false,
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const addressRef = useRef(null);
  const dobRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const bloodGroupRef = useRef(null);
  const insuranceProviderRef = useRef(null);
  const policyNumberRef = useRef(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/profile`, { withCredentials: true });
        const { patient } = response.data;
        const profileImageData = patient.profilePicture
          ? `data:image/jpeg;base64,${patient.profilePicture.data}` // Update the prefix if the image is not JPEG
          : profileimg;

        setProfileImage(profileImageData);
        setName(patient.name || "");
        setEmail(patient.email || "");
        setMobileNumber(patient.phoneNumber || "");
        setaddress(patient.address || "");
        setDob(patient.dateOfBirth ? formatDate(patient.dateOfBirth) : "");
        setAge(patient.age || "");
        setGender(patient.gender || "");
        setBloodGroup(patient.bloodGroup || "");
        setInsuranceProvider(patient.insuranceProvider || "");
        setPolicyNumber(patient.policyNumber || "");
      } catch (error) {
        console.error("There was an error fetching the profile data!", error);
      }
    };

    fetchProfileData();
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    setAge(calculateAge(dob));
  }, [dob]);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (field, ref) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  
    // Ensure ref is current and focusable before calling focus()
    if (ref.current && typeof ref.current.focus === 'function') {
      ref.current.focus();
    }
  };
  

  const handleSave = async (event) => {
    event.preventDefault();
  
    // Validate date
    let formattedDob = '';
    if (dob) {
      const dateObj = new Date(dob);
      if (!isNaN(dateObj.getTime())) {
        formattedDob = dateObj.toISOString().split('T')[0]; // Convert back to YYYY-MM-DD
      } else {
        console.error('Invalid date:', dob);
      }
    }
  
    const formData = new FormData();
  
    if (profileImage && profileImage.startsWith('data:image')) {
      const [, base64Data] = profileImage.split(',');
      const blob = await fetch(profileImage).then(r => r.blob());
      formData.append("profilePicture", blob, "profile.jpg");
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", mobileNumber);
    formData.append("address", address);
    formData.append("dob", formattedDob);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("bloodGroup", bloodGroup);
    formData.append("insuranceProvider", insuranceProvider);
    formData.append("policyNumber", policyNumber);
  
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/patient/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      toast.info("Profile updated successfully!", {
 
        closeButton: true,
        progressBar: true,
        className: 'toast-center toast-success',
      });
    } catch (error) {
      console.error("There was an error updating the profile!", error);
      toast.info("Error updating profile. Please try again.",{

        closeButton: true,
        progressBar: true,
        className: 'toast-center toast-success',
      });
    }
  };
  

  return (
    <>      
      <ToastContainer /> 
    <div className="userprofile-card">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <input
            type="file"
            style={{ display: "none" }}
            id="profilePicture"
            onChange={handleImageChange}
          />
          <span
            className="edit-icon1"
            onClick={() => document.getElementById("profilePicture").click()}
          >
            <FiEdit3 className="edit-icon2" size="1rem" />
          </span>
        </div>
        <div className="profile-info">
          <h5>{name || "Your name"}</h5>
          <p>{email || "yourname@gmail.com"}</p>
        </div>
      </div>
      <form onSubmit={handleSave}>
        <div className="profile-field-wrapper">
          <div className="profile-group">
            <label className="profile-label" htmlFor="name">Name</label>
            <input
              className="profile-input"
              type="text"
              id="name"
              value={name}
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              readOnly={!isEditing.name}
              ref={nameRef}
              autoComplete="name"
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("name", nameRef)}
            />
          </div>
          <div className="profile-group">
            <label className="profile-label" htmlFor="email">Email</label>
            <input
              className="profile-input"
              type="email"
              id="email"
              value={email}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!isEditing.email}
              ref={emailRef}
              autoComplete="email"
            />
            {/* <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("email", emailRef)}
            /> */}
          </div>
          <div className="profile-group">
            <label className="profile-label" htmlFor="mobileNumber">Mobile Number</label>
            <PhoneInput
              country={'us'} // You can set the default country or make it dynamic based on user data
              value={mobileNumber}
              onChange={(value) => setMobileNumber(value)}
              inputProps={{
                id: 'mobileNumber',
                ref: mobileNumberRef,
                readOnly: !isEditing.mobileNumber,
                className: 'react-PH-input',
              }}
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("mobileNumber", mobileNumberRef)}
            />
          </div>

          {/* <div className="profile-group">
            <label className="profile-label" htmlFor="mobileNumber">Mobile Number</label>
            <input
              className="profile-input"
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              placeholder="Add number"
              onChange={(e) => setMobileNumber(e.target.value)}
              readOnly={!isEditing.mobileNumber}
              ref={mobileNumberRef}
              autoComplete="tel"
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("mobileNumber", mobileNumberRef)}
            />
          </div> */}
          <div className="profile-group">
            <label className="profile-label" htmlFor="location">Location</label>
            <input
              className="profile-input"
              type="text"
              id="address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              readOnly={!isEditing.address}
              ref={addressRef}
              autoComplete="address-level1"
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("address", addressRef)}
            />
          </div>
          <div className="profile-group">
  <label className="profile-label" htmlFor="dob">DOB</label>
  <DatePicker
  value={dob}
  selected={dob}
  onChange={(date) => setDob(date)}
  dateFormat="yyyy-MM-dd"
  className="profile-input"
  placeholderText="Select date of birth"
  ref={dobRef}
  disabled={!isEditing.dob}
  showPopperArrow={false}
  autoComplete="bday"
  popperPlacement="bottom-start"
  showYearDropdown
  showMonthDropdown
  dropdownMode="select" // Optional: To use select instead of scrolling for month and year
/>
  <FiEdit3
    className="edit-icon"
    size="1rem"
    onClick={() => handleEditClick("dob", dobRef)}
  />
</div>


          <div className="profile-group">
            <label className="profile-label" htmlFor="age">Age</label>
            <input
              className="profile-input"
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              readOnly={!isEditing.age}
              ref={ageRef}
              autoComplete="bday"
              placeholder="Age"
            />
            {/* <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("age", ageRef)}
            /> */}
          </div>
          <div className="profile-group">
            <label className="profile-label" htmlFor="gender">Gender</label>
            <select
              className="profile-input"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={!isEditing.gender}
              ref={genderRef}
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("gender", genderRef)}
            />
          </div>
          {/* <div className="profile-group">
            <label className="profile-label" htmlFor="bloodGroup">Blood Group</label>
            <input
              className="profile-input"
              type="text"
              id="bloodGroup"
              value={bloodGroup}
              placeholder="Blood Group"
              onChange={(e) => setBloodGroup(e.target.value)}
              readOnly={!isEditing.bloodGroup}
              ref={bloodGroupRef}
              autoComplete="off"
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("bloodGroup", bloodGroupRef)}
            />
          </div> */}
          <div className="profile-group">
            <label className="profile-label" htmlFor="bloodGroup">Blood Group</label>
            <select
              className="profile-input"
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              readOnly={!isEditing.bloodGroup}
              ref={bloodGroupRef}
              autoComplete="off"
              placeholder="Blood Group"
            >
              <option value="" disabled>Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("bloodGroup", bloodGroupRef)}
            />
          </div>
          <div className="profile-group">
            <label className="profile-label" htmlFor="insuranceProvider">Insurance Provider</label>
            <input
              className="profile-input"
              type="text"
              id="insuranceProvider"
              value={insuranceProvider}
              placeholder="Insurance Provider"
              onChange={(e) => setInsuranceProvider(e.target.value)}
              readOnly={!isEditing.insuranceProvider}
              ref={insuranceProviderRef}
              autoComplete="off"
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("insuranceProvider", insuranceProviderRef)}
            />
          </div>
          <div className="profile-group">
            <label className="profile-label" htmlFor="policyNumber">Policy Number</label>
            <input
              className="profile-input"
              type="text"
              id="policyNumber"
              value={policyNumber}
              placeholder="Change your Policy Number"
              onChange={(e) => setPolicyNumber(e.target.value)}
              readOnly={!isEditing.policyNumber}
              ref={policyNumberRef}
              autoComplete="current-policyNumber"
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("policyNumber", policyNumberRef)}
            />
          </div>
        </div>
        <button className="savebutton" type="submit">
          <span className="savebutton-text">Save Changes</span>
        </button>
      </form>
    </div>
    </>
  );
};

export default ProfileEdit;
