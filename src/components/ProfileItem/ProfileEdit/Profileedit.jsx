import React, { useState, useRef, useEffect } from "react";
import "./profileedit.css";
import { FiEdit3 } from "react-icons/fi";
import profileimg from "../../Assets/profileimg.png";
import axios from "axios";

const ProfileEdit = () => {
  const [profileImage, setProfileImage] = useState(profileimg);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setaddress] = useState("");
  const [dob, setDob] = useState("");
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
        const response = await axios.get("https://gwa-50021392542.development.catalystappsail.in/patient/profile",{withCredentials:true});
        const { patient } = response.data;
  console.log(patient)
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
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleSave = async (event) => {
  event.preventDefault();

  const formattedDob = new Date(dob).toISOString().split('T')[0]; // Convert back to YYYY-MM-DD

  const formData = new FormData();
  formData.append("profileImage", profileImage);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("mobileNumber", mobileNumber);
  formData.append("address", address);
  formData.append("dob", formattedDob);
  formData.append("age", age);
  formData.append("gender", gender);
  formData.append("bloodGroup", bloodGroup);
  formData.append("insuranceProvider", insuranceProvider);
  formData.append("policyNumber", policyNumber);

  try {
    await axios.post("https://gwa-50021392542.development.catalystappsail.in/patient/profile/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials:true
    });
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("There was an error updating the profile!", error);
    alert("Error updating profile. Please try again.");
  }
};


  return (
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
          </div>
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
            <input
              className="profile-input"
              type="text"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              readOnly={!isEditing.dob}
              ref={dobRef}
              autoComplete="bday"
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
            />
            {/* <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("age", ageRef)}
            /> */}
          </div>
          <div className="profile-group">
            <label className="profile-label" htmlFor="gender">Gender</label>
            <input
              className="profile-input"
              type="text"
              id="gender"
              value={gender}
              placeholder="Male"
              onChange={(e) => setGender(e.target.value)}
              readOnly={!isEditing.gender}
              ref={genderRef}
              autoComplete="sex"
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("gender", genderRef)}
            />
          </div>
          <div className="profile-group">
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
  );
};

export default ProfileEdit;
