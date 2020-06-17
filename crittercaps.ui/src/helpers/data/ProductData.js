import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys;

const getNewestProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/products/newest`)
    .then((result) => {
      const newestProducts = result.data;

      resolve(newestProducts);
    })
    .catch((error) => reject(error));
});

const getAllAvailableProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/crittercaps/products/available`)
    .then((result) => {
      const availableProducts = result.data;

      resolve(availableProducts);
    })
    .catch((error) => reject(error));
});

export default { getNewestProducts, getAllAvailableProducts };
