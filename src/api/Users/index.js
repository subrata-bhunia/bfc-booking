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
