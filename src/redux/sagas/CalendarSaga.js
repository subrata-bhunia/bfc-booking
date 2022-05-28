import AsyncStorage from '@react-native-async-storage/async-storage';
import {put, call, takeLatest} from 'redux-saga/effects';
import {postApi} from '../../api';
import {
  CALENDER_BOOKINGS_INFO_REQUEST,
  CALENDER_BOOKINGS_INFO_SUCCESS,
  CALENDER_BOOKINGS_INFO_FAILURE,
} from '../action/types';

export function* calendarReqSaga() {
  try {
    let response = yield call(postApi, '/calender-booking');
    console.log({'response of calender-booking api is': response});

    if (response.data.status == 'Success') {
      yield put({
        type: CALENDER_BOOKINGS_INFO_SUCCESS,
        calendarInfo: response.data,
      });
    } else {
      yield put({
        type: CALENDER_BOOKINGS_INFO_FAILURE,
        error: 'Err in saga page ' + response.data.message,
      });
    }
  } catch (error) {
    yield put({type: CALENDER_BOOKINGS_INFO_FAILURE, error: error});
  }
}

const watchFunctionForCalendarBookingInfo = [
  (function* () {
    yield takeLatest(CALENDER_BOOKINGS_INFO_REQUEST, calendarReqSaga);
  })(),
];

export default watchFunctionForCalendarBookingInfo;
