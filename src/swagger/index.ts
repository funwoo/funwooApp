import axios from 'axios';
import {Api} from './funwoo.api';

// export const BACKYARD_OAS_API_URL = __DEV__
//   ? 'http://localhost:8080/'
//   : 'https://funwoo-apis-av33oxrlwq-de.a.run.app';
export const BACKYARD_OAS_API_URL =
  'https://funwoo-apis-av33oxrlwq-de.a.run.app';

export default axios.create({
  baseURL: 'https://funwoo.com.tw/',
});

const swaggerApiInstance = axios.create({
  baseURL: BACKYARD_OAS_API_URL,
});

const swaggerHttpClient = new Api();
swaggerHttpClient.instance = swaggerApiInstance;

export {swaggerHttpClient};
