import React, { useEffect, useState } from 'react';
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
    uniqueLocations
}) => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const apiKey = 'AIzaSyApr-nSbv28HGFJxddFfjhtNM-xtF2YfMA'; // Ensure this is correctly set

    console.log('API Key:', apiKey); // Debugging line to check if API key is loaded

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
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=weekly`;
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

    const initMap = (googleMaps) => {
        if (!googleMaps) {
            console.error('Google Maps API not loaded');
            return;
        }

        const map = new googleMaps.Map(document.getElementById('map'), {
            zoom: 10,
            center: { lat: 20.5937, lng: 78.9629 } // Center map on India
        });

        if (!uniqueLocations || !Array.isArray(uniqueLocations)) {
            console.error('uniqueLocations is not properly defined:', uniqueLocations);
            return;
        }

        const bounds = new googleMaps.LatLngBounds();

        uniqueLocations.forEach(location => {
            if (!location.lat || !location.lng) {
                console.error('Location data is incomplete:', location);
                return;
            }

            const position = { lat: location.lat, lng: location.lng };

            const marker = new googleMaps.Marker({
                position: position,
                map: map,
                title: 'Free Time Slot Location'
            });

            const infoWindow = new googleMaps.InfoWindow({
                content: `Lat: ${location.lat}, Lng: ${location.lng}`
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });

            bounds.extend(position);
        });

        map.fitBounds(bounds);

        const maxZoomLevel = 10;
        map.addListener('bounds_changed', () => {
            if (map.getZoom() > maxZoomLevel) {
                map.setZoom(maxZoomLevel);
            }
        });
    };

    const handleContainerClick = (event) => {
        event.stopPropagation(); // Prevent click events from propagating outside the map container
    };

    return (
        <div className='map-container-edit' onClick={handleContainerClick}>
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
        </div>
    );
};

export default MapContainer;
