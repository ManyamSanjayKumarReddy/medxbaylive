import React from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import './blog.css';

const Treatment = ({ posts }) => {
  return (
    <div className="treatment-section">
      <h3 className="treatment-title">Treatment</h3>
      <div className="treatment-grid">
        {posts.map((post, index) => (
          <div key={index} className="treatment-card">
            <img src={post.imageUrl} alt={post.title} className="treatment-img" />
            <div className="treatment-text">
              <h4 className="treatment-heading">{post.title}</h4>
              <p className="treatment-description">{post.description}</p>
              <a href="#" className="treatment-read-more">Read more in {post.time} <FaLongArrowAltRight /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Treatment;