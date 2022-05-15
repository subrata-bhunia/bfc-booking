import axios from '../axios';

export const addKhataEntry = data => {
  return axios.post('/add-khata-entry', data);
};
export const getKhataEntry = data => {
  return axios.post('/all-khata-entry', data);
};
