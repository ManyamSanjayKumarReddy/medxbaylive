// BlogPage.js
import React from "react";
import "./blog.css";
import {
  FaTag,
  FaTelegram,
  FaStar,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";


import { IoSearch } from "react-icons/io5";

const BlogPage = () => {
  const featuredPost = {
    imageUrl:
      "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
    title: "10 Drugs Commonly Prescribed for High Blood Pressure",
    description:
      "Learn about the classes of blood pressure medications, how blood pressure medications work, and the top blood pressure medications...",
  };

  const featuredSidePosts = [
    {
      title: "Everything to Know About Essential",
      date: "January 15, 2023",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
    },
    {
      title: "High Blood Pressure: Symptoms, Causes",
      date: "January 15, 2023",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
    },
    {
      title: "Blood Pressure Readings",
      date: "January 15, 2023",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
    },
    {
      title: "When to See a Doctor for High Pressure",
      date: "January 15, 2023",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
    },
  ];

  const causesAndRisksPosts = [
    {
      title: "Does stress cause high blood pressure?",
      description:
        "Consuming nicotine can have short- and long-term effects on your blood pressure and cardiovascular health...",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
      author: "John Doe",
      time: "5 min read",
    },
    {
      title: "Does salt increase blood pressure?",
      description:
        "Facts to consider onsuming nicotine can have short- and long-term effects on your blood pressure",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
      author: "Jane Smith",
      time: "3 min read",
    },
    {
      title: "Smoking and high blood pressure",
      description:
        "What to know onsuming nicotine can have short- and long-term effects on your blood",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
      author: "Michael Brown",
      time: "4 min read",
    },
  ];

  const testingAndDiagnosisPosts = [
    {
      title: "Blood Pressure Readings: What They Mean",
      description: "Understanding the numbers",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
      author: "Emily White",
      time: "6 min read",
    },
    {
      title: "How to Monitor Blood Pressure at Home",
      description: "Steps and tips",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
      author: "David Black",
      time: "7 min read",
    },
  ];

  const treatmentPosts = [
    {
      title: "Medication for High Blood Pressure",
      description: "Various medications can help manage high blood pressure...",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
      author: "Sarah Green",
      time: "4 min read",
    },
    {
      title: "Lifestyle Changes to Reduce Blood Pressure",
      description: "Learn how small changes can have a big impact...",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
      author: "Paul Brown",
      time: "5 min read",
    },
    {
      title: "Alternative Therapies for Hypertension",
      description: "Explore non-pharmaceutical options...",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
      author: "Lisa Blue",
      time: "6 min read",
    },
    {
      title: "Alternative Therapies for Hypertension",
      description: "Explore non-pharmaceutical options...",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
      author: "Lisa Blue",
      time: "6 min read",
    },
    {
      title: "Alternative Therapies for Hypertension",
      description: "Explore non-pharmaceutical options...",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
      author: "Lisa Blue",
      time: "6 min read",
    },

    {
      title: "Alternative Therapies for Hypertension",
      description: "Explore non-pharmaceutical options...",
      imageUrl:
        "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
      author: "Lisa Blue",
      time: "6 min read",
    },
  ];

  const livingPosts = [
    {
      imageUrl: "path/to/image3.jpg",
      title: "Living with A",
      description: "Description for living with A",
      time: "3 mins",
      name: "Nurse Johnson",
    },
    {
      imageUrl: "path/to/image4.jpg",
      title: "Living with B",
      description: "Description for living with B",
      time: "8 mins",
      name: "Nurse Williams",
    },
    {
      imageUrl: "path/to/image4.jpg",
      title: "Living with B",
      description: "Description for living with B",
      time: "8 mins",
      name: "Nurse Williams",
    },
    {
      imageUrl: "path/to/image4.jpg",
      title: "Living with B",
      description: "Description for living with B",
      time: "8 mins",
      name: "Nurse Williams",
    },
    {
      imageUrl: "path/to/image4.jpg",
      title: "Living with B",
      description: "Description for living with B",
      time: "8 mins",
      name: "Nurse Williams",
    },
    {
      imageUrl: "path/to/image4.jpg",
      title: "Living with B",
      description: "Description for living with B",
      time: "8 mins",
      name: "Nurse Williams",
    },
  ];

  const categories = [
    { title: "Hydration or Moisturization (10)", icon: FaTag },
    { title: "Cardiology (50)", icon: FaTag },
    { title: "Nutrition (40)", icon: FaTag },
    { title: "Exercise (50)", icon: FaTag },
  ];

  const newTreatmentData = [
    {
      title: "11 Natural Remedies for High Blood Pressure",
      description:
        "Unmanaged high blood pressure can increase your risk of heart disease and stroke. Along with medications, certain natural remedies may help manage your blood pressure...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/125",
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
    {
      title: "11 Natural Remedies for High Blood Pressure",
      description:
        "Unmanaged high blood pressure can increase your risk of heart disease and stroke. Along with medications, certain natural remedies may help manage your blood pressure...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/125",
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
    {
      title: "11 Natural Remedies for High Blood Pressure",
      description:
        "Unmanaged high blood pressure can increase your risk of heart disease and stroke. Along with medications, certain natural remedies may help manage your blood pressure...",
      author: "By Tessa Cooper",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/125",
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

  const newBloodPressureSpecialist = [
    {
      name: "Dr. Donald Hopkins, MD",
      specialist: "Cardio",
      rating: 3,
      address: "49 mi, 795 El Camino Real Palo Alto, CA 94301",
      instruction: [
        "Appt wasn't rushed",
        "Listened/answered questions",
        "Explains conditions well",
        "Found trustworthy",
        "Felt respected",
      ],
      imageUrl: "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
    },
    {
      name: "Dr. Donald Hopkins, MD",
      specialist: "Cardio",
      rating: 3,
      address: "49 mi, 795 El Camino Real Palo Alto, CA 94301",
      instruction: [
        "Appt wasn't rushed",
        "Listened/answered questions",
        "Explains conditions well",
        "Found trustworthy",
        "Felt respected",
      ],
      imageUrl: "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg",
    },
    {
      name: "Dr. Donald Hopkins, MD",
      specialist: "Cardio",
      rating: 3,
      address: "49 mi, 795 El Camino Real Palo Alto, CA 94301",
      instruction: [
        "Appt wasn't rushed",
        "Listened/answered questions",
        "Explains conditions well",
        "Found trustworthy",
        "Felt respected",
      ],
      imageUrl: "https://via.placeholder.com/600/400",
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

  const recentBlogData = [
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      chip: "health",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/75/10",
      readTime: "10 Minutes",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      chip: "health",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/75/10",
      readTime: "10 Minutes",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      chip: "health",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/75/10",
      readTime: "10 Minutes",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      chip: "health",
      date: "January 12, 2023",
      imageUrl: "https://via.placeholder.com/75/10",
      readTime: "10 Minutes",
    },
  ];

  const mostReadsData = [
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      chip: "health",
      date: "Sep 05, 2023",
      imageUrl: "https://via.placeholder.com/75/3",
      readTime: "10 Minutes",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      chip: "health",
      date: "Sep 05, 2023",
      imageUrl: "https://via.placeholder.com/75/3",
      readTime: "10 Minutes",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      chip: "health",
      date: "Sep 05, 2023",
      imageUrl: "https://via.placeholder.com/75/3",
      readTime: "10 Minutes",
    },
  ];

  

  const tags = [
    "info",
    "ecom",
    "dynamics",
    "social",
    "info",
    "ecom",
    "dynamics",
    "social",
  ];

  return (
    <div className="blog-page">
      <div className="main-content-blog">
        {/* Featured Section */}
        <h1>Featured</h1>
        <div className="featured-section">
          <div className="featured-post">
            <img
              src={featuredPost.imageUrl}
              alt="Featured Post"
              className="featured-img"
            />
            <div className="featured-details">
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.description}</p>
            </div>
          </div>

          {/* Featured Side Posts */}
          <div className="featured-side-posts">
            {featuredSidePosts.map((post, index) => (
              <div key={index} className="side-post-card">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="side-post-img"
                />
                <div className="side-post-details">
                  <h5>{post.title}</h5>
                  <span>{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Content Sections */}
        <BlogPostList title="Causes & Risks" posts={causesAndRisksPosts} />
        <BlogPostList
          title="Testing & Diagnosis"
          posts={testingAndDiagnosisPosts}
        />

        {/* Treatment Section */}
        {/* <Treatment posts={treatmentPosts} /> */}
        {/* <LivingWithHighBloodPressure posts={livingPosts} /> */}
        <NewTreatement
          newTreatmentData={newTreatmentData}
          heading={"Treatment"}
        />
        <HighBloodPressureSpecialist
          newBloodPressureSpecialist={newBloodPressureSpecialist}
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
            left:"-40px",
          }}
        />
        <span
    style={{
     fontSize:"18px",
      position: "absolute",
      right: "100px", // Position the icon inside the input field
      top: "14%",
      transform: "translateY(-50%)",
      pointerEvents: "none", // Make the icon unclickable
    }}
  >
   <IoSearch />

  </span>
        <div className="card  card-blog-user">
          <SidebarSection title="Categories" items={categories} />
          <NewRecentBlog
            recentBlogData={recentBlogData}
            heading={"Recent Blog"}
          />
          <NewRecentBlog
            recentBlogData={mostReadsData}
            heading={"Most Reads"}
          />

          <NewTags tags={tags} />
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
              <img src={post.imageUrl} alt={post.title} />
              <span className="post-author">
                <b>{post.author}</b>
              </span>
              <span className="post-time">{post.time}</span>
            </div>
            <div className="post-content">
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              <a href="#" className="read-more">
                Read more in {post.time} <FaLongArrowAltRight />
              </a>
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
        <h3>{title}</h3>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="sidebar-item">
            {item.icon && <item.icon className="sidebar-item-icon" />}
            <span>{item.title}</span>
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
                className="newtreatment-card-image"
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
  return (
    <div className="bloodPrSp-card-container">
      <div className="bloodPrSp-section-title">
        Top high blood pressure specialists
      </div>
      <div className="bloodPrSp-card-grid">
        {newBloodPressureSpecialist.map((card, index) => (
          <div key={index} className="bloodPrSp-card">
            
            <div className="bloodPrSp-card-content">
              <div className="bloodPrSp-card-content-heading">
              <img
              src={card.imageUrl}
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
                {card.address}
              </div>
              <div className="bloodPrSp-card-instruction">
                <span>Patient Tell Us:</span>{" "}
                {card.instruction.map((point, index) => (
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

const NewRecentBlog = ({ recentBlogData, heading }) => {
  return (
    <div className="recentBlog-card-container">
      <div className="recentBlog-section-header">
        <div className="recentBlog-section-title">{heading}</div>
        <div className="recentBlog-section-showAll">Show All</div>{" "}
      </div>

      <div className="recentBlog-card-grid">
        {recentBlogData.map((card, index) => (
          <div key={index} className="recentBlog-card">
            <div className="recentBlog-card-left">
              <img
                src={card.imageUrl}
                alt="Card thumbnail"
                className="recentBlog-card-image"
              />
            </div>
            <div className="recentBlog-card-right">
              <div className="recentBlog-card-flex">
                <div className="recentBlog-card-chips">{card.chip}</div>
                <div className="recentBlog-card-date">{card.date}</div>
              </div>
              <div className="recentBlog-card-title">{card.title}</div>

              <a href="##">
                <div className="recentBlog-card-readmore">
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


  
export default BlogPage;