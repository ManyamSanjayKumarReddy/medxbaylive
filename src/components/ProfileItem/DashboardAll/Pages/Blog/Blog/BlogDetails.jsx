import React from "react";
import Comment from "./Comment";
import { IoIosCalendar } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { LuEye } from "react-icons/lu";
import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
function BlogDetails() {
  return (
        <div className="blog-cnt">
          <div className="blog-post-cnt">
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
            <div className="blog-status-info">
              <p className="read-more-text">Read more in 8 Minutes</p>
              <div className="blog-status">
                <div className="date-info-cnt">
                  <IoIosCalendar size="1.1rem" className="date-info-cnt-icon" />
                  <p className="blue-text">05 Sep 2022</p>
                </div>
                <div className="date-info-cnt">
                  <TbMessage size="1.1rem" className="date-info-cnt-icon"/>
                  <p className="blue-text">58</p>
                </div>
                <div className="date-info-cnt">
                  <LuEye size="1.1rem" className="date-info-cnt-icon"/>
                  <p className="blue-text">2.8k</p>
                </div>
              </div>
            </div>

            <img
              src="https://s3-alpha-sig.figma.com/img/a090/4ed3/75794b707ee77d9722968ddc31d203bd?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HaCdcKMKsgQv0ZniCZsvbt-RwhCXFrc8Qqso-TrXkVHSFKEMEsLraw5GGUMEfJsQozkI42YWBwd2b8iGnlO6jcBUNpQmF6lDbT2oSB~yXKdCpWqEB2nZeJtFp6yPYX~WjK5h37-8XdkCvnIS5CVGEsugC~Zbx-pzMnQHwAC730HhwBGVwZlAT1YRLuRmBeOKGT--oYhSVrjhbAHE699GYFHd2a-pCLimIThoI~8y17D3hV5pAPGF1qyydGn3mBCyE0ZOSb5Wj261KsXk9oArb7FzdnXCzgVbkfIJpkkS14yFO64D~iqtpUB1mOf8r92gJr~PMCWhsquWTlM9lIQZhg__"
              alt="blog-img"
              className="blog-image"
            />
            <p className="blog-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="social-reach-cnt">
              <IoLogoFacebook className="facebook-icon"/>
              <span>2.5k</span>
            </div>
            <div className="blog-tags">
              <div className="blog-tags-content">
                <span className="blog-tags-item"># Ophthalmology </span>
              </div>
              <div className="blog-tags-content">
                <span className="blog-tags-item"># Beauty</span>
              </div>
              <div className="blog-tags-content">
                <span className="blog-tags-item"># Prevention</span>
              </div>
            </div>
          </div>
          
          <div className="blogger-details-cnt profileInfo">
            <img
              src="https://s3-alpha-sig.figma.com/img/ea4c/73d0/19e43707a3c8797a72b8069971487eae?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NKHKQm6CsXhKGcEvUNJtyikwlMylz0n~wvWTWJG6YE7TaX-a783TkCXvxPNSq8s47WzKxfqItBELg~rkYMB7hz6sE6l~GYxE2TZwvh8tP01x1X61lDqV3qkin051bMGvAgoryfIVAixL3hid7MxIsxjSW89HqK76y-tIt4G1FwmbV5M8qJDiiudM8CIEjW2vXuAGHfjy9wV5t~EfiXU~HcZKyUjMWLEvdquXhESgB~1iihhdtv5To0PUIEa7KrQKQyfkXmirMYbG1S9TIFC51gnH2ynVjMhavKl-fSgv6Rc3YXEaSCiIpZ6atvsquEwH8k672V4nRrxn4N6qadXoQA__"
              alt="profile-img"
              className="profile-img"
            />
            <h4>Elizabeth</h4>
            <p>Dentist</p>
            <p className="profile-bio">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem recusandae atque iusto ipsam. Tempore nihil modi
              doloribus architecto necessitatibus assumenda aut, illo accusamus
              ipsa, facilis quaerat expedita repellat quisquam! Magni.
            </p>
            <div className="profile-socials-cnt">
              <IoLogoFacebook className="facebook-icon"/>
              <IoLogoLinkedin className="facebook-icon"/>
              <FaTwitter className="facebook-icon"/>
              <SiInstagram className="facebook-icon"/>
            </div>
          </div>
          <div className="comments-cnt">
            <h4 className="comments-title">Comments</h4>
            <Comment/>  
          </div>
        </div>
  )
}

export default BlogDetails