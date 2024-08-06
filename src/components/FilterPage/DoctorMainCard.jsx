import React, { useState, useEffect } from 'react';
import './DoctorMainCard.css';
import { BsInfoCircle } from "react-icons/bs";
import DoctorCard from './DoctorCard';
import Sponsor from './Sponsor';
import VerifiedImg from '../../assests/img/Verified-SVG.svg';
import { RiArrowDownSLine } from "react-icons/ri";

const DoctorMainCard = ({ isMapExpanded, doctors = [] }) => {
    const [sortOption, setSortOption] = useState('');
    const [sortedDoctors, setSortedDoctors] = useState([]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortDoctors = (doctors) => {
        switch (sortOption) {
            case 'highestRated':
                return [...doctors].sort((a, b) => (b.rating || 0) - (a.rating || 0));
            case 'mostReviewed':
                return [...doctors].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
            default:
                return doctors;
        }
    };

    useEffect(() => {
        setSortedDoctors(sortDoctors(doctors));
    }, [sortOption, doctors]);

    const doctorCount = sortedDoctors.length;

    return (
        <div className="container p-0">
            <div className="row doctor-main-card">
                <div className={`col-7 ${isMapExpanded ? 'mapExpanded-doc-card-header' : 'doc-card-header'}`}>
                    <h4>{doctorCount} doctor{doctorCount !== 1 ? 's' : ''} available</h4>
                    <div className='d-flex'>
                        <img src={VerifiedImg} alt="Verified" style={{ width: "26px", height: "26px" }} />
                        <p>Book appointments with minimum wait-time & verified doctor details</p>
                    </div>
                </div>
                <div className={`${isMapExpanded ? 'd-none' : 'col-1'}`}></div>
            </div>
            <div className={`doctor-card-container sponsor-card ${isMapExpanded ? 'mapExpanded-sponsor-card' : ''}`}>
                <div className='sponsored-text d-flex'>
                    <BsInfoCircle />
                    <p>Sponsored</p>
                    <div className={`sort-by ${isMapExpanded ? 'col-5 mapExpanded-sort-by' : 'col-4'}`}>
                        <div className="form-group">
                            <label htmlFor="sortOptions">Sort by:</label>
                            <select id="sortOptions" onChange={handleSortChange}>
                                <option value="">Select</option>
                                <option value="highestRated">Highest Rated</option>
                                <option value="mostReviewed">Most Reviewed</option>
                            </select>
                            <RiArrowDownSLine className="arrow-icon-filter" />
                        </div>
                    </div>
                </div>
                <div>
                    {doctorCount > 0 ? (
                        sortedDoctors.map((doctor) => (
                            <DoctorCard key={doctor._id} doctor={doctor} isMapExpanded={isMapExpanded} />
                        ))
                    ) : (
                        <p>No doctors found based on the applied filters.</p>
                    )}
                </div>
            </div>
            <div className={`doctor-card-container result-card ${isMapExpanded ? 'expanded' : ''}`}>
                <p>All results</p>
                <Sponsor isMapExpanded={isMapExpanded} />
            </div>
        </div>
    );
};

export default DoctorMainCard;
