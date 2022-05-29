import AsyncStorage from '@react-native-async-storage/async-storage';
import {put, call, takeLatest, select} from 'redux-saga/effects';
import {postApi} from '../../api';
import {
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_SUCCESS,
  NOTIFICATIONS_FAILURE,
} from '../action/types';

export function* notificatioSaga() {
  try {
    let authReducerRes = yield select(state => state.AuthReducer);
    let user_id = authReducerRes.token;
    let response = yield call(postApi, '/notifications', {
      user_id,
    });

    if (response.data.status == 'Success') {
      yield put({
        type: NOTIFICATIONS_SUCCESS,
        getNotificationRes: response.data,
      });
    } else {
      yield put({type: NOTIFICATIONS_FAILURE, error: response.data.message});
    }
  } catch (error) {
    yield put({type: NOTIFICATIONS_FAILURE, error: error});
  }
}
const watchFunctionForExtraAPI = [
  (function* () {
    yield takeLatest(NOTIFICATIONS_REQUEST, notificatioSaga);
  })(),
];

export default watchFunctionForExtraAPI;
