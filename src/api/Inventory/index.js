import axios from '../axios';

/**
 *TODO:Nothing
 * ! Nothing
 * * AvailableItems
 * ? Test
 * @returns
 */
export const AvailableItems = () => {
  return axios.post('/inventory-items');
};
