import AsyncStorage from '@react-native-async-storage/async-storage';
import {put, call, takeLatest, select} from 'redux-saga/effects';
import {postApi} from '../../api';
import {
  CHECK_AVAILABILITY_REQUEST,
  CHECK_AVAILABILITY_SUCCESS,
  CHECK_AVAILABILITY_FAILURE,
  CHECK_RETURN_ITEM_SUCCESS,
  CHECK_RETURN_ITEM_FAILURE,
  CHECK_RETURN_ITEM_REQUEST,
  GET_INVENTORY_ITEM_SUCCESS,
  GET_INVENTORY_ITEM_FAILURE,
  GET_INVENTORY_ITEM_REQUEST,
} from '../action/types';

export function* checkAvailabilitySaga(action) {
  try {
    let authReducerRes = yield select(state => state.AuthReducer);
    let user_id = authReducerRes.token;
    console.log('user id from add booking saga page:', user_id);
    console.log('action from add booking saga page:', {
      user_id,
      ...action.payload,
    });
    let response = yield call(postApi, '/check-availability', {
      user_id,
      ...action.payload,
    });

    if (response.data.status == 'Success') {
      yield put({
        type: CHECK_AVAILABILITY_SUCCESS,
        checkAvailabilityRes: response.data,
      });
    } else {
      yield put({
        type: CHECK_AVAILABILITY_FAILURE,
        error: response.data.message,
      });
    }
  } catch (error) {
    yield put({type: CHECK_AVAILABILITY_FAILURE, error: error});
  }
}
export function* checkReturnItemSaga(action) {
  try {
    let authReducerRes = yield select(state => state.AuthReducer);
    let user_id = authReducerRes.token;
    let response = yield call(postApi, '/check-return-items', {
      user_id,
      ...action.payload,
    });

    if (response.data.status == 'Success') {
      yield put({
        type: CHECK_RETURN_ITEM_SUCCESS,
        checkReturnItemRes: response.data,
      });
    } else {
      yield put({
        type: CHECK_RETURN_ITEM_FAILURE,
        error: response.data.message,
      });
    }
  } catch (error) {
    yield put({type: CHECK_RETURN_ITEM_FAILURE, error: error});
  }
}
export function* getInventoryItemSaga(action) {
  try {
    let authReducerRes = yield select(state => state.AuthReducer);
    let user_id = authReducerRes.token;

    let response = yield call(postApi, '/inventory-items', {
      user_id,
      ...action.payload,
    });

    if (response.data.status == 'Success') {
      yield put({
        type: GET_INVENTORY_ITEM_SUCCESS,
        inventoryItem: response.data,
      });
    } else {
      yield put({
        type: GET_INVENTORY_ITEM_FAILURE,
        error: response.data.message,
      });
    }
  } catch (error) {
    yield put({type: GET_INVENTORY_ITEM_FAILURE, error: error});
  }
}

const watchFunctionForAllCheckhandle = [
  (function* () {
    yield takeLatest(CHECK_AVAILABILITY_REQUEST, checkAvailabilitySaga);
  })(),
  (function* () {
    yield takeLatest(CHECK_RETURN_ITEM_REQUEST, checkReturnItemSaga);
  })(),
  (function* () {
    yield takeLatest(GET_INVENTORY_ITEM_REQUEST, getInventoryItemSaga);
  })(),
];

export default watchFunctionForAllCheckhandle;
