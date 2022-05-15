import {combineReducers} from 'redux';
import handleCalCulatePrice from './CalculateReducer';
import {fcmToken} from './FCM_Token';
import AuthReducer from './AuthReducer';
export const rootReducer = combineReducers({
  handleCalCulatePrice,
  fcmToken,
  AuthReducer,
});
