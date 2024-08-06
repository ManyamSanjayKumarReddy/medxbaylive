import React from "react";
import { IoArrowUndo } from "react-icons/io5";

const Comment = () => {
  const commentsData = [
    {
      profileImg: "https://s3-alpha-sig.figma.com/img/ea4c/73d0/19e43707a3c8797a72b8069971487eae?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NKHKQm6CsXhKGcEvUNJtyikwlMylz0n~wvWTWJG6YE7TaX-a783TkCXvxPNSq8s47WzKxfqItBELg~rkYMB7hz6sE6l~GYxE2TZwvh8tP01x1X61lDqV3qkin051bMGvAgoryfIVAixL3hid7MxIsxjSW89HqK76y-tIt4G1FwmbV5M8qJDiiudM8CIEjW2vXuAGHfjy9wV5t~EfiXU~HcZKyUjMWLEvdquXhESgB~1iihhdtv5To0PUIEa7KrQKQyfkXmirMYbG1S9TIFC51gnH2ynVjMhavKl-fSgv6Rc3YXEaSCiIpZ6atvsquEwH8k672V4nRrxn4N6qadXoQA__",
      title: "Diana Bailey",
      time: "2 weeks ago",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem aperiam incidunt a id voluptas nemo. Facere fugit deserunt consequatur maiores adipisci ullam commodi! Expedita pariatur, eos natus nobis eum quidem?",
    },
    {
      profileImg: "https://s3-alpha-sig.figma.com/img/ea4c/73d0/19e43707a3c8797a72b8069971487eae?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NKHKQm6CsXhKGcEvUNJtyikwlMylz0n~wvWTWJG6YE7TaX-a783TkCXvxPNSq8s47WzKxfqItBELg~rkYMB7hz6sE6l~GYxE2TZwvh8tP01x1X61lDqV3qkin051bMGvAgoryfIVAixL3hid7MxIsxjSW89HqK76y-tIt4G1FwmbV5M8qJDiiudM8CIEjW2vXuAGHfjy9wV5t~EfiXU~HcZKyUjMWLEvdquXhESgB~1iihhdtv5To0PUIEa7KrQKQyfkXmirMYbG1S9TIFC51gnH2ynVjMhavKl-fSgv6Rc3YXEaSCiIpZ6atvsquEwH8k672V4nRrxn4N6qadXoQA__",
      title: "John Doe",
      time: "1 month ago",
      text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      profileImg: "https://s3-alpha-sig.figma.com/img/ea4c/73d0/19e43707a3c8797a72b8069971487eae?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NKHKQm6CsXhKGcEvUNJtyikwlMylz0n~wvWTWJG6YE7TaX-a783TkCXvxPNSq8s47WzKxfqItBELg~rkYMB7hz6sE6l~GYxE2TZwvh8tP01x1X61lDqV3qkin051bMGvAgoryfIVAixL3hid7MxIsxjSW89HqK76y-tIt4G1FwmbV5M8qJDiiudM8CIEjW2vXuAGHfjy9wV5t~EfiXU~HcZKyUjMWLEvdquXhESgB~1iihhdtv5To0PUIEa7KrQKQyfkXmirMYbG1S9TIFC51gnH2ynVjMhavKl-fSgv6Rc3YXEaSCiIpZ6atvsquEwH8k672V4nRrxn4N6qadXoQA__",
      title: "Jane Smith",
      time: "3 days ago",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  return (
    <div className="comments-read">
      {commentsData.map((comment, index) => (
        <div key={index} className="style-comment-cnt">
          <img src={comment.profileImg} alt="profile-icon" className="profile-img" />
          <div className="comment">
            <p className="comment-title">{comment.title}</p>
            <p className="comment-time-txt">{comment.time}</p>
            <p className="comment-txt">{comment.text}</p>
          </div>
          <div className="replay-btn">
            <IoArrowUndo />
            <span>Reply</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
