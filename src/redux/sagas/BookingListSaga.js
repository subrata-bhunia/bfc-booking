import AsyncStorage from '@react-native-async-storage/async-storage';
import {put, call, takeLatest, select} from 'redux-saga/effects';
import {postApi} from '../../api';
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
  BOOKING_DETAILS_BY_ID_SUCCESS,
  BOOKING_DETAILS_BY_ID_FAILURE,
  BOOKING_DETAILS_BY_ID_REQUEST,
} from '../action/types';

export function* allBookingReqSaga() {
  try {
    let response = yield call(postApi, '/all-booking');
    // console.log({'response is': response});

    if (response.data.status == 'Success') {
      yield put({
        type: ALL_BOOKINGS_SUCCESS,
        allBookinglist: response.data,
      });
    } else {
      yield put({type: ALL_BOOKINGS_FAILURE, error: response.data.message});
    }
  } catch (error) {
    yield put({type: ALL_BOOKINGS_FAILURE, error: error});
  }
}
export function* upcomingBookingReqSaga() {
  try {
    let response = yield call(postApi, '/upcoming-booking');
    // console.log({'response is': response});

    if (response.data.status == 'Success') {
      yield put({
        type: UPCOMING_BOOKING_SUCCESS,
        upcomingBookinglist: response.data,
      });
    } else {
      yield put({type: UPCOMING_BOOKING_FAILURE, error: response.data.message});
    }
  } catch (error) {
    yield put({type: UPCOMING_BOOKING_FAILURE, error: error});
  }
}
export function* dueBookingReqSaga() {
  try {
    let response = yield call(postApi, '/due-booking');
    // console.log({'response is': response});

    if (response.data.status == 'Success') {
      yield put({
        type: DUE_BOOKING_SUCCESS,
        dueBookinglist: response.data,
      });
    } else {
      yield put({type: DUE_BOOKING_FAILURE, error: response.data.message});
    }
  } catch (error) {
    yield put({type: DUE_BOOKING_FAILURE, error: error});
  }
}
export function* specificDateBookingReqSaga(action) {
  try {
    let response = yield call(postApi, '/booking-by-date', action.payload);

    if (response.data.status == 'Success') {
      yield put({
        type: GET_BOOKINGS_BY_DATE_SUCCESS,
        specificDateBookinglist: response.data,
      });
    } else {
      yield put({
        type: GET_BOOKINGS_BY_DATE_FAILURE,
        error: response.data.message,
      });
    }
  } catch (error) {
    yield put({type: GET_BOOKINGS_BY_DATE_FAILURE, error: error});
  }
}
export function* bookingdetailsbyidReqSaga(action) {
  try {
    let authReducerRes = yield select(state => state.AuthReducer);
    let user_id = authReducerRes.token;
    let response = yield call(postApi, '/booking-by-date', {
      user_id,
      ...action.payload,
    });
    if (response.data.status == 'Success') {
      yield put({
        type: BOOKING_DETAILS_BY_ID_SUCCESS,
        bookingDetails: response.data,
      });
    } else {
      yield put({
        type: BOOKING_DETAILS_BY_ID_FAILURE,
        error: response.data.message,
      });
    }
  } catch (error) {
    yield put({type: BOOKING_DETAILS_BY_ID_FAILURE, error: error});
  }
}

const watchFunctionForBookinglist = [
  (function* () {
    yield takeLatest(ALL_BOOKINGS_REQUEST, allBookingReqSaga);
  })(),
  (function* () {
    yield takeLatest(DUE_BOOKING_REQUEST, dueBookingReqSaga);
  })(),
  (function* () {
    yield takeLatest(UPCOMING_BOOKING_REQUEST, upcomingBookingReqSaga);
  })(),
  (function* () {
    yield takeLatest(GET_BOOKINGS_BY_DATE_REQUEST, specificDateBookingReqSaga);
  })(),
  (function* () {
    yield takeLatest(BOOKING_DETAILS_BY_ID_REQUEST, bookingdetailsbyidReqSaga);
  })(),
];

export default watchFunctionForBookinglist;
