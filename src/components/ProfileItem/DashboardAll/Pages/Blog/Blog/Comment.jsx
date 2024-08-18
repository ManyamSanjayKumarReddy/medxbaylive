import React from "react";
import { IoArrowUndo } from "react-icons/io5";
import profileImage from "../../../Assets/profileimg.png";
import moment from "moment";

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

const Comment = ({comment}) => {

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
    <div className="comments-read">
      {comment.map((comment, index) => (
        <div key={index} className="style-comment-cnt">
          <img src={getProfileImage(comment.profilePicture)} alt="profile-icon" className="profile-img" />
          <div className="comment">
            <p className="comment-title">{comment.username}</p>
            <p className="comment-time-txt">{moment(comment.date).fromNow()}</p>
            <p className="comment-txt">{comment.comment}</p>
          </div>
          {/* <div className="replay-btn">
            <IoArrowUndo />
            <span>Reply</span>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Comment;
