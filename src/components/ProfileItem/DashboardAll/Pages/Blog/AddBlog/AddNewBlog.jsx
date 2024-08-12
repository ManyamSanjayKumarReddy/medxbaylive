import React, { useRef, useState } from "react";
import "./addnewblog.css";
import Blog from "../Blog";
import Editor from "./Editor";

const AddNewBlog = () => {
  const [showAddNewBlog, setShowAddNewBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    authorName: "",
    category: "",
    subCategory: "",
    tags: "",
    status: "",
    description: "",
    image: null,
    save: false,
  });
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleAddClick = () => {
    setShowAddNewBlog(true);
  };

  const handleCancel = () => {
    setShowAddNewBlog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Blog submitted:", newBlog);
  };

  // Example options for the select boxes
  const categories = ["Technology", "Health", "Travel", "Food", "Lifestyle"];
  const subCategories = {
    Technology: ["AI", "Blockchain", "Cybersecurity"],
    Health: ["Nutrition", "Mental Health", "Fitness"],
    Travel: ["Adventure", "Culture", "Guides"],
    Food: ["Recipes", "Reviews", "Nutrition"],
    Lifestyle: ["Fashion", "Home Decor", "Wellness"],
  };

  const handlePublish = () => {
    alert("Blog Publish");
  }

  return (
    <>
      {showAddNewBlog ? (
        <Blog onCancel={handleCancel} />
      ) : (
        <div className="publish-blog-container" onSubmit={handleSubmit}>
          <h2 className="blog-title">Blogs</h2>
          <form className="publish-blog-gap">
            <div className="publish-blog-header">
              <input
                type="text"
                value={newBlog.title}
                className="publish-blog-input"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
              />
              <p className="publish-blog-placeholder">
                Blog Title
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>

            <div className="publish-blog-header">
              <input
                type="text"
                value={newBlog.authorName}
                className="publish-blog-input"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, authorName: e.target.value })
                }
              />
              <p className="publish-blog-placeholder">
                Author Name
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>

            <div className="publish-blog-header">
              <select
                value={newBlog.category}
                className="publish-blog-input"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, category: e.target.value })
                }
              >
                <option value="" disabled hidden>
                  Choose Blog Category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className="publish-blog-placeholder">
                Blog Category
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>

            <div className="publish-blog-header">
              <select
                value={newBlog.subCategory}
                className="publish-blog-input"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, subCategory: e.target.value })
                }
              >
                <option value="" disabled hidden>
                  Choose Blog Sub Category
                </option>
                {newBlog.category &&
                  subCategories[newBlog.category].map((subCategory, index) => (
                    <option key={index} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
              </select>
              <p className="publish-blog-placeholder">
                Blog Sub Category
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>

            <div className="publish-blog-header">
              <input
                type="text"
                value={newBlog.tags}
                className="publish-blog-input"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, tags: e.target.value })
                }
              />
              <p className="publish-blog-placeholder">
                Tags (separated with a comma)
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>

            <div className="publish-blog-header">
              <p className="publish-blog-placeholder-status">
                Blog Status
                <span style={{ color: "red" }}> *</span>
              </p>
              <div className="publish-blog-check-aina">
                <div className="radio-input-label">
                  <input
                    type="radio"
                    id="check-active"
                    className="checkbox"
                    checked={newBlog.status === "active"}
                    onChange={() =>
                      setNewBlog({
                        ...newBlog,
                        status:
                          newBlog.status === "active"
                            ? "notActive"
                            : "active",
                      })
                    }
                  />
                  <label htmlFor="check-active" className="radio-label">
                    Active
                  </label>
                </div>
                <div className="radio-input-label">
                  <input
                    type="radio"
                    id="check-inactive"
                    className="checkbox"
                    checked={newBlog.status === "notActive"}
                    onChange={() =>
                      setNewBlog({
                        ...newBlog,
                        status:
                          newBlog.status === "notActive"
                            ? "active"
                            : "notActive",
                      })
                    }
                  />
                  <label htmlFor="check-active" className="radio-label">
                    Inactive
                  </label>
                </div>
              </div>
            </div>
          </form>
          <div className="editor-and-file-container">
            <div className="editor-box">
              <Editor
                ref={quillRef}
                defaultText="Description"
                onTextChange={(content) => {
                  setNewBlog({ ...newBlog, description: content });
                }}
              />
            </div>

            <div className="publish-blog-header-file">
              <input
                type="file"
                ref={fileInputRef}
                className="publish-file-input"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, image: e.target.files[0] })
                }
              />
              <p className="publish-file-name">{newBlog?.image?.name}</p>

              <div className="choose-file-publish" onClick={() => fileInputRef.current.click()}>
                <span>Choose File</span>
              </div>
              <p className="publish-blog-placeholder">
                Image
                <span style={{ color: "red" }}> *</span>
              </p>
            </div>
          </div>

          <div className="publish-button">
            <div className="publish-button-inside" onClick={handlePublish}>
              <span>Publish Blog</span>
            </div>
            <div className="publish-button-inside" onClick={handleAddClick} 
            style={{ background: "#3334480D", color: "black" }} >
              <span>Cancel</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default AddNewBlog;
