import React, { useEffect, useState } from "react";
import BlogDetails from "./BlogDetails";
import PostComment from "./PostComment";
import { IoIosCalendar } from "react-icons/io";
import { TbSquareRoundedArrowDown } from "react-icons/tb";
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

const BlogCard = ({blogData,loadBlogs}) => {
  const [activeBlog, setActiveBlog] = useState(null);

  const getProfileImage = (formData) => {
  
    if (formData?.data?.type === 'Buffer') {
      return bufferToBase64(formData.data);
    } else if (typeof formData?.data === 'string') {
      return `data:image/jpeg;base64,${formData.data}`;
    } else {
      return profileImage;
    }
  };
  

  const handleBlogClick = (id) => {
    setActiveBlog((prev) => (prev == id ? null : id));
  };

  const blogs = Array.isArray(blogData) ? blogData : [blogData];

  return (
    <div className="blog-card-container">
      {blogs?.map((blog) => (
        <div
          key={blog._id}
          className="blog-card-wrapper"
          style={{ display: activeBlog && activeBlog !== blog._id ? 'none' : 'block' }}
        >
          <div  className="blog-card-cnt">
            <img src={getProfileImage(blog.image)} alt="blog" className="blog-card-img" />
            <div className="blog-card-profileInfo-cnt">
              <div className="profileInfo-cnt">
                <img
                  src={getProfileImage(blog.profilePicture)}
                  alt="profile"
                  className="blog-card-profile-img"
                />
                <div className="profileInfo">
                  <h4>{blog.author}</h4>
                  <p>{blog.authorTitle}</p>
                </div>
              </div>
              <div className="date-info-cnt">
                <IoIosCalendar size="1.1rem" />
                <p className="blue-text">{moment(blog.date).format('DD MMM YYYY')}</p>
              </div>
            </div>
            <div className="blog-content-preview-cnt">
              <h4>{blog.title}</h4>
              {/* <p>{blog.description}</p> */}
            </div>
            <div className="readMore-cnt" onClick={(e) => { e.preventDefault(); handleBlogClick(blog._id); }}>
              <h4>Read more in 8 Minutes</h4>
              <TbSquareRoundedArrowDown
                size="1.3rem"
                className="readMore-cnt-icon"
              />
            </div>
            {activeBlog == blog._id && (
              <div className="blogdetailstransition">
                <BlogDetails blog={blog} />
                <PostComment id={blog._id} loadBlogs={loadBlogs} />
              </div>
               
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;