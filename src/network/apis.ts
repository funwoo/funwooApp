import {LiveChatroomsStateProps} from '../state/liveChatRooms';
import {LivechatRoomsInfo} from './entities/livechat-rooms-info.entity';
import {backyardAPIHttpClient, rockatchatAPIHttpClient} from './httpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFetchBlob from 'rn-fetch-blob';
import {ContactProps} from './entities/contact-enity';
import {CustomFieldsProps} from './entities/custom-fields.entity';
import {VisitorResponse} from './entities/visitor-enity';
import {InquiriesQueuedListProps} from './entities/Inquiries-queued-list-enity';
import RNBlobUtils from 'react-native-blob-util';
import {AgentListEntity} from './entities/agent-list-entity';

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

        const response = await RNBlobUtils.fetch(
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
              data: RNBlobUtils.wrap(decodeURI(file.filepath)),
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

  getUserInfo(visitorId: string) {
    return rockatchatAPIHttpClient.get<VisitorResponse>(
      '/api/v1/livechat/visitors.info',
      {
        params: {
          visitorId: visitorId,
        },
      },
    );
  }

  setRead = (rid: string) => {
    return rockatchatAPIHttpClient.post<{success: boolean}>(
      '/api/v1/subscriptions.read',
      {
        rid: rid,
      },
    );
  };

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

  getInquiriesQueuedList(offset?: number) {
    return rockatchatAPIHttpClient.get<InquiriesQueuedListProps>(
      '/api/v1/livechat/inquiries.queued',
      {
        params: {
          offset: offset,
        },
      },
    );
  }

  takeChat(inquiryId: string) {
    return rockatchatAPIHttpClient.post<InquiriesQueuedListProps>(
      '/api/v1/livechat/inquiries.take',
      {
        inquiryId: inquiryId,
      },
    );
  }
  getAllAgentList() {
    return rockatchatAPIHttpClient.get<AgentListEntity>(
      '/api/v1/livechat/users/agent',
    );
  }
}
export default new Apis();
