import React, { useState, useEffect } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import doctor from "../../assests/img/doctorprofile.jpeg";
import axios from "axios";
import profileImage from "../Assets/profileimg.png";
import 'leaflet/dist/leaflet.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocationPicker from "./LocationPicker";
import { useMapEvents } from 'react-leaflet';

const DoctorPopUp = ({ show, handleClose,fetchDoctorDetails }) => {
  useEffect(() => {
    import("../DoctorEdit/DoctorPopUp.css");
  }, []);
  const [loading, setLoading] = useState(false); 
  const [selectedLocation, setSelectedLocation] = useState({ lat: "", lng: "" });
  const [modalShow, setModalShow] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    aboutMe: "",
    dateOfBirth: "",
    email: "",
    gender: "",
    country: "",
    state: "",
    cities: "",
    availability: "",
    consultation: "",
    speciality: "",
    conditions: [""],
    languages: [""],
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    doctorFee: "",
    hospitals: [
      { name: "", street: "", city: "", state: "", country: "", zip: "", lat: "", lng: "" },
    ],
    insurances: [""],
    awards: [""],
    profilePicture: null,
    documents: {
      licenseProof: { data: null, contentType: "" },
      certificationProof: { data: null, contentType: "" },
      businessProof: { data: null, contentType: "" },
    },
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [allInsurances, setAllInsurances] = useState([]);

  const handleChange = (e, index, field, nestedField) => {
    const newValue = e.target.value;
    setFormData((prevData) => {
      const newData = { ...prevData };
      if (nestedField) {
        newData[field] = newData[field].map((item, i) =>
          i === index ? { ...item, [nestedField]: newValue } : item
        );
      } else if (Array.isArray(newData[field])) {
        newData[field] = newData[field].map((item, i) =>
          i === index ? newValue : item
        );
      } else {
        newData[e.target.name] = newValue;
      }
      return newData;
    });
  };

  

  const handleAddItem = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [
        ...prevData[field],
        field === "hospitals"
          ? {
              name: "",
              street: "",
              city: "",
              state: "",
              country: "",
              zip: "",
              lat: "",
              lng: "",
            }
          : "",
      ],
    }));
  };

  const handleRemoveItem = (index, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index),
    }));
  };
  const handleInsuranceChange = (e) => {
    const selectedInsurance = e.target.value;
    if (!formData.insurances.includes(selectedInsurance)) {
      setFormData((prevData) => ({
        ...prevData,
        insurances: [...prevData.insurances, selectedInsurance],
      }));
    }
  };

  const handleRemoveInsurance = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      insurances: prevData.insurances.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = btoa(
        new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      setFormData((prevData) => ({
        ...prevData,
        [name]: {
          data: base64String,
          contentType: file.type,
        },
      }));

      if (name === "profilePicture") {
        setProfilePicturePreview(URL.createObjectURL(file));
      }
    };

    if (name === "profilePicture") {
      if (!file.type.startsWith("image/")) {
        toast.info("Please upload a valid image file for the profile picture.");
        return;
      }
      reader.readAsArrayBuffer(file);
    } else if (["licenseProof", "certificationProof", "businessProof"].includes(name)) {
      if (file.type !== "application/pdf") {
        toast.info(`Please upload a valid PDF file for ${name.replace("Proof", "")}.`);
        return;
      }
      reader.readAsArrayBuffer(file);
    }
  };


  const [profileimg,setProfileimage]=useState('')

  useEffect(() => {
    import("../DoctorEdit/DoctorPopUp.css");

    const savedData = localStorage.getItem("doctorFormData");
    if (savedData) {
      const data = JSON.parse(savedData)
      setFormData(data);
    }

    const email = localStorage.getItem("doctorEmail");
    if (email) {
      setFormData((prevDoctor) => ({
        ...prevDoctor,
        email,
      }));
    }
  }, []);

  useEffect(() => {
    document.title = "Doctor-Edit";

    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`,
          { withCredentials: true }
        );
        const { doctor, allInsurances } = response.data;

        if (doctor.dateOfBirth) {
          doctor.dateOfBirth = formatDateForInput(doctor.dateOfBirth);
        }

        const profileImageData = doctor.profilePicture
          ? `data:image/jpeg;base64,${doctor.profilePicture.data}`
          : profileImage;

        setProfilePicturePreview(profileImageData);
        setFormData(doctor);
        setAllInsurances(allInsurances);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctor();
  }, []);


  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    
    const ddmmyyyy = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (ddmmyyyy.test(dateString)) {
      const [day, month, year] = dateString.split("-");
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    const yyyymmdd = /^\d{4}-\d{2}-\d{2}$/;
    if (yyyymmdd.test(dateString)) {
      return dateString;
    }
    
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    
    return "";
  };

  const handleLocationSelect = (lat, lng) => {
    console.log('Selected Location:', { lat, lng });
    setSelectedLocation({ lat, lng });
    setFormData((prevData) => ({
      ...prevData,
      hospitals: prevData.hospitals.map((hospital, i) =>
        i === modalShow.index ? { ...hospital, lat, lng } : hospital
      ),
    }));
    setModalShow({ show: false, index: null });
  };
  
  

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        handleLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formPayload = { ...formData };


    formPayload.insurances = formPayload.insurances.map((name) => {
        const insurance = allInsurances.find((ins) => ins.name === name);
        return insurance ? insurance._id : null;
    }).filter(Boolean);

    const transformedDocuments = {};
    for (const key in formPayload.documents) {
        const doc = formPayload.documents[key];
        if (doc.data) {
            transformedDocuments[key] = {
                data: doc.data, 
                contentType: doc.contentType,
            };
        }
    }

    formPayload.documents = transformedDocuments;

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`,
            formPayload,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );

        toast.info('Profile updated successfully!', {
            className: 'toast-center toast-success',
            closeButton: true,
            progressBar: true,
        });
    } catch (error) {
        toast.info('Failed to update profile. Please try again.', {
            className: 'toast-center toast-error',
            closeButton: true,
            progressBar: true,
        });
    } finally {
        setLoading(false);
    }
};


  return (
    <div  centered className="custom-modal">
          
      <Modal.Header className="custom-modal-header">
        <Modal.Title className="model-header">Edit Your Profile</Modal.Title>
     
      </Modal.Header>

      <Modal.Body className="modal-body-scrollable">
      <ToastContainer />
        <div className="profile-edit-outter">
          {profilePicturePreview ? (
            <img
              src={profilePicturePreview}
              alt="Profile"
              className="doctoreditimage-edit"
            />
          ) : (
            <img src={profileimg||doctor} alt="Profile" className="doctoreditimage-edit" />
          )}
        </div>
        <label className="choose-file">
          Choose File
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>

        <Form onSubmit={handleSubmit} className="form-overall-container">
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter the Title"
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formAbout">
                <Form.Label>About</Form.Label>
                <Form.Control
                  type="text"
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleChange}
                  placeholder="Enter the About"
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formDob">
                  <Form.Label>DoB</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="form-control-custom"
                  />
                </Form.Group>
              </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-control-custom"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your Country"
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your State"
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>cities</Form.Label>
                <Form.Control
                  type="text"
                  name="cities"
                  value={formData.cities}
                  onChange={handleChange}
                  placeholder="Enter your City"
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formAvailability">
                <Form.Label>Availability</Form.Label>
                <Form.Select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="form-control-custom"
                >
                  <option value="">Select Availability</option>
                  <option value="available">Available</option>
                  <option value="not available">Not Available</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formAvailability">
                <Form.Label>Consultation</Form.Label>
                <Form.Select
                  name="consultation"
                  value={formData.consultation}
                  onChange={handleChange}
                  className="form-control-custom"
                >
                  <option value="">Select Consultation</option>
                  <option value="In-person">In-person</option>
                  <option value="Video call">Video call</option>
                  <option value="Both">
                    In-person & Video call
                  </option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Specialitie</Form.Label>
                <Form.Control
                  type="text"
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                  className="form-control-custom"
                  placeholder="Enter your Specialitie"
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formConditions">
                <Form.Label>Conditions</Form.Label>
                {formData.conditions.length === 0 && (
    <div className="row row-container" style={{ marginBottom: "10px" }}>
      <Form.Control
        type="text"
          name="conditions"
        value={formData.conditions}
        onChange={(e) => handleChange(e, 0, "conditions")}
        placeholder="Enter conditions"
        className="form-control-custom adjust-form"
      />
      <InputGroup.Text
        className="form-control-custom adjust-form-icon-one"
        onClick={() => handleAddItem("conditions")}
        aria-label="Add language"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="plus-edit-doctor"
        />
      </InputGroup.Text>
    </div>
  )}
                {formData.conditions.map((condition, index) => (
                  <div
                    className="row row-container"
                    key={index}
                    style={{ marginBottom: "10px" }}
                  >
                    <Form.Control
                      type="text"
                               name="conditions"
                      value={condition}
                      onChange={(e) => handleChange(e, index, "conditions")}
                      placeholder="Heart Diseases"
                      className="form-control-custom adjust-form"
                    />
                    <InputGroup.Text
                      className="form-control-custom adjust-form-icon-one"
                      onClick={() => handleAddItem("conditions")}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="plus-edit-doctor"
                      />
                    </InputGroup.Text>
                    {formData.conditions.length > 1 && (
                      <InputGroup.Text
                        className="form-control-custom adjust-form-icon-two"
                        onClick={() => handleRemoveItem(index, "conditions")}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="delete-edit-profile"
                        />
                      </InputGroup.Text>
                    )}
                  </div>
                ))}
              </Form.Group>
            </div>

  <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formLanguages">
  <Form.Label>Languages</Form.Label>
  {formData.languages.length === 0 && (
    <div className="row row-container" style={{ marginBottom: "10px" }}>
      <Form.Control
        type="text"
          name="languages"
        value={formData.languages}
        onChange={(e) => handleChange(e, 0, "languages")}
        placeholder="Enter language"
        className="form-control-custom adjust-form"
      />
      <InputGroup.Text
        className="form-control-custom adjust-form-icon-one"
        onClick={() => handleAddItem("languages")}
        aria-label="Add language"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="plus-edit-doctor"
        />
      </InputGroup.Text>
    </div>
  )}
  {formData.languages.map((language, index) => (
    <div
      className="row row-container"
      key={index}
      style={{ marginBottom: "10px" }}
    >
      <Form.Control
        type="text"
        name="languages"
        value={language}
        onChange={(e) => handleChange(e, index, "languages")}
        placeholder="Enter language"
        className="form-control-custom adjust-form"
      />
      <InputGroup.Text
        className="form-control-custom adjust-form-icon-one"
        onClick={() => handleAddItem("languages")}
        aria-label="Add language"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="plus-edit-doctor"
        />
      </InputGroup.Text>
      {formData.languages.length > 1 && (
        <InputGroup.Text
          className="form-control-custom adjust-form-icon-two"
          onClick={() => handleRemoveItem(index, "languages")}
          aria-label="Remove language"
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="delete-edit-profile"
          />
        </InputGroup.Text>
      )}
    </div>
  ))}
