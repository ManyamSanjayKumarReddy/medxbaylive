import React from "react";

const Tags = ({ tags,handleTags }) => {
  return (
    <div className="tags-widget-cnt">
      <div className="related-post-head">
        <h4>Tags</h4>
      </div>
      <div className="tags-flex">
        {Object.entries(tags).map(([tag, count], index) => (
          <div className="hastags-header" key={index} onClick={() => handleTags(tag)}>
            <span className="widget-tag">{tag} ({count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
