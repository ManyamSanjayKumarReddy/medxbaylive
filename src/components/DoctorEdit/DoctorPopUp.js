import React, { useState, useEffect } from 'react';
import { Modal, Form, Button,InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import doctor from '../../assests/img/doctorprofile.jpeg'
import axios from 'axios';
// import '../DoctorEdit/DoctorPopUp.css'
const DoctorPopUp = ({ show, handleClose }) => {
  useEffect(() => {
    import('../DoctorEdit/DoctorPopUp.css');
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    aboutMe: '',
    dateOfBirth: '',
    email: '',
    gender: '',
    country: '',
    state: '',
    cities: '',
    availability: '',
    consultation: '',
    speciality: '',
    conditions: [''],
    languages: [''],
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    hospitals: [{ name: '', street: '', city: '', state: '', country: '', zip: '' }],
    insurances: [''],
    awards: [''],
    profilePicture: null
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);




  const handleChange = (e, index, field, nestedField) => {
    const newValue = e.target.value;
    setFormData(prevData => {
      const newData = { ...prevData };
      if (nestedField) {
        newData[field] = newData[field].map((item, i) => i === index ? { ...item, [nestedField]: newValue } : item);
      } else if (Array.isArray(newData[field])) {
        newData[field] = newData[field].map((item, i) => i === index ? newValue : item);
      } else {
        newData[e.target.name] = newValue;
      }
      return newData;
    });
  };


  const handleAddItem = (field) => {
    setFormData(prevData => {
      const newData = {
        ...prevData,
        [field]: [...prevData[field], field === 'hospitals' ? { name: '', street: '', city: '', state: '', country: '', zip: '' } : ''],
      };
      localStorage.setItem('doctorFormData', JSON.stringify(newData)); // Save to localStorage
      return newData;
    });
  };

  const handleRemoveItem = (index, field) => {
    setFormData(prevData => {
      const newData = {
        ...prevData,
        [field]: prevData[field].filter((_, i) => i !== index),
      };
      localStorage.setItem('doctorFormData', JSON.stringify(newData)); // Save to localStorage
      return newData;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevData => ({
      ...prevData,
      profilePicture: file
    }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicturePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    import('../DoctorEdit/DoctorPopUp.css');

    // Load form data from localStorage
    const savedData = localStorage.getItem('doctorFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    const email = localStorage.getItem('doctorEmail');
    if (email) {
      setFormData(prevDoctor => ({
        ...prevDoctor,
        email
      }));
    }
  }, []);


  useEffect(() => {
    document.title = "Doctor-Edit";
    
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/doctor/profile/update', { withCredentials: true });
        const formData = response.data;

      
        if (formData.dateOfBirth) {
          const date = new Date(formData.dateOfBirth);
          const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
          formData.dateOfBirth = formattedDate;
        }

        console.log("API Response:", formData);
        setFormData(formData);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          if (typeof item === 'object') {
            for (const nestedKey in item) {
              form.append(`${key}[${index}][${nestedKey}]`, item[nestedKey]);
            }
          } else {
            form.append(`${key}[${index}]`, item);
          }
        });
      } else {
        form.append(key, formData[key]);
      }
    }
    
    if (formData.profilePicture) {
      form.append('profilePicture', formData.profilePicture);
    }
    
    try {
      const response = await axios.post('http://localhost:8000/doctor/profile/update', form, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.success) {
        console.log('Profile updated successfully:', response.data);
      } else {
        console.error('Failed to update profile:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <Modal.Header>

       
        <Modal.Title className='model-header'>
   
     Edit Your Profile
        </Modal.Title>
        <button type="button" className="btn-close-custom" aria-label="Close" onClick={handleClose}>
          x
        </button>
      </Modal.Header>
    
      <Modal.Body className="modal-body-scrollable">
      <div className='profile-edit-outter'>
          {profilePicturePreview ? (
            <img src={profilePicturePreview} alt="Profile" className='doctoreditimage-edit' />
          ) : (
            <img src={doctor} alt="Profile" className='doctoreditimage-edit' />
          )}
        </div>
        <label className='choose-file'>
          Choose File
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            style={{ display: 'none' }}
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
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
  <option value="In-person & Video call">In-person & Video call</option>

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
                {formData.conditions.map((condition, index) => (
                  <div className='row row-container' key={index} style={{ marginBottom: '10px' }}>
                    <Form.Control
                      type="text"
                      value={condition}
                      onChange={(e) => handleChange(e, index, 'conditions')}
                      placeholder="Heart Diseases"
                      className="form-control-custom adjust-form"
                    />
                    <InputGroup.Text className="form-control-custom adjust-form-icon-one" onClick={() => handleAddItem('conditions')}>
                      <FontAwesomeIcon icon={faPlus} className='plus-edit-doctor' />
                    </InputGroup.Text>
                    {formData.conditions.length > 1 && (
                      <InputGroup.Text className="form-control-custom adjust-form-icon-two" onClick={() => handleRemoveItem(index, 'conditions')}>
                        <FontAwesomeIcon icon={faTrash} className='delete-edit-profile' />
                      </InputGroup.Text>
                    )}
                  </div>
                ))}
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formLanguages">
                <Form.Label>Languages</Form.Label>
                {formData.languages.map((language, index) => (
                  <div className='row row-container' key={index} style={{ marginBottom: '10px' }}>
                    <Form.Control
                      type="text"
                      value={language}
                      onChange={(e) => handleChange(e, index, 'languages')}
                      placeholder="English"
                      className="form-control-custom adjust-form"
                    />
                    <InputGroup.Text className="form-control-custom adjust-form-icon-one" onClick={() => handleAddItem('languages')}>
                      <FontAwesomeIcon icon={faPlus} className='plus-edit-doctor' />
                    </InputGroup.Text>
                    {formData.languages.length > 1 && (
                      <InputGroup.Text className="form-control-custom adjust-form-icon-two" onClick={() => handleRemoveItem(index, 'languages')}>
                        <FontAwesomeIcon icon={faTrash} className='delete-edit-profile' />
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
            {formData.hospitals.map((hospital, index) => (
              <div className='row address-field-container' key={index} style={{ marginBottom: '10px' }}>
                <Form.Control
                  type="text"
                  name="name"
                  value={hospital.name}
                  onChange={(e) => handleChange(e, index, 'hospitals', 'name')}
                  placeholder="Enter Name"
                  className="form-control-custom address-field"
                />
                <Form.Control
                  type="text"
                  name="street"
                  value={hospital.street}
                  onChange={(e) => handleChange(e, index, 'hospitals', 'street')}
                  placeholder="Street"
                  className="form-control-custom address-field"
                />
          <Form.Control
  type="text"
  name="city"
  value={hospital.city}
  onChange={(e) => handleChange(e, index, 'hospitals', 'city')}
  placeholder="City"
  className="form-control-custom address-field"
/>

                <Form.Control
                  type="text"
                  name="state"
                  value={hospital.state}
                  onChange={(e) => handleChange(e, index, 'hospitals', 'state')}
                  placeholder="State"
                  className="form-control-custom address-field"
                />
              <Form.Control
  type="text"
  name="country"
  value={hospital.country}
  onChange={(e) => handleChange(e, index, 'hospitals', 'country')}
  placeholder="Country"
  className="form-control-custom address-field"
/>
<Form.Control
  type="text"
  name="zip"
  value={hospital.zip}
  onChange={(e) => handleChange(e, index, 'hospitals', 'zip')}
  placeholder="Zip"
  className="form-control-custom address-field"
/>
<InputGroup.Text className="form-control-custom adjust-form-icon-one-add" onClick={() => handleAddItem('hospitals')}>
  <FontAwesomeIcon icon={faPlus} className='plus-edit-doctor' />
</InputGroup.Text>
{formData.hospitals.length > 1 && (
  <InputGroup.Text className="form-control-custom adjust-form-icon-two-add" onClick={() => handleRemoveItem(index, 'hospitals')}>
    <FontAwesomeIcon icon={faTrash} className='delete-edit-profile' />
  </InputGroup.Text>
                )}
              </div>
            ))}
          </Form.Group>




              <div className="row mb-3">
      <div className="col-md-6">
        <Form.Group className="mb-3" controlId="formInsurances">
          <Form.Label>Insurance</Form.Label>
          {formData.insurances.map((insurance, index) => (
            <div className='row row-container row-gap' key={index} style={{ marginBottom: '10px' }}>
              <Form.Control
                type="text"
                name="insurances"
                value={insurance}
                onChange={(e) => handleChange(e, index, 'insurances')}
                placeholder="ABC Insurance"
                className="form-control-custom adjust-form"
              />
              <InputGroup.Text
                className="form-control-custom adjust-form-icon-one"
                onClick={() => handleAddItem('insurances')}
              >
                <FontAwesomeIcon icon={faPlus} className='plus-edit-doctor' />
              </InputGroup.Text>
              {formData.insurances.length > 1 && (
                <InputGroup.Text
                  className="form-control-custom adjust-form-icon-two"
                  onClick={() => handleRemoveItem(index, 'insurances')}
                >
                  <FontAwesomeIcon icon={faTrash} className='delete-edit-profile' />
                </InputGroup.Text>
              )}
            </div>
          ))}
        </Form.Group>
      </div>

      <div className="col-md-6">
        <Form.Group className="mb-3" controlId="formAwards">
          <Form.Label>Awards</Form.Label>
          {formData.awards.map((award, index) => (
            <div className='row row-container row-gap' key={index} style={{ marginBottom: '10px' }}>
              <Form.Control
                type="text"
                name="awards"
                value={award}
                onChange={(e) => handleChange(e, index, 'awards')}
                placeholder="Doctor of the quarter 2024"
                className="form-control-custom adjust-form"
              />
              <InputGroup.Text
                className="form-control-custom adjust-form-icon-one"
                onClick={() => handleAddItem('awards')}
              >
                <FontAwesomeIcon icon={faPlus} className='plus-edit-doctor' />
              </InputGroup.Text>
              {formData.awards.length > 1 && (
                <InputGroup.Text
                  className="form-control-custom adjust-form-icon-two"
                  onClick={() => handleRemoveItem(index, 'awards')}
                >
                  <FontAwesomeIcon icon={faTrash} className='delete-edit-profile' />
                </InputGroup.Text>
              )}
            </div>
          ))}
        </Form.Group>
      </div>
    </div>
         
          <Button variant="primary" type="submit" className="btn-custom">
            Update Profile
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DoctorPopUp;