</Form.Group>

            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  type="text"
                  placeholder="Paste a URL"
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Twitter</Form.Label>
                <Form.Control
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="Paste Twitter URL"
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>LinkedIn</Form.Label>
                <Form.Control
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="Paste LinkedIn URL"
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="Paste Instagram URL"
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3" controlId="formHospitals">
  <Form.Label>Hospitals</Form.Label>

  {formData.hospitals.length === 0 && (
    <div className="row address-field-container" style={{ marginBottom: "10px" }}>
      <Form.Control
        type="text"
        name="name"
        value={formData.hospitals.name || ''}
        onChange={(e) => handleChange(e, 0, "hospitals", "name")}
        placeholder="Enter Name"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="street"
        value={formData.hospitals.street || ''}
        onChange={(e) => handleChange(e, 0, "hospitals", "street")}
        placeholder="Street"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="city"
        value={formData.hospitals.city || ''}
        onChange={(e) => handleChange(e, 0, "hospitals", "city")}
        placeholder="City"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="state"
        value={formData.hospitals.state || ''}
        onChange={(e) => handleChange(e, 0, "hospitals", "state")}
        placeholder="State"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="country"
        value={formData.hospitals.country || ''}
        onChange={(e) => handleChange(e, 0, "hospitals", "country")}
        placeholder="Country"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="zip"
        value={formData.hospitals.zip || ''}
        onChange={(e) => handleChange(e, 0, "hospitals", "zip")}
        placeholder="Zip"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="lat"
        value={formData.hospitals.lat || ''}
        onChange={(e) => handleChange(e, 0, "hospitals", "lat")}
        placeholder="Latitude"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="lng"
        value={formData.hospitals.lng || ''}
        onChange={(e) => handleChange(e, 0, "hospitals", "lng")}
        placeholder="Longitude"
        className="form-control-custom address-field"
      />
      <Button
        className="btn-custom-edit"
        onClick={() => setModalShow({ show: true, index: 0 })}
      >
        Select Location
      </Button>
      <InputGroup.Text
        className="form-control-custom adjust-form-icon-one-add"
        onClick={() => handleAddItem("hospitals")}
      >
        <FontAwesomeIcon icon={faPlus} className="plus-edit-doctor" />
      </InputGroup.Text>
    </div>
  )}

  {formData.hospitals.map((hospital, index) => (
    <div
      className="row address-field-container"
      key={index}
      style={{ marginBottom: "10px" }}
    >
      <Form.Control
        type="text"
        name="name"
        value={hospital.name}
        onChange={(e) => handleChange(e, index, "hospitals", "name")}
        placeholder="Enter Name"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="street"
        value={hospital.street}
        onChange={(e) => handleChange(e, index, "hospitals", "street")}
        placeholder="Street"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="city"
        value={hospital.city}
        onChange={(e) => handleChange(e, index, "hospitals", "city")}
        placeholder="City"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="state"
        value={hospital.state}
        onChange={(e) => handleChange(e, index, "hospitals", "state")}
        placeholder="State"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="country"
        value={hospital.country}
        onChange={(e) => handleChange(e, index, "hospitals", "country")}
        placeholder="Country"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="zip"
        value={hospital.zip}
        onChange={(e) => handleChange(e, index, "hospitals", "zip")}
        placeholder="Zip"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="lat"
        value={hospital.lat}
        onChange={(e) => handleChange(e, index, "hospitals", "lat")}
        placeholder="Latitude"
        className="form-control-custom address-field"
      />
      <Form.Control
        type="text"
        name="lng"
        value={hospital.lng}
        onChange={(e) => handleChange(e, index, "hospitals", "lng")}
        placeholder="Longitude"
        className="form-control-custom address-field"
      />
      <Button
        className="btn-custom-edit"
        onClick={() => setModalShow({ show: true, index })}
      >
        Select Location
      </Button>
      <InputGroup.Text
        className="form-control-custom adjust-form-icon-one-add"
        onClick={() => handleAddItem("hospitals")}
      >
        <FontAwesomeIcon icon={faPlus} className="plus-edit-doctor" />
      </InputGroup.Text>
      {formData.hospitals.length > 1 && (
        <InputGroup.Text
          className="form-control-custom adjust-form-icon-two-add"
          onClick={() => handleRemoveItem(index, "hospitals")}
        >
          <FontAwesomeIcon icon={faTrash} className="delete-edit-profile" />
        </InputGroup.Text>
      )}
    </div>
  ))}
