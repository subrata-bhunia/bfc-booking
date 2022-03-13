import axios from '../axios';

export const AddBooking = data => {
  return axios.post('/add-booking', data);
};

export const getReturnBookingById = data => {
  return axios.post('/booking-info', data);
};

export const upComingBookingList = data => {
  return axios.post('/upcoming-booking', data);
};

export const allBookingList = data => {
  return axios.post('/all-booking', data);
};
export const cancelBooking = data => {
  return axios.post('/cancel-booking', data);
};
export const pickupBooking = data => {
  return axios.post('/pickup-booking', data);
};
export const checkReturnItems = data => {
  return axios.post('/check-return-items', data);
};
