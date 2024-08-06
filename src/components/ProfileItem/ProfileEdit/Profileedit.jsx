import React, { useState, useRef } from "react";
import "./profileedit.css";
import { FiEdit3 } from "react-icons/fi";
import profileimg from "../../Assets/profileimg.png";

const Profileedit = () => {
  const [profileImage, setProfileImage] = useState(profileimg);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [password, setPassword] = useState("");

  const [isEditing, setIsEditing] = useState({
    name: false,
    mobileNumber: false,
    location: false,
    age: false,
    gender: false,
    weight: false,
    password: false,
  });

  const nameRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const locationRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const weightRef = useRef(null);
  const passwordRef = useRef(null);

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

  const handleSave = async () => {
    const profileData = {
      profileImage,
      name,
      mobileNumber,
      location,
      age,
      gender,
      weight,
      password,
    };

    //api code
  };

  return (
    <div className="userprofile-card">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <input
            type="file"
            style={{ display: "none" }}
            id="fileInput"
            onChange={handleImageChange}
          />
          <span
            className="edit-icon1"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <FiEdit3 className="edit-icon2" size="1rem" />
          </span>
        </div>
        <div className="profile-info">
          <h5>Your name</h5>
          <p>yourname@gmail.com</p>
        </div>
      </div>
      <form>
        <div className="profile-field-wrapper">
          <div className="profile-group">
            <label className="profile-label">Name</label>
            <input
              className="profile-input"
              type="text"
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
            <label className="profile-label">Mobile Number</label>
            <input
              className="profile-input"
              type="tel"
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
            <label className="profile-label">Location</label>
            <input
              className="profile-input"
              type="text"
              value={location}
              placeholder="USA"
              onChange={(e) => setLocation(e.target.value)}
              readOnly={!isEditing.location}
              ref={locationRef}
              autoComplete="address-level1"
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("location", locationRef)}
            />
          </div>
          <div className="profile-group">
            <label className="profile-label">Age</label>
            <input
              className="profile-input"
              type="number"
              value={age}
              placeholder="29"
              onChange={(e) => setAge(e.target.value)}
              readOnly={!isEditing.age}
              ref={ageRef}
              autoComplete="bday"
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("age", ageRef)}
            />
          </div>
          <div className="profile-group">
            <label className="profile-label">Gender</label>
            <input
              className="profile-input"
              type="text"
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
            <label className="profile-label">Weight</label>
            <input
              className="profile-input"
              type="number"
              value={weight}
              placeholder="72"
              onChange={(e) => setWeight(e.target.value)}
              readOnly={!isEditing.weight}
              ref={weightRef}
              autoComplete="off"
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("weight", weightRef)}
            />
          </div>
          <div className="profile-group">
            <label className="profile-label">Password</label>
            <input
              className="profile-input"
              type="password"
              value={password}
              placeholder="Change your Password"
              onChange={(e) => setPassword(e.target.value)}
              readOnly={!isEditing.password}
              ref={passwordRef}
              autoComplete="current-password"
            />
            <FiEdit3
              className="edit-icon"
              size="1rem"
              onClick={() => handleEditClick("password", passwordRef)}
            />
          </div>
        </div>
        <button className="savebutton" onClick={handleSave}>
          <span className="savebutton-text">Save Changes</span>
        </button>
      </form>
    </div>
  );
};

export default Profileedit;
