import axios from '../axios';

export const getAllEvent = data => {
  return axios.post('/events', data);
};
export const eventParticipation = data => {
  return axios.post('/event-participation', data);
};