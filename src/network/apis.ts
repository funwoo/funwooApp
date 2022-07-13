import {LiveChatroomsStateProps} from '../state/liveChatRooms';
import {LivechatRoomsInfo} from './entities/livechat-rooms-info.entity';
import {backyardAPIHttpClient, rockatchatAPIHttpClient} from './httpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {ContactProps} from './entities/contact-enity';
import {CustomFieldsProps} from './entities/custom-fields.entity';

class Apis {
  getLiveChatRoomList(livechatRoomLastTimeUpdate: string | null) {
    return backyardAPIHttpClient.get<LivechatRoomsInfo[]>(
      '/crm/livechat/rooms',
      {
        params: {
          updatedSince:
            livechatRoomLastTimeUpdate ?? '2021-04-23T12:25:20.287Z',
        },
      },
    );
  }

  sentTextMessageToLiveChatRoom = (props: {rid: string; msg: string}) => {
    return rockatchatAPIHttpClient.post<LiveChatroomsStateProps>(
      '/api/v1/chat.sendMessage',
      {
        message: {
          msg: props.msg,
          rid: props.rid,
        },
      },
      {},
    );
  };
  sentImageMessageToLiveChatRoom = (props: {
    rid: string;
    image_url: string;
  }) => {
    return rockatchatAPIHttpClient.post<LiveChatroomsStateProps>(
      '/api/v1/chat.sendMessage',
      {
        message: {
          rid: props.rid,
          attachments: [
            {
              image_url: props.image_url,
            },
          ],
        },
      },
      {},
    );
  };

  setUserStatus() {
    return rockatchatAPIHttpClient.post('/api/v1/users.setStatus', {
      message: '',
      status: 'online',
    });
  }

  setImageMessage(
    file: {
      name: string;
      filename: string;
      filepath: string;
    },
    rid: string,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo == null) {
          reject('userInfo empty');
          return;
        }
        const response = await RNFetchBlob.fetch(
          'POST',
          `https://crm.funwoo.com.tw/api/v1/rooms.upload/${rid}`,
          {
            'Content-Type': 'multipart/form-data',
            'X-User-Id': JSON.parse(userInfo).userId,
            'X-Auth-Token': JSON.parse(userInfo).authToken,
          },
          [
            {
              name: file.name,
              type: `image/${file!
                .filepath!.split(/[#?]/)[0]
                .split('.')
                .pop()
                ?.trim()}`,
              filename: file.filename,
              data: RNFetchBlob.wrap(decodeURI(file.filepath)),
            },
          ],
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  getCustomFields() {
    return rockatchatAPIHttpClient.get<CustomFieldsProps>(
      '/api/v1/livechat/custom-fields',
    );
  }

  getUserContact(contactId: string) {
    return rockatchatAPIHttpClient.get<ContactProps>(
      '/api/v1/omnichannel/contact',
      {
        params: {
          contactId: contactId,
        },
      },
    );
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
export default new Apis();
// export { fetchLiveChatRooms, sentTextMessageToLiveChatRoom, fetchVistiorInfo }
