import React, { useEffect, useState } from 'react';
import './InboxSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { fetchFromServer } from '../../../actions/api';
import profileimg from "../../Assets/profileimg.png";

const Sidebar = ({ onSelectChat }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const role = sessionStorage.getItem('role'); 
        const data = await fetchFromServer(role, '/dashboard');
        console.log('API Response:', data);

        if (!data || !data.chats) {
          throw new Error('Invalid response structure');
        }

        const usersList = data.chats.map(chat => {
          const profilePicture = role === 'patient' ? chat.doctorId.profilePicture : chat.patientId.profilePicture;

          const imgSrc = profilePicture?.data 
            ? `data:${profilePicture.contentType};base64,${profilePicture.data}`
            : profileimg

          return {
            id: chat._id,
            name: role === 'patient' ? chat.doctorId.name : chat.patientId.name,
            message: chat.messages[0]?.text || 'No messages yet',
            time: new Date(chat.updatedAt).toLocaleString(),
            img: imgSrc,
          };
        });

        setUsers(usersList);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <select>
          <option>All Messages</option>
        </select>
      </div>
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Search or start a new chat" />
      </div>
      <ul className="user-list">
        {error ? (
          <li>Error loading users: {error}</li>
        ) : (
          users.map(user => (
            <li key={user.id} className="user-list-item" onClick={() => onSelectChat(user)}>
              <div className="user-avatar">
                <img src={user.img} alt={user.name} />
              </div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-message">{user.message}</div>
                <div className="message-time">{user.time}</div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
