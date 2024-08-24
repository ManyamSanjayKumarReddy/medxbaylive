import React, { useState, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 51.505,
  lng: -0.09,
};


const LocationPicker = ({ show, handleClose, handleLocationSelect }) => {
  const [position, setPosition] = useState(center);
  const [map, setMap] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyApr-nSbv28HGFJxddFfjhtNM-xtF2YfMA', 
    libraries: ['places'],
  });

  const onMapClick = useCallback((e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setPosition({ lat, lng });
    handleLocationSelect(lat, lng);
  }, [handleLocationSelect]);

  const onMarkerDragEnd = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setPosition({ lat, lng });
    handleLocationSelect(lat, lng);
  };

  const onSearch = (event) => {
    event.preventDefault();
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchValue }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const { location } = results[0].geometry;
        setPosition({
          lat: location.lat(),
          lng: location.lng(),
        });
        map.panTo(location);
        handleLocationSelect(location.lat(), location.lng());
      }
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSearch} className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search for a location"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button type="submit" variant="primary" className="mt-2">Search</Button>
        </Form>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={13}
          onClick={onMapClick}
          onLoad={mapInstance => setMap(mapInstance)}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: 'greedy', 
          }}
        >
          <Marker
            position={position}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
          />
        </GoogleMap>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => handleLocationSelect(position.lat, position.lng)}
        >
          Select Location
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationPicker;