</Form.Group>


          <div className="row mb-3">
            <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formInsurances">
  <Form.Label>Insurance</Form.Label>
  <div className="row row-container" style={{ marginBottom: "10px" }}>
    <Form.Control
      as="select"
      value="" 
      onChange={handleInsuranceChange}
      className="form-control-custom adjust-form"
    >
      <option value="" disabled>Select an Insurance</option>
      {allInsurances.map((insurance) => (
        <option key={insurance._id} value={insurance.name}>
          {insurance.name}
        </option>
      ))}
    </Form.Control>

  </div>
  {formData.insurances.map((insurance, index) => (
    <div
      className="row row-container row-gap"
      key={index}
      style={{ marginBottom: "10px" }}
    >
      <Form.Control
        type="text"
        name="insurances"
        value={insurance}
  
        placeholder="ABC Insurance"
        className="form-control-custom adjust-form"
      />
      {formData.insurances.length > 1 && (
        <InputGroup.Text
          className="form-control-custom adjust-form-icon-two-insurance"
          onClick={() => handleRemoveInsurance(index)}
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="delete-edit-profile"
          />
        </InputGroup.Text>
      )}
    </div>
  ))}
</Form.Group>

            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formAwards">
                <Form.Label>Awards</Form.Label>
                {formData.awards.length === 0 && (
    <div className="row row-container" style={{ marginBottom: "10px" }}>
      <Form.Control
        type="text"
          name="awards"
        value={formData.awards}
        onChange={(e) => handleChange(e, 0, "awards")}
        placeholder="Enter awards"
        className="form-control-custom adjust-form"
      />
      <InputGroup.Text
        className="form-control-custom adjust-form-icon-one"
        onClick={() => handleAddItem("awards")}
        aria-label="Add awards"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="plus-edit-doctor"
        />
      </InputGroup.Text>
    </div>
  )}
                {formData.awards.map((award, index) => (
                  <div
                    className="row row-container row-gap"
                    key={index}
                    style={{ marginBottom: "10px" }}
                  >
                    <Form.Control
                      type="text"
                      name="awards"
                      value={award}
                      onChange={(e) => handleChange(e, index, "awards")}
                      placeholder="Doctor of the quarter 2024"
                      className="form-control-custom adjust-form"
                    />
                    <InputGroup.Text
                      className="form-control-custom adjust-form-icon-one"
                      onClick={() => handleAddItem("awards")}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="plus-edit-doctor"
                      />
                    </InputGroup.Text>
                    {formData.awards.length > 1 && (
                      <InputGroup.Text
                        className="form-control-custom adjust-form-icon-two"
                        onClick={() => handleRemoveItem(index, "awards")}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="delete-edit-profile"
                        />
                      </InputGroup.Text>
                    )}
                  </div>
                ))}
              </Form.Group>
            </div>
          </div>

          <div className="row mb-3">
    <div className="col-md-6">
    <Form.Group className="mb-3" controlId="formCertificationProof">
      <Form.Label>Certification Proof</Form.Label>
      <Form.Control
        type="file"
        name="certificationProof"
        onChange={handleFileChange}
        className="form-control-custom"
      />
    </Form.Group>
    </div>
    <div className="col-md-6">
    <Form.Group className="mb-3" controlId="formBusinessProof">
      <Form.Label>Business Proof</Form.Label>
      <Form.Control
        type="file"
        name="businessProof"
        onChange={handleFileChange}
        className="form-control-custom"
      />
    </Form.Group>
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6">
    <Form.Group className="mb-3" controlId="formLicenseProof">
      <Form.Label>License Proof</Form.Label>
      <Form.Control
        type="file"
        name="licenseProof"
   
        onChange={handleFileChange}
        className="form-control-custom"
      />
    </Form.Group>
    </div>
    <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Fees</Form.Label>
                <Form.Control
                  type="text"
                  name="doctorFee"
                  value={formData.doctorFee}
                  onChange={handleChange}
                  placeholder="Enter your Fee"
                  className="form-control-custom"
                />
              </Form.Group>
            </div>
  </div>

          <Button
          variant="primary"
          type="submit"
          className="btn-custom"
          disabled={loading} 
        >
          {loading ? 'Updating...' : 'Update Profile'} 
        </Button>
        </Form>
      </Modal.Body>
      <LocationPicker 
   
       zoom={13}
       style={{ height: '400px', width: '100%' }}
       dragging={true} 
       zoomControl={true} 
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleLocationSelect={handleLocationSelect}
        
      />

    </div>
  );
};

export default DoctorPopUp;