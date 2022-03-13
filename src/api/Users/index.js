import axios from '../axios';

/**
 *
 * @data {mobileNo,password}
 * @returns
 */
export const SignInUser = data => {
  return axios.post('/login', data);
};

/**
 *
 * @param {*} data
 * @returns
 */
export const SignUpUser = data => {
  return axios.post('/signup', data);
};

/**
 *
 * @param {*} data
 * @returns
 */
export const ForgetPassword = data => {
  return axios.post('/forget-password', data);
};
/**
 *
 * @param {*} data
 * @returns
 */
export const OtpVerifyAPI = data => {
  return axios.post('/verify-otp', data);
};
/**
 *
 * @param {*} data
 * @returns
 */
export const OtpVerifyAPIRegister = data => {
  return axios.post('/send-otp', data);
};
/**
 *
 * @param {*} data
 * @returns
 */
export const ResetPassword = data => {
  return axios.post('/reset-password', data);
};

export const UserInfo = data => {
  return axios.post('/user-info', data);
};
