import React from "react";
import WidgetCard from "./WidgetCard";

const MostReads = ({mostReads,handleData}) => {
  return (
    <div className="related-post-cnt">
      <div className="related-post-head">
        <h4>Most Reads</h4>
        {/* <p>Show All</p> */}
      </div>
      <div className="suggestion-List">
        <WidgetCard reletedPost={mostReads} handleData={handleData} />
      </div>
    </div>
  );
};

export default MostReads;
