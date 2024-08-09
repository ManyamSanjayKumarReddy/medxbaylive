import React, { useEffect, useState } from 'react';
import './Notification.css';
import { fetchFromPatient } from '../../../actions/api';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await fetchFromPatient('/notifications');
      console.log(data);
      
      if (data.notifications) {
        setNotifications(data.notifications);
      } else {
        throw new Error('No notifications found in response');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await fetchFromPatient(`/notifications/${id}/mark-read`, {}, 'POST');
      setNotifications(notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchFromPatient(`/notifications/${id}/delete`, {}, 'POST');
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className="notification-card">
      <div className="notification-list">
        {notifications.map(notification => (
          <div key={notification._id} className="notification">
            <img src={notification.senderProfilePic || 'default-image-url'} alt="Profile" />
            <div className="details">
              <h2>{notification.senderName}</h2>
              <p>{notification.specialization}</p>
              <p>{notification.message}</p>
            </div>
            <div className="status">
              <span className="time">{notification.timeAgo}</span>
              <p style={{ color: notification.statusColor }}>{notification.status}</p>
            </div>
            {!notification.read && (
              <button className='btn btn-primary' onClick={() => handleMarkAsRead(notification._id)}>Mark as Read</button>
            )}
            <button className='btn btn-primary' onClick={() => handleDelete(notification._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
