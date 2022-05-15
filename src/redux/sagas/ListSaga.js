// import {put, call, fork, takeLatest, select, all} from 'redux-saga/effects';
// import {getApi} from '../../api';
// import {
//   ALL_ITEMS_FAILURE,
//   ALL_ITEMS_REQUEST,
//   ALL_ITEMS_SUCCESS,
//   CATEGORIES_FAILURE,
//   CATEGORIES_REQUEST,
//   CATEGORIES_SUCCESS,
// } from '../actions/types';

// export function* getAllItemsReqSaga(action) {
//   try {
//     let response = yield call(getApi, `/products`);
//     console.log(response);
//     if (response.data) {
//       yield put({
//         type: ALL_ITEMS_SUCCESS,
//         data: response.data,
//       });
//     } else {
//       console.log('err');
//       yield put({type: ALL_ITEMS_FAILURE, error: response.data});
//     }
//   } catch (error) {
//     console.log('err2');
//     yield put({type: ALL_ITEMS_FAILURE, error: error});
//   }
// }

// // export function* getItemStockReqSaga(action) {
// //   try {
// //     let response = yield call(
// //       getApi,
// //       `api/menu-item-stock/${action.payload}`,
// //     );
// //     if (response.data.success == true) {
// //       yield put({
// //         type: PANTRY_ITEMS_STOCK_SUCCESS,
// //         data: response.data,
// //       });
// //     } else {
// //       yield put({type: PANTRY_ITEMS_STOCK_FAILURE, error: response.data});
// //     }
// //   } catch (error) {
// //     yield put({type: PANTRY_ITEMS_STOCK_FAILURE, error: error});
// //   }
// // }

// export function* getAllCategoriesReqSaga(action) {
//   try {
//     let response = yield call(getApi, `/products/categories`);
//     console.log(response);
//     if (response.data) {
//       yield put({
//         type: CATEGORIES_SUCCESS,
//         data: response.data,
//       });
//     } else {
//       console.log('err');
//       yield put({type: CATEGORIES_FAILURE, error: response.data});
//     }
//   } catch (error) {
//     console.log('err2');
//     yield put({type: CATEGORIES_FAILURE, error: error});
//   }
// }

// const watchFunction = [
//   (function* () {
//     yield takeLatest(ALL_ITEMS_REQUEST, getAllItemsReqSaga);
//   })(),
//   (function* () {
//     yield takeLatest(CATEGORIES_REQUEST, getAllCategoriesReqSaga);
//   })(),
// ];

// export default watchFunction;
