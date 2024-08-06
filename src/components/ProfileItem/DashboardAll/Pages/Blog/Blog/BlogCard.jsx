import React, { useState } from "react";
import BlogDetails from "./BlogDetails";
import PostComment from "./PostComment";
import { IoIosCalendar } from "react-icons/io";
import { TbSquareRoundedArrowDown } from "react-icons/tb";

const BlogCard = () => {
  const [activeBlog, setActiveBlog] = useState(null);

  const blogDataArray = [
    {
      id: 1,
      imageUrl: "https://s3-alpha-sig.figma.com/img/a090/4ed3/75794b707ee77d9722968ddc31d203bd?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HaCdcKMKsgQv0ZniCZsvbt-RwhCXFrc8Qqso-TrXkVHSFKEMEsLraw5GGUMEfJsQozkI42YWBwd2b8iGnlO6jcBUNpQmF6lDbT2oSB~yXKdCpWqEB2nZeJtFp6yPYX~WjK5h37-8XdkCvnIS5CVGEsugC~Zbx-pzMnQHwAC730HhwBGVwZlAT1YRLuRmBeOKGT--oYhSVrjhbAHE699GYFHd2a-pCLimIThoI~8y17D3hV5pAPGF1qyydGn3mBCyE0ZOSb5Wj261KsXk9oArb7FzdnXCzgVbkfIJpkkS14yFO64D~iqtpUB1mOf8r92gJr~PMCWhsquWTlM9lIQZhg__",
      profileImageUrl: "https://s3-alpha-sig.figma.com/img/f517/b4ae/8bc01705db24818a0614f477daff407d?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AGjOunBXymvwD9LGXX~VS8mRU6V5cCTMJfW9N1-3wHxJK3HeZDrMuPN6D4xVBMbhlFsl4gYNVJQ3R3yKqUIQLty3j~mUumaS4Jjt0fSPJ~2IR2tDl3csTaKj706WXol0v4~BLqZzQI2kRI1uRgKs03As8IK17TVozC9ARH~fXUxrfCj6grOC1qQiZrcFGVxVDo7B9nvGCNw4F9EEKPjn7~SL7YSZBXItPL2Ngidg7oDUgiFnGI4qHWZncBO4w25XfjBoTew0co7~sSF26GQM31RATdVnLLMPmRGW8v0Z8wzodreWJlBCY~XCjPeeeLkEaxX9teW-Y4yhf-Z9ln6lIw__",
      authorName: "Author One",
      authorTitle: "M.B.B.S, Diabetologist",
      date: "05 Sep 2022",
      title: "Simple Changes That Lowered My Mom's Blood Pressure",
      previewText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      readTime: 8,
    },
    {
      id: 2,
      imageUrl: "https://s3-alpha-sig.figma.com/img/a090/4ed3/75794b707ee77d9722968ddc31d203bd?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HaCdcKMKsgQv0ZniCZsvbt-RwhCXFrc8Qqso-TrXkVHSFKEMEsLraw5GGUMEfJsQozkI42YWBwd2b8iGnlO6jcBUNpQmF6lDbT2oSB~yXKdCpWqEB2nZeJtFp6yPYX~WjK5h37-8XdkCvnIS5CVGEsugC~Zbx-pzMnQHwAC730HhwBGVwZlAT1YRLuRmBeOKGT--oYhSVrjhbAHE699GYFHd2a-pCLimIThoI~8y17D3hV5pAPGF1qyydGn3mBCyE0ZOSb5Wj261KsXk9oArb7FzdnXCzgVbkfIJpkkS14yFO64D~iqtpUB1mOf8r92gJr~PMCWhsquWTlM9lIQZhg__",
      profileImageUrl: "https://s3-alpha-sig.figma.com/img/f517/b4ae/8bc01705db24818a0614f477daff407d?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AGjOunBXymvwD9LGXX~VS8mRU6V5cCTMJfW9N1-3wHxJK3HeZDrMuPN6D4xVBMbhlFsl4gYNVJQ3R3yKqUIQLty3j~mUumaS4Jjt0fSPJ~2IR2tDl3csTaKj706WXol0v4~BLqZzQI2kRI1uRgKs03As8IK17TVozC9ARH~fXUxrfCj6grOC1qQiZrcFGVxVDo7B9nvGCNw4F9EEKPjn7~SL7YSZBXItPL2Ngidg7oDUgiFnGI4qHWZncBO4w25XfjBoTew0co7~sSF26GQM31RATdVnLLMPmRGW8v0Z8wzodreWJlBCY~XCjPeeeLkEaxX9teW-Y4yhf-Z9ln6lIw__",
      authorName: "Author Two",
      authorTitle: "M.D, Cardiologist",
      date: "10 Oct 2022",
      title: "Effective Ways to Maintain a Healthy Heart",
      previewText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      readTime: 10,
    },
    {
      id: 3,
      imageUrl: "https://s3-alpha-sig.figma.com/img/a090/4ed3/75794b707ee77d9722968ddc31d203bd?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HaCdcKMKsgQv0ZniCZsvbt-RwhCXFrc8Qqso-TrXkVHSFKEMEsLraw5GGUMEfJsQozkI42YWBwd2b8iGnlO6jcBUNpQmF6lDbT2oSB~yXKdCpWqEB2nZeJtFp6yPYX~WjK5h37-8XdkCvnIS5CVGEsugC~Zbx-pzMnQHwAC730HhwBGVwZlAT1YRLuRmBeOKGT--oYhSVrjhbAHE699GYFHd2a-pCLimIThoI~8y17D3hV5pAPGF1qyydGn3mBCyE0ZOSb5Wj261KsXk9oArb7FzdnXCzgVbkfIJpkkS14yFO64D~iqtpUB1mOf8r92gJr~PMCWhsquWTlM9lIQZhg__",
      profileImageUrl: "https://s3-alpha-sig.figma.com/img/f517/b4ae/8bc01705db24818a0614f477daff407d?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AGjOunBXymvwD9LGXX~VS8mRU6V5cCTMJfW9N1-3wHxJK3HeZDrMuPN6D4xVBMbhlFsl4gYNVJQ3R3yKqUIQLty3j~mUumaS4Jjt0fSPJ~2IR2tDl3csTaKj706WXol0v4~BLqZzQI2kRI1uRgKs03As8IK17TVozC9ARH~fXUxrfCj6grOC1qQiZrcFGVxVDo7B9nvGCNw4F9EEKPjn7~SL7YSZBXItPL2Ngidg7oDUgiFnGI4qHWZncBO4w25XfjBoTew0co7~sSF26GQM31RATdVnLLMPmRGW8v0Z8wzodreWJlBCY~XCjPeeeLkEaxX9teW-Y4yhf-Z9ln6lIw__",
      authorName: "Author Two",
      authorTitle: "M.D, Cardiologist",
      date: "10 Oct 2022",
      title: "Effective Ways to Maintain a Healthy Heart",
      previewText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      readTime: 10,
    },
    {
      id: 4,
      imageUrl: "https://s3-alpha-sig.figma.com/img/a090/4ed3/75794b707ee77d9722968ddc31d203bd?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HaCdcKMKsgQv0ZniCZsvbt-RwhCXFrc8Qqso-TrXkVHSFKEMEsLraw5GGUMEfJsQozkI42YWBwd2b8iGnlO6jcBUNpQmF6lDbT2oSB~yXKdCpWqEB2nZeJtFp6yPYX~WjK5h37-8XdkCvnIS5CVGEsugC~Zbx-pzMnQHwAC730HhwBGVwZlAT1YRLuRmBeOKGT--oYhSVrjhbAHE699GYFHd2a-pCLimIThoI~8y17D3hV5pAPGF1qyydGn3mBCyE0ZOSb5Wj261KsXk9oArb7FzdnXCzgVbkfIJpkkS14yFO64D~iqtpUB1mOf8r92gJr~PMCWhsquWTlM9lIQZhg__",
      profileImageUrl: "https://s3-alpha-sig.figma.com/img/f517/b4ae/8bc01705db24818a0614f477daff407d?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AGjOunBXymvwD9LGXX~VS8mRU6V5cCTMJfW9N1-3wHxJK3HeZDrMuPN6D4xVBMbhlFsl4gYNVJQ3R3yKqUIQLty3j~mUumaS4Jjt0fSPJ~2IR2tDl3csTaKj706WXol0v4~BLqZzQI2kRI1uRgKs03As8IK17TVozC9ARH~fXUxrfCj6grOC1qQiZrcFGVxVDo7B9nvGCNw4F9EEKPjn7~SL7YSZBXItPL2Ngidg7oDUgiFnGI4qHWZncBO4w25XfjBoTew0co7~sSF26GQM31RATdVnLLMPmRGW8v0Z8wzodreWJlBCY~XCjPeeeLkEaxX9teW-Y4yhf-Z9ln6lIw__",
      authorName: "Author Two",
      authorTitle: "M.D, Cardiologist",
      date: "10 Oct 2022",
      title: "Effective Ways to Maintain a Healthy Heart",
      previewText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      readTime: 10,
    }
  ];

  const handleBlogClick = (id) => {
    setActiveBlog((prev) => (prev === id ? null : id));
  };

  return (
    <div className="blog-card-container">
      {blogDataArray.map((blog) => (
        <div
          key={blog.id}
          className="blog-card-wrapper"
          style={{ display: activeBlog && activeBlog !== blog.id ? 'none' : 'block' }}
        >
          <div  className="blog-card-cnt">
            <img src={blog.imageUrl} alt="blog" className="blog-card-img" />
            <div className="blog-card-profileInfo-cnt">
              <div className="profileInfo-cnt">
                <img
                  src={blog.profileImageUrl}
                  alt="profile"
                  className="blog-card-profile-img"
                />
                <div className="profileInfo">
                  <h4>{blog.authorName}</h4>
                  <p>{blog.authorTitle}</p>
                </div>
              </div>
              <div className="date-info-cnt">
                <IoIosCalendar size="1.1rem" />
                <p className="blue-text">{blog.date}</p>
              </div>
            </div>
            <div className="blog-content-preview-cnt">
              <h4>{blog.title}</h4>
              <p>{blog.previewText}</p>
            </div>
            <div className="readMore-cnt" onClick={(e) => { e.preventDefault(); handleBlogClick(blog.id); }}>
              <h4>Read more in {blog.readTime} Minutes</h4>
              <TbSquareRoundedArrowDown
                size="1.3rem"
                className="readMore-cnt-icon"
              />
            </div>
            {activeBlog === blog.id && (
              <div className="blogdetailstransition">
                <BlogDetails blog={blog} />
                <PostComment blogId={blog.id} />
              </div>
               
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;