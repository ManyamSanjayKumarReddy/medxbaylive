import React from "react";
import Comment from "./Comment";
import { IoIosCalendar } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { LuEye } from "react-icons/lu";
import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import moment from "moment";
import profileImage from "../../../Assets/profileimg.png";

const bufferToBase64 = (buffer) => {
  if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
    const bytes = new Uint8Array(buffer.data);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/jpeg;base64,${btoa(binary)}`;
  } else {
    console.error('Unexpected buffer type:', typeof buffer);
    return '';
  }
};

function BlogDetails({blog}) {
  console.log(blog)

  const getProfileImage = (formData) => {
  
    if (formData?.data?.type === 'Buffer') {
      return bufferToBase64(formData.data);
    } else if (typeof formData?.data === 'string') {
      return `data:image/jpeg;base64,${formData.data}`;
    } else {
      return profileImage;
    }
  };

  return (
        <div className="blog-cnt">
          <div className="blog-post-cnt">
            <h4>{blog.title}</h4>
            <div className="blog-status-info">
              <p className="read-more-text">Read more in 8 Minutes</p>
              <div className="blog-status">
                <div className="date-info-cnt">
                  <IoIosCalendar size="1.1rem" className="date-info-cnt-icon" />
                  <p className="blue-text">{moment(blog.date).format('DD MMM YYYY')}</p>
                </div>
                <div className="date-info-cnt">
                  <TbMessage size="1.1rem" className="date-info-cnt-icon"/>
                  <p className="blue-text">{blog.comments.length}</p>
                </div>
                <div className="date-info-cnt">
                  <LuEye size="1.1rem" className="date-info-cnt-icon"/>
                  <p className="blue-text">{blog.readCount}</p>
                </div>
              </div>
            </div>

            <img
              src={getProfileImage(blog.image)}
              alt="blog-img"
              className="blog-image"
            />
            <p className="blog-description">
              {blog.description}
            </p>
            <div className="social-reach-cnt">
              <IoLogoFacebook className="facebook-icon"/>
              <span>2.5k</span>
            </div>
            <div className="blog-tags">
              {blog.hashtags.map((e) => (
                <div key={e} className="blog-tags-content">
                  <span className="blog-tags-item">{e}</span>
                </div>
              ))}
            </div>

          </div>
          
          <div className="blogger-details-cnt profileInfo">
            <img
              src={getProfileImage(blog.profilePicture)}
              alt="profile-img"
              className="profile-img"
            />
            <h4>{blog.author}</h4>
            <p>{blog.autherTitle}</p>
            <p className="profile-bio">
              {/* {author.aboutMe} */}
            </p>
            <div className="profile-socials-cnt">
              <IoLogoFacebook className="facebook-icon"/>
              <IoLogoLinkedin className="facebook-icon"/>
              <FaTwitter className="facebook-icon"/>
              <SiInstagram className="facebook-icon"/>
            </div>
          </div>
          <div className="comments-cnt">
            <h4 className="comments-title">Comments</h4>
            <Comment comment={blog.comments}/>  
          </div>
        </div>
  )
}

export default BlogDetails