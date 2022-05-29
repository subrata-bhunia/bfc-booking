import axios from '../axios';

export const AddBooking = data => {
  return axios.post('/add-booking', data);
};
//''''//

export const getBookingInfoById = data => {
  return axios.post('/booking-info', data);
};

//''''//

export const upComingBookingList = data => {
  return axios.post('/upcoming-booking', data);
};
//''''//

export const dueBookings = data => {
  return axios.post('/due-booking', data);
};
//''''//

export const allBookingList = data => {
  return axios.post('/all-booking', data);
};
//''''//
export const cancelBooking = data => {
  return axios.post('/cancel-booking', data);
};
//''''//
export const pickupBooking = data => {
  return axios.post('/pickup-booking', data);
};

export const checkReturnItems = data => {
  return axios.post('/check-return-items', data);
};
//''''//

export const ReturnBooking = data => {
  return axios.post('/return-booking', data);
};
export const calenderBooking = data => {
  return axios.post('/calender-booking', data);
};
//''''//
export const getModifyBookingInfo = data => {
  return axios.post('/modify-booking-info', data);
};
export const UpdateBooking = data => {
  return axios.post('/update-booking', data);
};
export const PaymentUpdate = data => {
  return axios.post('/payment-update', data);
};
export const MissingUpdate = data => {
  return axios.post('/missing-update', data);
};
export const CheckForOrder = data => {
  return axios.post('/check-availability', data);
};
//''''//
export const getBookingbyDate = data => {
  return axios.post('/booking-by-date', data);
};
//''''//
