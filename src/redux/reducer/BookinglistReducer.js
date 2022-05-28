import {
  ALL_BOOKINGS_REQUEST,
  ALL_BOOKINGS_SUCCESS,
  ALL_BOOKINGS_FAILURE,
  DUE_BOOKING_REQUEST,
  DUE_BOOKING_SUCCESS,
  DUE_BOOKING_FAILURE,
  UPCOMING_BOOKING_REQUEST,
  UPCOMING_BOOKING_SUCCESS,
  UPCOMING_BOOKING_FAILURE,
  GET_BOOKINGS_BY_DATE_REQUEST,
  GET_BOOKINGS_BY_DATE_SUCCESS,
  GET_BOOKINGS_BY_DATE_FAILURE,
  BOOKING_DETAILS_BY_ID_REQUEST,
  BOOKING_DETAILS_BY_ID_SUCCESS,
  BOOKING_DETAILS_BY_ID_FAILURE,
} from '../action/types';
const initialState = {
  status: '',
  loader: false,
  error: '',
  allBookinglist: {},
  dueBookinglist: {},
  upcomingBookinglist: {},
  specificDateBookinglist: {},
};
const BookinglistReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ALL_BOOKINGS_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        status: action.type,
        allBookinglist: action.allBookinglist,
        loader: false,
      };
    case ALL_BOOKINGS_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error,
        loader: false,
      };
    case DUE_BOOKING_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case DUE_BOOKING_SUCCESS:
      return {
        ...state,
        status: action.type,
        dueBookinglist: action.dueBookinglist,
        loader: false,
      };
    case DUE_BOOKING_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error,
        loader: false,
      };
    case UPCOMING_BOOKING_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case UPCOMING_BOOKING_SUCCESS:
      return {
        ...state,
        status: action.type,
        upcomingBookinglist: action.upcomingBookinglist,
        loader: false,
      };
    case UPCOMING_BOOKING_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error,
        loader: false,
      };
    case GET_BOOKINGS_BY_DATE_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case GET_BOOKINGS_BY_DATE_SUCCESS:
      return {
        ...state,
        status: action.type,
        specificDateBookinglist: action.specificDateBookinglist,
        loader: false,
      };
    case GET_BOOKINGS_BY_DATE_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error,
        loader: false,
      };
    case BOOKING_DETAILS_BY_ID_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case BOOKING_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        status: action.type,
        bookingDetails: action.bookingDetails,
        loader: false,
      };
    case BOOKING_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error,
        loader: false,
      };
    default:
      return state;
  }
};
export default BookinglistReducer;
