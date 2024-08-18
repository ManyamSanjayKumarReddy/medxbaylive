import moment from "moment";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import profileimg from "../../../Assets/profileimg.png";

const WidgetCard = ({reletedPost,handleData}) => {
  
  var post =reletedPost
  
  const getProfile = (profile) =>{
    const profileImageData = profile.data
          ? `data:image/jpeg;base64,${profile.data}` // Update the prefix if the image is not JPEG
          : profileimg;
    return profileImageData;      
  }

  return (
    <div className="widget-cards-container">
      {post?.map((item) => (
        <div className="widget-card" key={item._id} onClick={() => handleData(item)}>
          <img src={getProfile(item.image)} alt="post-img" className="widget-img-preview" />
          <div className="post-details-cnt">
            <div className="card-tag-time">
              <p className="post-preview-tag">{item.categories[0]}</p>
              <p className="post-preview-date">{moment(item.date).format('DD MMM YYYY')}</p>
            </div>
            <h4>{item.title}</h4>
            <div className="widget-card-readMore-cnt">
              <h4>Read more in 8 Minutes</h4>
              <FaLongArrowAltRight size="1rem" className="readMore-cnt-icon" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WidgetCard;
