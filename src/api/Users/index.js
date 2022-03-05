import axios from '../axios';

/**
 *
 * @data {mobileNo,password}
 * @returns
 */
export const SignIn = data => {
  return axios.post('/signin', data);
};

/**
 *
 * @param {*} data
 * @returns
 */
export const SignUp = data => {
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
