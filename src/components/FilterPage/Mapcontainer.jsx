import React, { useEffect, useRef, useState } from 'react';
import './mapcontainer.css';
import { IoSearch } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";

const MapContainer = ({
    expanded,
    searchInput,
    onExpandToggle,
    onSearchInputChange,
    onSearchButtonClick,
    onResetClick,
    uniqueLocations,
    onClickOutside

}) => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [locationDenied, setLocationDenied] = useState(false);
    const mapRef = useRef(null);  // Reference for map container

    const apiKey = 'AIzaSyApr-nSbv28HGFJxddFfjhtNM-xtF2YfMA';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mapRef.current && !mapRef.current.contains(event.target)) {
                onClickOutside(); // Call the function passed as prop
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClickOutside]);

    const loadGoogleMapsScript = () => {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
                resolve(window.google.maps);
                return;
            }

            if (window.google && window.google.maps) {
                resolve(window.google.maps);
                return;
            }

            window.initMap = () => {
                if (window.google && window.google.maps) {
                    resolve(window.google.maps);
                } else {
                    reject(new Error('Google Maps API not loaded'));
                }
            };

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=weekly&libraries=geometry`;
            script.async = true;
            script.defer = true;
            script.onerror = (error) => {
                reject(error);
            };
            document.head.appendChild(script);
        });
    };

    useEffect(() => {
        loadGoogleMapsScript()
            .then((googleMaps) => {
                setMapLoaded(true);
                if (uniqueLocations) {
                    initMap(googleMaps);
                } else {
                    console.warn('uniqueLocations is not available');
                }
            })
            .catch((error) => {
                console.error('Error loading Google Maps:', error);
            });
    }, [uniqueLocations]);

    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    },
                     error => {
                        alert('Location access is required to show your position on the map. Please enable location services in your browser settings.');
                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    };

    // const handleLocationRequest = () => {
    //     setLocationDenied(false); // Reset the location denial state
    //     getUserLocation()
    //         .then((location) => {
    //             // Handle successful location retrieval
    //             console.log('Location retrieved:', location);
    //             // Initialize the map with the user's location or update the map
    //             loadGoogleMapsScript().then((googleMaps) => initMap(googleMaps));
    //         })
    //         .catch((error) => {
    //             console.error('Error getting location:', error);
    //         });
    // };

    const calculateDistance = (googleMaps, userLocation, targetLocation) => {
        if (!userLocation || !targetLocation || !userLocation.lat || !userLocation.lng || !targetLocation.lat || !targetLocation.lng) {
            setLocationDenied(true); // Show the location permission message
            return null; // Stop further execution
        }
    
        const userLatLng = new googleMaps.LatLng(userLocation.lat, userLocation.lng);
        const targetLatLng = new googleMaps.LatLng(targetLocation.lat, targetLocation.lng);
        return googleMaps.geometry.spherical.computeDistanceBetween(userLatLng, targetLatLng);
    };

    const initMap = async (googleMaps) => {
        if (!googleMaps) {
            console.error('Google Maps API not loaded');
            return;
        }

        let userLocation;
        const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Center map on India initially
        const map = new googleMaps.Map(document.getElementById('map'), {
            zoom: 10,
            center: defaultCenter // Set the default center
        });

        const bounds = new googleMaps.LatLngBounds();

        try {
            userLocation = await getUserLocation();
            const userMarker = new googleMaps.Marker({
                position: userLocation,
                map: map,
                title: 'Your Location',
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });

            bounds.extend(userLocation);

            const userInfoWindow = new googleMaps.InfoWindow({
                content: 'You are here'
            });

            userMarker.addListener('click', () => {
                userInfoWindow.open(map, userMarker);
            });

            map.setCenter(userLocation);  // Center map on user's location
            map.setZoom(12); // Adjust zoom level for a closer view of the user's location

        } catch (error) {
            console.error('Error getting user location:', error);
            map.setCenter(defaultCenter); // If user location is not available, center the map on default location
        }

        if (uniqueLocations && Array.isArray(uniqueLocations)) {
            uniqueLocations.forEach(location => {
                if (!location.lat || !location.lng) {
                    console.error('Location data is incomplete:', location);
                    return;
                }

                const position = { lat: location.lat, lng: location.lng };
                const distanceInMeters = calculateDistance(googleMaps, userLocation, position);
                const distanceInKm = (distanceInMeters / 1000).toFixed(2); // Convert meters to kilometers

                const marker = new googleMaps.Marker({
                    position: position,
                    map: map,
                    title: 'Free Time Slot Location'
                });

                const infoWindow = new googleMaps.InfoWindow({
                    content: `Hospital: ${location.name}, City: ${location.city}, Distance: ${distanceInKm} km`
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });

                bounds.extend(position);
            });
        } else {
            console.error('uniqueLocations is not properly defined:', uniqueLocations);
        }

        map.fitBounds(bounds);

        const maxZoomLevel = 10;
        map.addListener('bounds_changed', () => {
            if (map.getZoom() > maxZoomLevel) {
                map.setZoom(maxZoomLevel);
            }
        });
    };

    const handleContainerClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className='map-container-edit' onClick={handleContainerClick} ref={mapRef}>
            <div className={` ${expanded ? 'mapExpanded-mapHead' : 'mapHead'}`}>
                <div className={`mapContainer ${expanded ? 'expanded' : ''}`}>
                    <div className={` map-sort-by ${expanded ? '' : 'mapExpanded-sort-by'}`}>
                        <div className="map-form-group">
                            <label htmlFor="sort">Sort By</label>
                            <select id="sort">
                                <option value="relevance" className='custom-option'>Relevance</option>
                                <option value="distance" className='custom-option'>Distance</option>
                                <option value="rating" className='custom-option'>Rating</option>
                            </select>
                            <RiArrowDownSLine className="map-arrow-icon-filter" />
                        </div>
                    </div>
                    {mapLoaded ? (
                        <div id="map" style={{ height: '100vh', width: '100%' }}></div>
                    ) : (
                        <div>Loading map...</div>
                    )}
                    {expanded ? (
                        <div className="searchInputContainer">
                            <input
                                type="text"
                                className="searchInput"
                                placeholder="Enter search term"
                                value={searchInput}
                                onChange={onSearchInputChange}
                            />
                            <button className="searchButton" onClick={onSearchButtonClick}>
                                <IoSearch />
                            </button>
                        </div>
                    ) : (
                        <div className="searchButtonContainer">
                            <button className="searchButton" onClick={onExpandToggle}>
                                Search on Map <IoSearch />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* {locationDenied && (
                <div className="location-denied-prompt">
                    <p>Location access is required to show your position on the map. Please enable location services in your browser settings.</p>
                    <button onClick={handleLocationRequest}>Try Again</button>
                </div>
            )} */}
        </div>
    );
};

export default MapContainer;
