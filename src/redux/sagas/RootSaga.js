import {all} from 'redux-saga/effects';
// import ListSaga from './ListSaga';
import AuthSaga from './AuthSaga';
import BookingListSaga from './BookingListSaga';
import CalendarSaga from './CalendarSaga';
import watchFunctionForBookinghandle from './BookinghandleSaga';
import watchFunctionForAllCheckhandle from './AllCheckHandleSaga';

const combinedSaga = [
  ...AuthSaga,
  ...BookingListSaga,
  ...CalendarSaga,
  ...watchFunctionForBookinghandle,
  ...watchFunctionForAllCheckhandle,
];

export default function* RootSaga() {
  yield all(combinedSaga);
}
