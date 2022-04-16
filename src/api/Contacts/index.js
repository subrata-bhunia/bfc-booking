import axios from '../axios';

export const getContact = data => {
  return axios.post('/phonebooks', data);
};
