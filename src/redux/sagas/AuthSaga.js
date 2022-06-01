import AsyncStorage from '@react-native-async-storage/async-storage';
import {put, call, takeLatest} from 'redux-saga/effects';
import {postApi} from '../../api';
import {
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_INFO_REQUEST,
} from '../action/types';

export function* signinReqSaga(action) {
  try {
    console.log({'the action is': action.payload});
    let response = yield call(postApi, '/login', action.payload);
    console.log({'response is': response});

    if (response.data.status == 'Success') {
      yield put({
        type: SIGNIN_SUCCESS,
        signinRes: response.data,
      });
      console.log('Token : ' + response.data.user_id);
      yield call(
        AsyncStorage.setItem,
        'userId',
        // JSON.stringify({token: response.data.data.token}),
        response.data.user_id,
      );
      yield put({
        type: GET_TOKEN_SUCCESS,
        token: response.data.user_id,
      });
    } else {
      yield put({type: SIGNIN_FAILURE, error: response.data.message});
    }
  } catch (error) {
    yield put({type: SIGNIN_FAILURE, error: error});
  }
}

export function* logoutReqSaga() {
  try {
    // console.log('//////');
    yield call(AsyncStorage.removeItem, 'userId');
    yield put({type: GET_TOKEN_SUCCESS, token: null});
    yield put({type: LOGOUT_SUCCESS, data: '0'});
  } catch (error) {
    yield put({type: LOGOUT_FAILURE, error: error});
  }
}

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
    const creds = yield call(AsyncStorage.getItem, 'userId');
    console.log(creds);
    if (creds === null) {
      yield put({type: GET_TOKEN_SUCCESS, token: null});
    } else {
      yield put({
        type: GET_TOKEN_SUCCESS,
        token: creds,
      });
      yield put({
        type: USER_INFO_REQUEST,
        payload: {
          user_id: creds,
        },
      });
    }
  } catch (error) {
    yield put({type: GET_TOKEN_FAILURE, error: error});
  }
}
export function* signupReqSaga(action) {
  try {
    console.log({'the action is': action.payload});
    let response = yield call(postApi, '/signup', action.payload);
    console.log({'response is': response});

    if (response.data.status == 'Success') {
      yield put({
        type: SIGNUP_SUCCESS,
        signinRes: response.data,
      });
      // console.log('Token : ' + response.data.user_id);
      // yield call(AsyncStorage.setItem, 'userId', response.data.user_id);
      // yield put({
      //   type: GET_TOKEN_SUCCESS,
      //   token: null,
      //   redirect: 'login'
      // });
    } else {
      yield put({type: SIGNUP_FAILURE, error: response.data.message});
    }
  } catch (error) {
    yield put({type: SIGNIN_FAILURE, error: error});
  }
}
export function* userinfo(action) {
  try {
    let response = yield call(postApi, '/user-info', action.payload);
    console.log('USER_INFO', response.data);
    // if(response.data)
  } catch (error) {
    console.log(error);
  }
}
const watchFunction = [
  (function* () {
    yield takeLatest(SIGNIN_REQUEST, signinReqSaga);
  })(),
  (function* () {
    yield takeLatest(SIGNUP_REQUEST, signupReqSaga);
  })(),
  (function* () {
    yield takeLatest(LOGOUT_REQUEST, logoutReqSaga);
  })(),
  //   (function* () {
  //     yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassReqSaga);
  //   })(),
  (function* () {
    yield takeLatest(GET_TOKEN_REQUEST, getTokenSaga);
  })(),
  (function* () {
    yield takeLatest(USER_INFO_REQUEST, userinfo);
  })(),
];

export default watchFunction;
