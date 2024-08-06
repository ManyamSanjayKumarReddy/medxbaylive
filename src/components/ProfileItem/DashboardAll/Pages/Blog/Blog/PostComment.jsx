import React, { useState } from "react";
const PostComment = () => {
  const [isCurrentFocus, setIsCurrentFocus] = useState(null);
  const [newComment, setNewComment] = useState({
    comment: "",
    save: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Comment submitted:", newComment);
  };

  return (
    <div className="leave-comment-cnt">
      <h4 className="comments-title">Leave a Comment</h4>
      <form onSubmit={handleSubmit}>
        <div className="textarea-comment-post">
          <textarea
            value={newComment.comment}
            className="input-textarea-commit-post"
            onFocus={() => setIsCurrentFocus("comment")}
            onBlur={() => setIsCurrentFocus(null)}
            onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
          />
          <p
            className={`input-placeholder-commit-post ${newComment.comment || isCurrentFocus === "comment" ? "focused" : ""}`}
          >
            Comment <span style={{ color: "red" }}> *</span>
          </p>
        </div>
        
        <div className="comment-term-conformation-cnt">
          <input
            type="checkbox"
            checked={newComment.save}
            onChange={() => setNewComment({ ...newComment, save: !newComment.save })}
            className="comment-checkbox"
          />
          <span className="checkbox-comment-txt" >
            Save my name, email, and website in this browser for the next time I comment.
          </span>
        </div>
        <button type="submit" className="submit-button">Post Comment</button>
      </form>
    </div>
  );
};

export default PostComment;
