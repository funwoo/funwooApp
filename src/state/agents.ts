import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector } from "recoil";
import { backyardAPIHttpClient } from "../network/httpClient";

const agentListState = selector<Agent[]>({
    key: 'agentListState',
    get: async ({ get }) => {
        try {
            const { data } = await backyardAPIHttpClient.get<AgentListResponse>('/v1/agent?op=list')
            return data.payload
        } catch (error) {
            return []
        }
    },
});
export { agentListState }
export interface Agent {
    id: string;
    name: string;
    chinese_name: string;
    english_name: string;
    bio: string;
    email: string;
    pictures: string[];
    contact_phone: string;
    contact_fb: string;
    contact_ig: string;
    contact_line: string;
    license: string;
    active: boolean;
    sid: string;
    group: string;
}

export interface AgentListResponse {
    payload: Agent[];
}

