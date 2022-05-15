import axios from './axios';

export async function getApi(url) {
  console.log('GetApi: ', `${url}`);

  return await axios.get(`${url}`);
}

export async function postApi(url, payload, header) {
  console.log('PostApi: ', `${url}`, payload);

  return await axios.post(`${url}`, payload);
}
