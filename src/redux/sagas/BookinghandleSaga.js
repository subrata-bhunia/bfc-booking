import AsyncStorage from '@react-native-async-storage/async-storage';
import {put, call, takeLatest, select} from 'redux-saga/effects';
import {postApi} from '../../api';
import {
  ALL_BOOKINGS_REQUEST,
  ALL_BOOKINGS_SUCCESS,
  ALL_BOOKINGS_FAILURE,
  ADD_NEW_BOOKING_REQUEST,
  ADD_NEW_BOOKING_SUCCESS,
  ADD_NEW_BOOKING_FAILURE,
} from '../action/types';

export function* addBookingReqSaga(action) {
  try {
    let authReducerRes = yield select(state => state.AuthReducer);
    let user_id = authReducerRes.token;
    console.log('user id from add booking saga page:', user_id);
    console.log('action from add booking saga page:', {
      user_id,
      ...action.payload,
    });
    let response = yield call(postApi, '/add-booking', {
      user_id,
      ...action.payload,
    });
    console.log({'add-booking response is ': response});

    if (response.data.status == 'Success') {
      yield put({
        type: ADD_NEW_BOOKING_SUCCESS,
        addBookingData: response.data,
      });
    } else {
      yield put({type: ADD_NEW_BOOKING_FAILURE, error: response.data.message});
    }
  } catch (error) {
    yield put({type: ADD_NEW_BOOKING_FAILURE, error: error});
  }
}

const watchFunctionForBookinghandle = [
  (function* () {
    yield takeLatest(ADD_NEW_BOOKING_REQUEST, addBookingReqSaga);
  })(),
];

export default watchFunctionForBookinghandle;
