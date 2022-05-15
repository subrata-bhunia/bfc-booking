import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';
import {rootReducer} from '../reducer';
import RootSaga from '../sagas/RootSaga';
let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];
const reducer = rootReducer;
const store = configureStore({
  reducer,
  middleware,
});
sagaMiddleware.run(RootSaga);

export default store;
