import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://api.foodazine.xlogicsolutions.com',
  baseURL: 'http://localhost:5000',
});

export default instance;
