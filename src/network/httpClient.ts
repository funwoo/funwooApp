import axios from "axios";

const rocketChatHttpClient = axios.create({
    baseURL: "https://crm.funwoo.com.tw"
})
export { rocketChatHttpClient }