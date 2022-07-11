import axios from 'axios';
import {Api} from './funwoo.api';

export const BACKYARD_OAS_API_URL = __DEV__
  ? 'https://funwoo-apis-staging-av33oxrlwq-de.a.run.app'
  : 'https://funwoo-apis-av33oxrlwq-de.a.run.app';

export default axios.create({
  baseURL: 'https://funwoo.com.tw/',
});

const swaggerApiInstance = axios.create({
  baseURL: BACKYARD_OAS_API_URL,
});

swaggerApiInstance.interceptors.request.use(config => {
  config.headers!['x-funwoo-platform'] = `app-${process.platform}`;
  return config;
});

const swaggerHttpClient = new Api();
swaggerHttpClient.instance = swaggerApiInstance;

export {swaggerHttpClient};
