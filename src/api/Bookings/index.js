import axios from '../axios';

export const AddBooking = data => {
  return axios.post('/add-booking', data);
};
