import React from "react";
import WidgetCard from "./WidgetCard";

const RelatedPost = () => {
  return (
    <div className="related-post-cnt">
      <div className="related-post-head">
        <h4>Related Posts</h4>
        <p>Show All</p>
      </div>
      <div className="suggestion-List">
        <WidgetCard />
      </div>
    </div>
  );
};

export default RelatedPost;
