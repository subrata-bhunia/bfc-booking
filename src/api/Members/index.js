import axios from '../axios';

export const getAllMembers = data => {
  return axios.post('/all-members', data);
};

export const memberInvite = data => {
  return axios.post('/member-invite-status', data);
};
