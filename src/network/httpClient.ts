import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const backyardAPIHttpClient = axios.create({
  baseURL: 'https://funwoo-apis-av33oxrlwq-de.a.run.app/',
  // baseURL: "http://localhost:8080/"
});
backyardAPIHttpClient.interceptors.request.use(
  async config => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo === null) {
        return config;
      }
      config.headers = {
        ...config.headers,
        authorization: 'Bearer ' + JSON.parse(userInfo).jwt,
      };
      return config;
    } catch (error) {
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  },
);
const rockatchatAPIHttpClient = axios.create({
  // baseURL: "https://funwoo-apis-av33oxrlwq-de.a.run.app/"
  baseURL: 'https://crm.funwoo.com.tw/',
});
rockatchatAPIHttpClient.interceptors.request.use(
  async config => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo === null) {
        return config;
      }
      config.headers = {
        ...config.headers,
        'X-User-Id': JSON.parse(userInfo).userId,
        'X-Auth-Token': JSON.parse(userInfo).authToken,
      };
      return config;
    } catch (error) {
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  },
);
export {backyardAPIHttpClient, rockatchatAPIHttpClient};
