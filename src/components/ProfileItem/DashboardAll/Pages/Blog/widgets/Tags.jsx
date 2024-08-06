import React from "react";

const Tags = () => {
  const tagsData = [
    { name: "Endodontics", count: 10 },
    { name: "Endodontics", count: 15 },
    { name: "Neurology", count: 70 },
    { name: "Insurance", count: 16 },
    { name: "Dental", count: 60 },
    { name: "Neurology", count: 70 },
    { name: "Diabetes", count: 10 },
    { name: "Dermotology", count: 15 },
    { name: "Stress", count: 25 },
  ];
  return (
    <div className="tags-widget-cnt">
      <div className="related-post-head">
        <h4>Tags</h4>
      </div>
      <div className="tags-flex">
        {tagsData.map((tag, index) => (
          <div className="hastags-header" key={index}>
            <span className="widget-tag">#{tag.name} ({tag.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
