import React, { useRef, useState } from "react";
import Quill from "quill";
import BlogInput from "./BlogInput";
import Editor from "./Editor";
import Blog from '../Blog'
const AddNewBlog = () => {
  const [showAddNewBlog, setShowAddNewBlog] = useState(false); 
  
  const handleAddClick = () => {
    setShowAddNewBlog(true); 
  };

  const handleCancel = () => {
    setShowAddNewBlog(false); 
  };

  const [iscurrentFocus, setIscurrentFocus] = useState(null);
  const [newBlogdata, setNewBlogdata] = useState({
    title: "",
    author: "",
    category: "",
    subCategory: "",
    tags: "",
    status: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  console.log(iscurrentFocus, newBlogdata);

  const Delta = Quill.import("delta");
  
  const quillRef = useRef();
  const fileInputRef = useRef(null);

  const validate = () => {
    let tempErrors = {};
    if (!newBlogdata.title) tempErrors.title = "Title is required *";
    if (!newBlogdata.author) tempErrors.author = "Author is required *";
    if (!newBlogdata.category) tempErrors.category = "Category is required *";
    if (!newBlogdata.subCategory) tempErrors.subCategory = "Sub-category is required *";
    if (!newBlogdata.tags) tempErrors.tags = "Tags are required *";
    if (!newBlogdata.status) tempErrors.status = "Status is required *";
    if (!newBlogdata.description) tempErrors.description = "Description is required *";
    if (!newBlogdata.image) tempErrors.image = "Image is required *";
    return tempErrors;
  };

  const handlePublish = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Submit form
      console.log("Form submitted", newBlogdata);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
    {showAddNewBlog ? (
      <Blog onCancel={handleCancel} /> 
    ) : (
        <div className="create-blog-cnt">
          <div className="blog-details-cnt">
            <BlogInput
              currentFocus={iscurrentFocus}
              setcurrentFocus={(label) => setIscurrentFocus(label)}
              updateValue={(value) =>
                setNewBlogdata({ ...newBlogdata, title: value })
              }
              value={newBlogdata.title}
              label="title"
              placeholder={"Blog Title"}
            />
            {errors.title && <p className="error">{errors.title}</p>}

            <BlogInput
              currentFocus={iscurrentFocus}
              setcurrentFocus={(label) => setIscurrentFocus(label)}
              updateValue={(value) =>
                setNewBlogdata({ ...newBlogdata, author: value })
              }
              value={newBlogdata.author}
              label="author"
              placeholder={"Author Name"}
            />
            {errors.author && <p className="error">{errors.author}</p>}

            <BlogInput
              currentFocus={iscurrentFocus}
              setcurrentFocus={(label) => setIscurrentFocus(label)}
              updateValue={(value) =>
                setNewBlogdata({ ...newBlogdata, category: value })
              }
              value={newBlogdata.category}
              label="category"
              placeholder={"Blog Category"}
            />
            {errors.category && <p className="error">{errors.category}</p>}

            <BlogInput
              currentFocus={iscurrentFocus}
              setcurrentFocus={(label) => setIscurrentFocus(label)}
              updateValue={(value) =>
                setNewBlogdata({ ...newBlogdata, subCategory: value })
              }
              value={newBlogdata.subCategory}
              label="subCategory"
              placeholder={"Blog Sub Category"}
            />
            {errors.subCategory && <p className="error">{errors.subCategory}</p>}

            <BlogInput
              currentFocus={iscurrentFocus}
              setcurrentFocus={(label) => setIscurrentFocus(label)}
              updateValue={(value) =>
                setNewBlogdata({ ...newBlogdata, tags: value })
              }
              value={newBlogdata.tags}
              label="tags"
              placeholder={"Tags (separated with a comma)"}
            />
            {errors.tags && <p className="error">{errors.tags}</p>}

            <div className="status-input-cnt">
              <p
                className="input-placeholder"
                style={{ position: "relative", paddingLeft: 0 }}
              >
                Blog status <span style={{ color: "red" }}> *</span>
              </p>

              <div className="select-option-cnt">
                <label htmlFor="check-active" className="checkbox-cnt">
                  <input
                    type="checkbox"
                    id="check-active"
                    className="checkbox"
                    checked={newBlogdata.status === "active"}
                    onChange={() =>
                      setNewBlogdata({ ...newBlogdata, status: "active" })
                    }
                  />
                  <p>Active</p>
                </label>
                <label htmlFor="check-inactive" className="checkbox-cnt">
                  <input
                    type="checkbox"
                    id="check-inactive"
                    className="checkbox"
                    checked={newBlogdata.status === "notActive"}
                    onChange={() =>
                      setNewBlogdata({ ...newBlogdata, status: "notActive" })
                    }
                  />
                  <p>In Active</p>
                </label>
              </div>
              {errors.status && <p className="error">{errors.status}</p>}
            </div>
          </div>
          
          <div className="text-editor-cnt">
          {errors.description && <p className="error">{errors.description}</p>}
            <Editor
              ref={quillRef}
              onTextChange={(value) =>
                setNewBlogdata({ ...newBlogdata, description: value })
              }
            />

          </div>

          <div className="blog-long-input-cnt">
            <input
              type="file"
              ref={fileInputRef}
              className="file-input"
              onChange={(e) =>
                setNewBlogdata({ ...newBlogdata, image: e.target.files[0] })
              }
            />
            
            <p className="absolute-file-name">{newBlogdata?.image?.name}</p>
            {errors.image && <p className="error">{errors.image}</p>}

            <div

              className="choose-file-label"
              onClick={() => fileInputRef.current.click()}
            >

              <p>Choose File</p>
            </div>
            <p
              className="input-placeholder"
              style={{
                top: newBlogdata.image ? "-0.8rem" : null,
              }}
            >
              Image
              <span style={{ color: "red" }}> *</span>
            </p>
          </div>
          <div className="btns-cnt">
            <div className="action-btn" onClick={handlePublish}>
              <p>Publish Blog</p>
            </div>
            <div
              className="action-btn"
              style={{ background: "#3334480D", color: "black" }}
              onClick={handleAddClick}
            >
              <p>Cancel</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewBlog;
