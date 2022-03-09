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
