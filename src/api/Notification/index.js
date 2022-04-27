import Axios from '../axios';

export const getAllNotifications = data => {
  return Axios.post('/notifications', data);
};
export const handleReadMsg = data => {
  return Axios.post('/notification-mark-read', data);
};
