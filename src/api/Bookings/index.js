import axios from '../axios';

export const AddBooking = data => {
  return axios.post('/add-booking', data);
};

export const getReturnBookingById = data => {
  return axios.post('/return-booking-info', data);
};
