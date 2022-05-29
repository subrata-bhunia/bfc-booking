import {
  CALENDER_BOOKINGS_INFO_REQUEST,
  CALENDER_BOOKINGS_INFO_SUCCESS,
  CALENDER_BOOKINGS_INFO_FAILURE,
} from '../action/types';
const initialState = {
  status: '',
  loader: false,
  error: '',
  calendarInfo: {},
};
const CalendarInfoReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CALENDER_BOOKINGS_INFO_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case CALENDER_BOOKINGS_INFO_SUCCESS:
      return {
        ...state,
        status: action.type,
        calendarInfo: action.calendarInfo,
        loader: false,
      };
    case CALENDER_BOOKINGS_INFO_FAILURE:
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
export default CalendarInfoReducer;
