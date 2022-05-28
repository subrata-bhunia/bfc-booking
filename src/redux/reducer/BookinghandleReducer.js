import {
  ADD_NEW_BOOKING_FAILURE,
  ADD_NEW_BOOKING_SUCCESS,
  ADD_NEW_BOOKING_REQUEST,
} from '../action/types';
const initialState = {
  status: '',
  loader: false,
  error: '',
  addBookingData: {modal: false},
};
const BookinghandleReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_NEW_BOOKING_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case ADD_NEW_BOOKING_SUCCESS:
      return {
        ...state,
        status: action.type,
        loader: false,
        addBookingData: {...action.addBookingData, modal: true},
      };
    case ADD_NEW_BOOKING_FAILURE:
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
export default BookinghandleReducer;
