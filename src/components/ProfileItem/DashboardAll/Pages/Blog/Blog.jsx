import React, { useEffect, useState } from 'react';
import "./blogs.css";

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import AddIcon from "./assets/plus.png";

import BlogCard from './Blog/BlogCard';
import RelatedPost from './widgets/RelatedPost';
import Tags from './widgets/Tags';
import MostReads from './widgets/MostReads';
import Categories from './widgets/Categories';
import AddNewBlog from './AddBlog/AddNewBlog'; 
import axios from 'axios';

const Blog = () => {
  const [showAddNewBlog, setShowAddNewBlog] = useState(false); 
  const [blogData,setBlogData]=useState([])
  const [tempBlog,setTempBlog]=useState([])
  const [reletedPost,setReletedPost]=useState([])
  const [tags,setTags]=useState([])
  const [mostReads,setMostReads]=useState([])
  const [categories,setCategories]=useState([])

  const handleAddClick = () => {
    setShowAddNewBlog(true); 
  };

  const handleCancel = () => {
    setShowAddNewBlog(false); 
  };

  const loadBlogs =async () =>{
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/doctor/profile/blogs`,
      { withCredentials: true }
    );
    if(response.data){
      setBlogData(response.data.blogs);
      setTempBlog(response.data.blogs)
    }else{
      setBlogData([]);
      console.log(response.data)
    }
  }
  const loadPosts =async () =>{
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/doctor/blogs`,
      { withCredentials: true }
    );
    if(response.data){
      var data=response.data;
      setReletedPost(data?.relatedPosts)
      setCategories(data?.categoryCountMap)
      setMostReads(data?.mostReadBlogs)
      setTags(data?.hashtagCountMap)
    }else{
      setBlogData([]);
      console.log(response.data)
    }
  }

  useEffect(()=>{
      loadBlogs()
      loadPosts()
  },[])

  const handleData = (data) => {
    setTempBlog(data)
  }

  const handleTags = (selectedTag) => {
    const filteredBlogs = blogData.filter(blog =>
      blog.hashtags && blog.hashtags.includes(selectedTag)
    );
    setTempBlog(filteredBlogs);
  };

  const handleCategories = (c) => {
    const filteredBlogs = blogData.filter(blog =>
      blog.categories && blog.categories.includes(c)
    );
    setTempBlog(filteredBlogs);
  };
  

  return (
    <>
      {showAddNewBlog ? (
        <AddNewBlog onCancel={handleCancel} loadBlogs={loadBlogs}/> 
      ) : (
        <div className="dashboard-blogs-container">
          <h2 className="blogs-title">Blogs</h2>
          <div className='review-scroll'>
            <div className="blogs-cnt">
              <div className="bloglist-cover">
                <div className="thoughts-cnt">
                  <input
                    type="text"
                    className="thoughts-input"
                    placeholder="Share your thoughts.."
                  />
                  <div className="add-btn" onClick={handleAddClick}>
                    <img src={AddIcon} alt="icon" className="add-icon" />
                  </div>
                </div>
                <div className="blog-list-cnt">
                  <BlogCard blogData={tempBlog} loadBlogs={loadBlogs}/>
                </div>
              </div>
              <div className="widget-cnt">
                <RelatedPost reletedPost={reletedPost} handleData={handleData}/>
                <Tags tags={tags} handleTags={handleTags}/>
                <MostReads mostReads={mostReads} handleData={handleData}/>
                <Categories categories={categories} handleCategories={handleCategories}/>   
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Blog;