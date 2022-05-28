import {combineReducers} from 'redux';
import handleCalCulatePrice from './CalculateReducer';
import {fcmToken} from './FCM_Token';
import AuthReducer from './AuthReducer';
import BookinglistReducer from './BookinglistReducer';
import CalendarInfoReducer from './CalendarReducer';
import BookinghandleReducer from './BookinghandleReducer';
import AllCheckHandleReducer from './AllCheckHandleReducer';

export const rootReducer = combineReducers({
  handleCalCulatePrice,
  fcmToken,
  AuthReducer,
  BookinglistReducer,
  CalendarInfoReducer,
  BookinghandleReducer,
  AllCheckHandleReducer,
});
