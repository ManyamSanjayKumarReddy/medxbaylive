import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./blog.css";

const LivingWithHighBloodPressure = ({ posts }) => {
  return (
    <div className="living-section">
      <h3 className="living-title">Living with High Blood Pressure</h3>
      <div className="living-grid">
        {posts.map((post, index) => (
          <div key={index} className="living-card">
            <img src={post.imageUrl} alt={post.title} className="living-img" />
            <div className="living-text">
              <h4 className="living-heading">{post.title}</h4>
              <p className="living-description">{post.description}</p>
              <a href="##" className="living-read-more">
                Read more in {post.time} <FaLongArrowAltRight />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivingWithHighBloodPressure;
