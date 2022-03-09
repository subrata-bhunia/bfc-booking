import axios from '../axios';
export const getReturnBookingById = data => {
  return axios.post('/return-booking-info', data);
};
