import {
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_SUCCESS,
  NOTIFICATIONS_FAILURE,
} from '../action/types';
const initialState = {
  status: '',
  loader: false,
  error: '',
  getNotificationRes: {},
};
const ExtraOthersReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case NOTIFICATIONS_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        status: action.type,
        getNotificationRes: action.getNotificationRes,
        loader: false,
      };
    case NOTIFICATIONS_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error,
        loader: false,
      };
    default:
      return state;
  }
};
export default ExtraOthersReducer;
