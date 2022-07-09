import axios from 'axios';
const instance = axios.create({baseURL: 'https://debpurbfc.com/api/v1'});
// const instance = axios.create({baseURL: 'https://dev.debpurbfc.com/api/v1'});
// const instance = axios.create({
//   baseURL: 'https://admin.delicoapp.in/bfc/public/api/v1',
// });
export default instance;
