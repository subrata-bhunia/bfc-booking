import {put, call, takeLatest} from 'redux-saga/effects';
import {postApi} from '../../api';
import {
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
} from '../action/types';

export function* signinReqSaga(action) {
  try {
    console.log({'the action is': action.payload});
    let response = yield call(postApi, '/login', action.payload);
    console.log({'response is': response});
    if (response.status == 200) {
      yield put({
        type: SIGNIN_SUCCESS,
        signinRes: response.data,
      });
      console.log('Token : ' + response.data.token);
      yield put({
        type: GET_TOKEN_SUCCESS,
        token: response.data.token,
      });
    } else {
      yield put({type: SIGNIN_FAILURE, error: response.data});
    }
  } catch (error) {
    yield put({type: SIGNIN_FAILURE, error: error});
  }
}

// export function* logoutReqSaga() {
//   try {
//     console.log('//////');
//     yield call(AsyncStorage.removeItem, constants.FOODBROKER);
//     yield put({type: GET_TOKEN_SUCCESS, token: null});
//     yield put({type: LOGOUT_SUCCESS, data: '0'});
//   } catch (error) {
//     yield put({type: LOGOUT_FAILURE, error: error});
//   }
// }

// export function* forgotPassReqSaga(action) {
//   try {
//     const header = {
//       Accept: 'application/json',
//       contenttype: 'application/json',
//       accesstoken: '',
//     };
//     const response = yield call(
//       postApi,
//       'api/forget-password',
//       action.payload,
//       header,
//     );
//     if (response.data.status == true) {
//       yield put({type: FORGOT_PASSWORD_SUCCESS, data: response.data});
//     } else {
//       yield put({type: FORGOT_PASSWORD_FAILURE, error: response.data});
//     }
//   } catch (error) {
//     yield put({type: FORGOT_PASSWORD_FAILURE, error: error});
//   }
// }
export function* getTokenSaga(action) {
  try {
    const creds = null;
    console.log(creds);
    if (creds === null) {
      yield put({type: GET_TOKEN_SUCCESS, token: null});
    } else {
      yield put({
        type: GET_TOKEN_SUCCESS,
        token: creds,
      });
    }
  } catch (error) {
    yield put({type: GET_TOKEN_FAILURE, error: error});
  }
}
const watchFunction = [
  (function* () {
    yield takeLatest(SIGNIN_REQUEST, signinReqSaga);
  })(),
  //   (function* () {
  //     yield takeLatest(LOGOUT_REQUEST, logoutReqSaga);
  //   })(),
  //   (function* () {
  //     yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassReqSaga);
  //   })(),
  (function* () {
    yield takeLatest(GET_TOKEN_REQUEST, getTokenSaga);
  })(),
];

export default watchFunction;
