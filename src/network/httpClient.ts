import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const backyardAPIHttpClient = axios.create({
    // baseURL: "https://funwoo-apis-av33oxrlwq-de.a.run.app/"
    baseURL: "http://localhost:8080/"
})
backyardAPIHttpClient.interceptors.request.use(async (config) => {
    try {
        const userInfo = await AsyncStorage.getItem('userInfo')
        if (userInfo === null) return config
        config.headers = {
            ...config.headers,
            'authorization': "Bearer " + JSON.parse(userInfo).jwt
        }
        return config
    } catch (error) {
        return config
    }

}, (error) => {
    return Promise.reject(error);
})
export { backyardAPIHttpClient }