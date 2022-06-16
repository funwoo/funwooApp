import axios from "axios";

const rocketChatHttpClient = axios.create({
    baseURL: "https://crm.funwoo.com.tw"
})
const backyardAPIHttpClient = axios.create({
    baseURL: "https://backyard-api-av33oxrlwq-de.a.run.app"
})
export { rocketChatHttpClient, backyardAPIHttpClient }