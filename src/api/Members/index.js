import axios from '../axios';

export const getAllMembers = data => {
  return axios.post('/all-members', data);
};
