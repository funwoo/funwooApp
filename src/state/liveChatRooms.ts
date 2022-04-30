import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector, selectorFamily } from "recoil";
import { rocketChatHttpClient } from "../network/httpClient";
import { currentUserInfoState } from "./currentUserInfoState";

const liveChatroomsState = selectorFamily<LiveChatroomsStateProps, { agentId: string, authToken: string, userId: string }>({
    key: 'LiveChatroomsState',
    get: ({ agentId, authToken, userId }) => async () => {
        try {
            if (!agentId && !authToken && !userId) return null
            const { data } = await rocketChatHttpClient.get('/api/v1/livechat/rooms', {
                params: {
                    agents: [agentId]
                },
                headers: {
                    'X-Auth-Token': authToken,
                    'X-User-Id': userId
                }
            })
            console.log(JSON.stringify(data))
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    },
});

export interface V {
    _id: string;
    username: string;
    token: string;
    status: string;
    lastMessageTs: Date;
}

export interface Source {
    type: string;
}

export interface U {
    _id: string;
    username: string;
    name: string;
}

export interface Value {
    type: string;
    value: string;
}

export interface Md {
    type: string;
    value: Value[];
}

export interface LastMessage {
    _id: string;
    rid: string;
    msg: string;
    ts: Date;
    u: U;
    _updatedAt: Date;
    urls: any[];
    mentions: any[];
    channels: any[];
    md: Md[];
}

export interface Reaction {
    fd: Date;
    ft: number;
    tt: number;
}

export interface Response {
    avg: number;
    fd: Date;
    ft: number;
    total: number;
    tt: number;
}

export interface V2 {
    lq: Date;
}

export interface ServedBy {
    lr: Date;
}

export interface Metrics {
    reaction: Reaction;
    response: Response;
    v: V2;
    servedBy: ServedBy;
}

export interface ServedBy2 {
    _id: string;
    username: string;
    ts: Date;
}

export interface ResponseBy {
    _id: string;
    username: string;
    lastMessageTs: Date;
}

export interface Room {
    _id: string;
    msgs: number;
    usersCount: number;
    lm: Date;
    fname: string;
    t: string;
    ts: Date;
    v: V;
    cl: boolean;
    open: boolean;
    source: Source;
    queuedAt: Date;
    _updatedAt: Date;
    lastMessage: LastMessage;
    metrics: Metrics;
    servedBy: ServedBy2;
    responseBy: ResponseBy;
}

export interface LiveChatroomsStateProps {
    rooms: Room[];
    count: number;
    offset: number;
    total: number;
    success: boolean;
}

export { liveChatroomsState }