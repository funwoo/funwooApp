import { LiveChatroomsStateProps } from "../state/liveChatRooms"
import { LivechatRoomsInfo } from "./entities/livechat-rooms-info.entity"
import { backyardAPIHttpClient, rockatchatAPIHttpClient } from "./httpClient"

class Apis {
    getLiveChatRoomList(livechatRoomLastTimeUpdate: string | null) {
        return backyardAPIHttpClient.get<LivechatRoomsInfo[]>('/crm/livechat/rooms', {
            params: {
                updatedSince: livechatRoomLastTimeUpdate
            }
        })
    }
    sentTextMessageToLiveChatRoom = (props: {
        rid: string,
        msg: string,
    }) => {
        return rockatchatAPIHttpClient.post<LiveChatroomsStateProps>('/api/v1/chat.sendMessage', {
            message: {
                msg: props.msg,
                rid: props.rid
            }
        }, {
        })
    }
}
// const fetchLiveChatRooms = ({ agentId, authToken, userId }: { agentId: string, authToken: string, userId: string }) => {
//     return rocketChatHttpClient.get<LiveChatroomsStateProps>('/api/v1/livechat/rooms', {
//         params: {
//             agents: [agentId]
//         },
//         headers: {
//             'X-Auth-Token': authToken,
//             'X-User-Id': userId
//         }
//     })
// }
// const fetchVistiorInfo = ({ visitorId, authToken, userId }: { visitorId: string, authToken: string, userId: string }) => {
//     return rocketChatHttpClient.get<LiveChatroomsStateProps>('/api/v1/livechat/visitors.info', {
//         params: {
//             visitorId: visitorId
//         },
//         headers: {
//             'X-Auth-Token': authToken,
//             'X-User-Id': userId
//         }
//     })
// }
// const sentTextMessageToLiveChatRoom = (props: {
//     token: string,
//     rid: string,
//     msg: string,
//     userId: string
// }) => {
//     return rocketChatHttpClient.post<LiveChatroomsStateProps>('/api/v1/chat.sendMessage', {
//         message: {
//             msg: props.msg,
//             rid: props.rid
//         }
//     }, {
//         headers: {
//             'X-Auth-Token': props.token,
//             'X-User-Id': props.userId
//         }
//     })
// }
export default new Apis()
// export { fetchLiveChatRooms, sentTextMessageToLiveChatRoom, fetchVistiorInfo }