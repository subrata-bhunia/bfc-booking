import {
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_SUCCESS,
  NOTIFICATIONS_FAILURE,
  ALL_MEMBERS_REQUEST,
  ALL_MEMBERS_SUCCESS,
  ALL_MEMBERS_FAILURE,
} from '../action/types';
const initialState = {
  status: '',
  loader: false,
  error: '',
  getNotificationRes: {},
  getAllMembersRes: {},
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
    case ALL_MEMBERS_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case ALL_MEMBERS_SUCCESS:
      return {
        ...state,
        status: action.type,
        getAllMembersRes: action.getAllMembersRes,
        loader: false,
      };
    case ALL_MEMBERS_FAILURE:
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
