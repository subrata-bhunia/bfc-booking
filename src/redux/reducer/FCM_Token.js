import {messages} from 'react-native-firebase-push-notifications';

export const fcmToken = (state = {}, action) => {
  switch (action.type) {
    case 'GET_FCM':
      return {
        user_id: action.user_id,
        fcm_token: action.fcm_token,
      };
    default:
      return state;
  }
};
