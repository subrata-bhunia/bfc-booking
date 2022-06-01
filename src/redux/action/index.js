import {
  ALL_BOOKINGS_REQUEST,
  DUE_BOOKING_REQUEST,
  SIGNUP_REQUEST,
  UPCOMING_BOOKING_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  GET_TOKEN_REQUEST,
  LOGOUT_REQUEST,
  SIGNIN_REQUEST,
  USER_INFO_REQUEST,
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_READ_REQUEST,
  CALENDER_BOOKINGS_INFO_REQUEST,
  ALL_MEMBERS_REQUEST,
  INVITE_STATUS_REQUEST,
  VERIFY_OTP_SIGNUP_REQUEST,
  VERIFY_OTP_FORGOT_PASSWORD_REQUEST,
  GET_BOOKINGS_BY_DATE_REQUEST,
  ADD_NEW_BOOKING_REQUEST,
  BOOKING_DETAILS_BY_ID_REQUEST,
  CHECK_AVAILABILITY_REQUEST,
  CHECK_RETURN_ITEM_REQUEST,
  GET_INVENTORY_ITEM_REQUEST,
  HANDLE_BOOKING_CANCEL_REQUEST,
  GET_NOTIFICATION_REQUEST,
} from './types';

export const calculateAction = (uniqueId, data, rent) => {
  return {
    type: 'CALCULATE_PRICE',
    payload: {
      uniqueId,
      data: data,
      rent,
    },
  };
};

export const fcmSet = (user_id, fcm_token) => {
  return {
    type: 'GET_FCM',
    user_id,
    fcm_token,
  };
};

// BOOKING

export const getAllBookings = payload => ({
  type: ALL_BOOKINGS_REQUEST,
  payload,
});
export const getUpcomingBookings = payload => ({
  type: UPCOMING_BOOKING_REQUEST,
  payload,
});
export const getAllDueBookings = payload => ({
  type: DUE_BOOKING_REQUEST,
  payload,
});
export const getAllSpecificDateBookings = payload => ({
  type: GET_BOOKINGS_BY_DATE_REQUEST,
  payload,
});
export const getBookingDetailsById = payload => ({
  type: BOOKING_DETAILS_BY_ID_REQUEST,
  payload,
});

//  Auth
// SINGIN
export const getSignin = payload => {
  console.log(payload);
  return {
    type: SIGNIN_REQUEST,
    payload,
  };
};
// SINGUP
export const signUp = payload => {
  console.log(payload);
  return {
    type: SIGNUP_REQUEST,
    payload,
  };
};
// otpverifysignup
export const otpVerifySignup = payload => {
  console.log(payload);
  return {
    type: VERIFY_OTP_SIGNUP_REQUEST,
    payload,
  };
};
// logout
export const logout = payload => {
  console.log(payload);
  return {
    type: LOGOUT_REQUEST,
    payload,
  };
};
// token
export const getTokenAction = () => ({
  type: GET_TOKEN_REQUEST,
});
// forgot password
export const forgotPassword = payload => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload,
});
// forgotPasswordOtpVerify
export const forgotPasswordOtpVerify = payload => {
  console.log(payload);
  return {
    type: VERIFY_OTP_FORGOT_PASSWORD_REQUEST,
    payload,
  };
};
// USER INFO
export const getUserInfo = payload => ({
  type: USER_INFO_REQUEST,
  payload,
});

// NOTIFICATIONS

export const getNotifications = payload => ({
  type: NOTIFICATIONS_REQUEST,
  payload,
});
// NOTIFICATIONS READ

export const getNotificationsRead = payload => ({
  type: NOTIFICATIONS_READ_REQUEST,
  payload,
});

// calenders

export const getcalendarBookingsInfo = payload => ({
  type: CALENDER_BOOKINGS_INFO_REQUEST,
  payload,
});

// All members
export const getallMembers = payload => ({
  type: ALL_MEMBERS_REQUEST,
  payload,
});

// Invite status

export const inviteStatus = payload => ({
  type: INVITE_STATUS_REQUEST,
  payload,
});

// Booking handle

export const createNewBooking = payload => ({
  type: ADD_NEW_BOOKING_REQUEST,
  payload,
});

export const cancelBooking = payload => ({
  type: HANDLE_BOOKING_CANCEL_REQUEST,
  payload,
});

//Check item handle

export const checkAvailability = payload => ({
  type: CHECK_AVAILABILITY_REQUEST,
  payload,
});

export const checkReturnItems = payload => ({
  type: CHECK_RETURN_ITEM_REQUEST,
  payload,
});

export const getInventoryItems = payload => ({
  type: GET_INVENTORY_ITEM_REQUEST,
  payload,
});
