// BlogPage.js
import React, { useEffect, useState } from "react";
import "./blog.css";
import { IoSearch } from "react-icons/io5";

import {
  FaTag,
  FaTelegram,
  FaStar,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import Treatment from "./TreatmentPage";
import LivingWithHighBloodPressure from "./bloodpress";
import axios from "axios";
import moment from "moment";
import profileimg from "../Assets/profileimg.png";
import { Link } from "react-router-dom";

const bufferToBase64 = (buffer) => {
  if (buffer?.type === "Buffer" && Array.isArray(buffer?.data)) {
    const bytes = new Uint8Array(buffer.data);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/jpeg;base64,${btoa(binary)}`;
  } else {
    console.error("Unexpected buffer type:", typeof buffer);
    return "";
  }
};

const getProfileImage = (formData) => {
  if (formData?.data?.type === "Buffer") {
    return bufferToBase64(formData.data);
  } else if (typeof formData?.data === "string") {
    return `data:image/jpeg;base64,${formData.data}`;
  } else {
    return profileimg;
  }
};

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [tempBlog, setTempBlog] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [hashtags, setHastags] = useState([]);
  const [recentBlog, setRecentBlog] = useState([]);
  const [mostReadBlog, setMostReadBlog] = useState([]);
  const [topRatedDoctors, setTopRatedDoctors] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState([]);
  const [sideFeatureBlog, setSideFeatureBlog] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadBlogs = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/blogs`
    );
    if (response.data) {
      var data = response.data;
      setHastags(data.hashtags);
      setCategoryData(data.categoryCounts);
      setRecentBlog(data.recentBlogs);
      setMostReadBlog(data.mostReadBlogs);
      setTopRatedDoctors(data.topRatedDoctors);
      setBlogData(response.data);
      setTempBlog(response.data);
      setCategories(data.blogsByCategory);
      const sortedBlogs = data.featuredBlogs.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setFeaturedBlog(sortedBlogs[0]);
      setSideFeatureBlog(sortedBlogs.slice(1));
    } else {
      setBlogData([]);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const newTreatmentData = [
    {
      title: "11 Natural Remedies for High Blood Pressure",
      description:
        "Unmanaged high blood pressure can increase your risk of heart disease and stroke. Along with medications, certain natural remedies may help manage your blood pressure...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl:
        "https://www.pexels.com/photo/smiling-woman-standing-near-plant-1996250/",
      readTime: "10 Minutes",
    },
    {
      title: "11 Natural Remedies for High Blood Pressure",
      description:
        "Unmanaged high blood pressure can increase your risk of heart disease and stroke. Along with medications, certain natural remedies may help manage your blood pressure...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl:
        "https://www.pexels.com/photo/smiling-woman-standing-near-plant-1996250/",
      readTime: "10 Minutes",
    },
    {
      title: "11 Natural Remedies for High Blood Pressure",
      description:
        "Unmanaged high blood pressure can increase your risk of heart disease and stroke. Along with medications, certain natural remedies may help manage your blood pressure...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl:
        "https://www.pexels.com/photo/smiling-woman-standing-near-plant-1996250/",
      readTime: "10 Minutes",
    },
    {
      title: "11 Natural Remedies for High Blood Pressure",
      description:
        "Unmanaged high blood pressure can increase your risk of heart disease and stroke. Along with medications, certain natural remedies may help manage your blood pressure...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl:
        "https://www.pexels.com/photo/smiling-woman-standing-near-plant-1996250/",
      readTime: "10 Minutes",
    },
    {
      title: "11 Natural Remedies for High Blood Pressure",
      description:
        "Unmanaged high blood pressure can increase your risk of heart disease and stroke. Along with medications, certain natural remedies may help manage your blood pressure...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl:
        "https://www.pexels.com/photo/smiling-woman-standing-near-plant-1996250/",
      readTime: "10 Minutes",
    },
    {
      title: "11 Natural Remedies for High Blood Pressure",
      description:
        "Unmanaged high blood pressure can increase your risk of heart disease and stroke. Along with medications, certain natural remedies may help manage your blood pressure...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/125",
      readTime: "10 Minutes",
    },
  ];

  const newHighBloodPressureTips = [
    {
      title: "How Much Sodium Per Day with High Blood Pressure?",
      description:
        "Though the amount of sodium people with high blood pressure should consume daily varies, general recommendations suggest...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/125",
      readTime: "10 Minutes",
    },
    {
      title: "How Much Sodium Per Day with High Blood Pressure?",
      description:
        "Though the amount of sodium people with high blood pressure should consume daily varies, general recommendations suggest...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/125",
      readTime: "10 Minutes",
    },
    {
      title: "How Much Sodium Per Day with High Blood Pressure?",
      description:
        "Though the amount of sodium people with high blood pressure should consume daily varies, general recommendations suggest...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/125",
      readTime: "10 Minutes",
    },
    {
      title: "How Much Sodium Per Day with High Blood Pressure?",
      description:
        "Though the amount of sodium people with high blood pressure should consume daily varies, general recommendations suggest...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/125",
      readTime: "10 Minutes",
    },
    {
      title: "How Much Sodium Per Day with High Blood Pressure?",
      description:
        "Though the amount of sodium people with high blood pressure should consume daily varies, general recommendations suggest...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/125",
      readTime: "10 Minutes",
    },
    {
      title: "How Much Sodium Per Day with High Blood Pressure?",
      description:
        "Though the amount of sodium people with high blood pressure should consume daily varies, general recommendations suggest...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/125",
      readTime: "10 Minutes",
    },
  ];

  const newMoreOnHighBloodPressure = [
    {
      title: "Herbs for High Blood Pressure: What to Know",
      description:
        "Some herbs contain several substances that may help treat high blood pressure. Examples of antihypertensive herbs include garlic, turmeric, and ginger...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/600/400",
      readTime: "10 Minutes",
    },
    {
      title: "Herbs for High Blood Pressure: What to Know",
      description:
        "Some herbs contain several substances that may help treat high blood pressure. Examples of antihypertensive herbs include garlic, turmeric, and ginger...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/600/400",
      readTime: "10 Minutes",
    },
    {
      title: "Herbs for High Blood Pressure: What to Know",
      description:
        "Some herbs contain several substances that may help treat high blood pressure. Examples of antihypertensive herbs include garlic, turmeric, and ginger...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/600/400",
      readTime: "10 Minutes",
    },
    {
      title: "Herbs for High Blood Pressure: What to Know",
      description:
        "Some herbs contain several substances that may help treat high blood pressure. Examples of antihypertensive herbs include garlic, turmeric, and ginger...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/600/400",
      readTime: "10 Minutes",
    },
    {
      title: "Herbs for High Blood Pressure: What to Know",
      description:
        "Some herbs contain several substances that may help treat high blood pressure. Examples of antihypertensive herbs include garlic, turmeric, and ginger...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/600/400",
      readTime: "10 Minutes",
    },
    {
      title: "Herbs for High Blood Pressure: What to Know",
      description:
        "Some herbs contain several substances that may help treat high blood pressure. Examples of antihypertensive herbs include garlic, turmeric, and ginger...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/600/400",
      readTime: "10 Minutes",
    },
  ];

  return (
    <div className="blog-page">
      <div className="main-content-blog">
        {/* Featured Section */}
        <h1>Featured</h1>
        <div className="featured-section">
          <div className="featured-post">
            <img
              src={getProfileImage(featuredBlog?.image)}
              alt="Featured Post"
              className="featured-img"
            />
            <div className="featured-details">
              <h2>{featuredBlog?.title}</h2>
              <p>{featuredBlog?.description?.slice(0,200)+"....."}</p>
            </div>
          </div>

          {/* Featured Side Posts */}
          <div className="featured-side-posts">
            {sideFeatureBlog.map((post, index) => (
              <div key={index} className="side-post-card">
                <img
                  src={getProfileImage(post.image)}
                  alt={post.title}
                  className="side-post-img"
                />
                <div className="side-post-details">
                  <h5>{post.title}</h5>
                  <span>{moment(post.date).format("MMMM DD, YYYY")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Content Sections */}
        {Object.entries(categories).map(([name, value], index) => (
          <BlogPostList key={index} title={name} posts={value} />
        ))}
        {/* <BlogPostList title="Causes & Risks" posts={causesAndRisksPosts} />
        <BlogPostList
          title="Testing & Diagnosis"
          posts={testingAndDiagnosisPosts}
        /> */}

        {/* Treatment Section */}
        {/* <Treatment posts={treatmentPosts} /> */}
        {/* <LivingWithHighBloodPressure posts={livingPosts} /> */}
        <NewTreatement
          newTreatmentData={newTreatmentData}
          heading={"Treatment"}
        />
        <HighBloodPressureSpecialist
          newBloodPressureSpecialist={topRatedDoctors}
        />
        <NewTreatement
          newTreatmentData={newHighBloodPressureTips}
          heading={"Living with High Blood Pressure"}
        />
        <NewMoreOnHighBloodPressure
          newMoreOnHighBloodPressure={newMoreOnHighBloodPressure}
        />

        {/* <Footer /> */}
      </div>

      {/* Sidebar */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "10px",
            width: "400px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            marginTop: "30px",
            marginLeft: "-350px",
            position: "relative",
            left: "-40px",
          }}
        />
        <span
          style={{
            fontSize: "18px",
            marginTop: "-20px",
            position: "relative",
            top: "-40px",
            left: "-20px",
          }}
        >
          <IoSearch />
        </span>

        <div className="card card-blog ">
          <SidebarSection title="Categories" items={categoryData} />
          <NewRecentBlog recent={recentBlog} heading={"Recent Blog"} />
          <NewRecentBlog recent={mostReadBlog} heading={"Most Reads"} />
          <NewTags tags={hashtags} />
        </div>
      </div>
    </div>
  );
};

const BlogPostList = ({ title, posts }) => {
  return (
    <div className="blog-section">
      <h3>{title}</h3>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <div className="post-meta">
              <img src={getProfileImage(post.image)} alt={post.title} />
              <span className="post-author">
                <b>{post.author}</b>
              </span>
              <span className="post-time">5 min read</span>
            </div>
            <div className="post-content">
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              {/* <a href="#" className="read-more">
                Read more in 5 min <FaLongArrowAltRight />
              </a> */}

              

<Link
                to={`/blogPost/${post._id}`}
                className="recentBlog-card-readmore"
              >
                Read more in 8 mins ⟶
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SidebarSection = ({ title, items }) => {
  return (
    <div className="sidebar-section">
      <div className="sidebar-header">
        <h3>{title}ing & Diagnosis</h3>
      </div>
      <ul>
        {Object.entries(items).map(([name, count], index) => (
          <li key={index} className="sidebar-item">
            {<FaTag className="sidebar-item-icon" />}
            <span>
              {name} ({count})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const NewTreatement = ({ newTreatmentData, heading }) => {
  return (
    <div className="newtreatment-card-container">
      <div className="newtreatment-section-title">{heading}</div>
      <div className="newtreatment-card-grid">
        {newTreatmentData.map((card, index) => (
          <div key={index} className="newtreatment-card">
            <div className="newtreatment-card-left">
              <img
                src={card.imageUrl}
                alt="Card thumbnail"
                className="newtreatment-card-image cards"
              />
              <div className="newtreatment-card-author-container">
                <div className="newtreatment-card-author">{card.author}</div>
                <div className="newtreatment-card-date">{card.date}</div>
              </div>
            </div>
            <div className="newtreatment-card-right">
              <div className="newtreatment-card-title">{card.title}</div>
              <p className="newtreatment-card-description">
                {card.description}
              </p>
              <a href="##">
                <div className="newtreatment-card-readmore">
                  Read more in {card.readTime} ⟶
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NewMoreOnHighBloodPressure = ({ newMoreOnHighBloodPressure }) => {
  return (
    <div className="moreBloodPr-card-container">
      <div className="moreBloodPr-section-title">
        More on high blood pressure
      </div>
      <div className="moreBloodPr-card-grid">
        {newMoreOnHighBloodPressure.map((card, index) => (
          <div key={index} className="moreBloodPr-card">
            <div className="moreBloodPr-card-left">
              <img
                src={card.imageUrl}
                alt="Card thumbnail"
                className="moreBloodPr-card-image"
              />
            </div>
            <div className="moreBloodPr-card-right">
              <div className="moreBloodPr-card-title">{card.title}</div>
              <p className="moreBloodPr-card-description">{card.description}</p>
              <div className="moreBloodPr-card-author-container">
                <div className="moreBloodPr-card-author">{card.author}</div>
                <div className="moreBloodPr-card-date">{card.date}</div>
              </div>
              <a href="##">
                <div className="moreBloodPr-card-readmore">
                  Read more in {card.readTime} ⟶
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HighBloodPressureSpecialist = ({ newBloodPressureSpecialist }) => {
  const instruction = [
    "Appt wasn't rushed",
    "Listened/answered questions",
    "Explains conditions well",
    "Found trustworthy",
    "Felt respected",
  ];

  return (
    <div className="bloodPrSp-card-container">
      <div className="bloodPrSp-section-title">Top Rated Heart specialists</div>
      <div className="bloodPrSp-card-grid">
        {newBloodPressureSpecialist.map((card, index) => (
          <div key={index} className="bloodPrSp-card">
            <div className="bloodPrSp-card-content">
              <div className="bloodPrSp-card-content-heading">
                <img
                  src={getProfileImage(card.profilePicture)}
                  alt="Card thumbnail"
                  className="bloodPrSp-card-image"
                />
                <div className="bloodPrSp-card-title">{card.name}</div>
                <div className="bloodPrSp-card-rating">
                  <FaStar className="starr" />
                  {card.rating}
                </div>
              </div>
              <div className="bloodPrSp-card-specialist">{card.specialist}</div>
              <div className="bloodPrSp-card-address">
                <FaMapMarkerAlt className="bloodPrSp-card-location" />
                {card.city}
                {","}
                {card.state}
              </div>
              <div className="bloodPrSp-card-instruction">
                <span>Patient Tell Us:</span>{" "}
                {instruction.map((point, index) => (
                  <div key={index}>
                    <FaStar className="str" />
                    {point}
                  </div>
                ))}
              </div>
              <button className="bloodPrSp-card-btn">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NewRecentBlog = ({ recent, heading }) => {
  return (
    <div className="recentBlog-card-container">
      <div className="recentBlog-section-header">
        <div className="recentBlog-section-title">{heading}</div>
        {/* <div className="recentBlog-section-showAll">Show All</div>{" "} */}
      </div>

      <div className="recentBlog-card-grid">
        {recent.map((card, index) => (
          <div key={index} className="recentBlog-card">
            <div className="recentBlog-card-left">
              <img
                src={getProfileImage(card.image)}
                alt="Card thumbnail"
                className="recentBlog-card-image"
              />
            </div>
            <div className="recentBlog-card-right">
              <div className="recentBlog-card-flex">
                <div className="recentBlog-card-chips">
                  {card.categories[0]}
                </div>
                <div className="recentBlog-card-date">
                  {moment(card.date).format("MMM DD, YYYY")}
                </div>
              </div>
              <div className="recentBlog-card-title">{card.title}</div>

              {/* <a href="##">
                <div className="recentBlog-card-readmore">
                  Read more in 8 mins ⟶
                </div>
              </a> */}

              <Link
                to={`/blogPost/${card._id}`}
                className="recentBlog-card-readmore"
              >
                Read more in 8 mins ⟶
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NewTags = ({ tags }) => {
  return (
    <div className="tags-card-container">
      <div className="tags-section-header">
        <div className="tags-section-title">{"Tags"}</div>
      </div>
      <div className="tags-chips">
        {tags.map((tag, index) => (
          <div key={index} className="tags-chip">
            <div className="tags-chip-text">{tag}</div>
            <FaTimes className="tags-chip-close" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <img
            src="https://via.placeholder.com/130/10"
            alt="Logo"
            className="footer-logo"
          />
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            <li>
              <a href="#home">Home Page</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#services">FAQs</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#terms">Documentation</a>
            </li>
            <li>
              <a href="#terms">Site Map</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Subscribe</h3>
          <div className="footer-sub">
            <input type="email" placeholder="Your email" />
            <button type="submit">
              <FaTelegram size={17} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Global Wellness Alliance. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Blog;
