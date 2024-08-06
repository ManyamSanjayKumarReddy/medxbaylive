import React, { useEffect } from 'react';
import './mapcontainer.css';
import { IoSearch } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";

const MapContainer = ({ expanded, searchInput, onExpandToggle, onSearchInputChange, onSearchButtonClick, onResetClick }) => {

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (expanded && !event.target.closest('.map-container-edit')) {
                onExpandToggle();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [expanded, onExpandToggle]);

    const handleContainerClick = (event) => {
        event.stopPropagation();
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
                    <iframe
                        className="mapFrame"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509349!2d144.9631579153587!3d-37.81627974201782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5772d5fd411f07b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1619929516970"
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps"
                    ></iframe>
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
