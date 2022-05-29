import {
  CHECK_AVAILABILITY_REQUEST,
  CHECK_AVAILABILITY_SUCCESS,
  CHECK_AVAILABILITY_FAILURE,
  CHECK_RETURN_ITEM_REQUEST,
  CHECK_RETURN_ITEM_SUCCESS,
  CHECK_RETURN_ITEM_FAILURE,
  GET_INVENTORY_ITEM_REQUEST,
  GET_INVENTORY_ITEM_SUCCESS,
  GET_INVENTORY_ITEM_FAILURE,
} from '../action/types';
const initialState = {
  status: '',
  loader: false,
  error: '',
  checkAvailabilityRes: {},
  checkReturnItemRes: {},
  inventoryItem: {},
};
const AllCheckHandleReducer = (state = initialState, action) => {
  console.log('AllCheckHandleReducer', action);
  switch (action.type) {
    case CHECK_AVAILABILITY_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case CHECK_AVAILABILITY_SUCCESS:
      return {
        ...state,
        status: action.type,
        loader: false,
        checkAvailabilityRes: action.checkAvailabilityRes,
      };
    case CHECK_AVAILABILITY_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error,
        loader: false,
      };
    case CHECK_RETURN_ITEM_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case CHECK_RETURN_ITEM_SUCCESS:
      return {
        ...state,
        status: action.type,
        loader: false,
        checkReturnItemRes: action.checkReturnItemRes,
      };
    case CHECK_RETURN_ITEM_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error,
        loader: false,
      };
    case GET_INVENTORY_ITEM_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case GET_INVENTORY_ITEM_SUCCESS:
      return {
        ...state,
        status: action.type,
        loader: false,
        inventoryItem: action.inventoryItem,
      };
    case GET_INVENTORY_ITEM_FAILURE:
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
export default AllCheckHandleReducer;
