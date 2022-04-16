import {combineReducers} from 'redux';
import handleCalCulatePrice from './CalculateReducer';
import {fcmToken} from './FCM_Token';

export const rootReducer = combineReducers({handleCalCulatePrice, fcmToken});

