import {
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_TOKEN_FAILURE,
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
  USER_INFO_FAILURE,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  VERIFY_OTP_FORGOT_PASSWORD_FAILURE,
  VERIFY_OTP_FORGOT_PASSWORD_REQUEST,
  VERIFY_OTP_FORGOT_PASSWORD_SUCCESS,
  VERIFY_OTP_SIGNUP_FAILURE,
  VERIFY_OTP_SIGNUP_REQUEST,
  VERIFY_OTP_SIGNUP_SUCCESS,
} from '../action/types';
const initialState = {
  status: '',
  loader: false,
  error: '',
  signinRes: {},
  forgotPassRes: {},
  token: null,
  loading: true,
  userDetails: {},
};
const AuthReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        status: action.type,
        signinRes: action.signinRes,
        loader: false,
      };
    case SIGNIN_FAILURE:
      console.log({'failure res': action.error});
      return {
        ...state,
        status: action.type,
        error: action.error,
        loader: false,
      };
    case GET_TOKEN_REQUEST:
      return {
        ...state,
        status: action.type,
      };
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        status: action.type,
        token: action.token,
        loading: false,
      };
    case GET_TOKEN_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error,
        token: null,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        status: action.type,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        status: action.type,
        logout: true,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error,
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        status: action.type,
        forgotPassRes: action.forgotPassRes,
        loader: false,
      };
    case FORGOT_PASSWORD_FAILURE:
      // console.log({'failure res': action.error});
      return {
        ...state,
        status: action.type,
        error: action.error,
        loader: false,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        status: action.type,
        loader: false,
        signinRes: action.signinRes,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        status: action.type,
        loader: false,
        error: action.error,
      };
    case VERIFY_OTP_FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case VERIFY_OTP_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        status: action.type,
        loader: false,
      };
    case VERIFY_OTP_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        status: action.type,
        loader: false,
        error: action.error,
      };
    case VERIFY_OTP_SIGNUP_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case VERIFY_OTP_SIGNUP_SUCCESS:
      return {
        ...state,
        status: action.type,
        loader: false,
      };
    case VERIFY_OTP_SIGNUP_FAILURE:
      return {
        ...state,
        status: action.type,
        loader: false,
        error: action.error,
      };
    case USER_INFO_REQUEST:
      return {
        ...state,
        status: action.type,
        loader: true,
      };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        status: action.type,
        loader: false,
        userDetails: action.userDetails,
      };
    case USER_INFO_FAILURE:
      return {
        ...state,
        status: action.type,
        loader: false,
        userDetails: action.error,
      };
    default:
      return state;
  }
};
export default AuthReducer;
