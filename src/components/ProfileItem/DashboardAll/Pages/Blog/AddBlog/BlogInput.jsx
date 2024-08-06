import React from "react";
import "../blogs.css";

const BlogInput = ({
  currentFocus,
  setcurrentFocus,
  value,
  updateValue,
  label,
  placeholder,
}) => {
  const checkPlaceholderCondition = () => {
    if (value?.length > 0 || currentFocus === label) return true;
    if (!value?.length > 0 || currentFocus !== label) return false;
  };

  return (
    <div className="blog-short-input-cnt">
      <input
        type="text"
        value={value}
        className="blog-short-input"
        onFocus={() => setcurrentFocus(label)}
        onChange={(e) => updateValue(e.target.value)}
      />
      <p
        className="input-placeholder"
        style={{
          top: checkPlaceholderCondition() ? "-0.8rem" : null,
        }}
      >
        {placeholder}
        <span style={{ color: "red" }}> *</span>
      </p>
    </div>
  );
};

export default BlogInput;
