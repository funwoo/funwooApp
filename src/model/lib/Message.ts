import {Q} from '@nozbe/watermelondb';
import moment from 'moment';
import {database} from '../../..';
import {Message} from '../../network/entities/history-message-enity';
import {Arg} from '../../types/StreamRoomMessagesPropsType';
import {MESSAGES_TABLE} from '../Message';

const saveMessage = async (messages: Message[]) => {
  const values = await Promise.all(
    messages.map(item => {
      return updateOrCreateMessage(item._id, {
        message_id: item?._id ?? '',
        text: getMessageText(item),
        name: item?.u?.name ?? '',
        avatar: '',
        date: item?._updatedAt ? parseInt(moment(item?._updatedAt).unix()) : 0,
        type: getMessageType(item),
        image: getImageValue(item),
        isEarliest: false,
        userId: item?.u?._id ?? '',
        roomId: item?.rid ?? '',
        username: item?.u?.username ?? '',
      });
    }),
  );
  database.write(async () => {
    await database.batch(
      //@ts-ignore
      values,
    );
  });
};
const getImageValue = (item: Arg | Message) => {
  if ((item?.attachments?.length ?? 0) > 0) {
    const url = item?.attachments?.[0]?.image_url ?? '';
    if (url?.includes('http')) {
      return url;
    } else {
      return 'https://crm.funwoo.com.tw' + url;
    }
  } else {
    return '';
  }
};
const getMessageText = (item: Arg | Message) => {
  const type = item?.t ?? '';
  if (type === 'livechat-started') {
    return `${item.u?.name} 已加入 `;
  } else if (type === 'command' && item?.msg == 'connected') {
    return `顧問${item.u?.username} 已開始接手`;
  } else if (type === 'livechat_transfer_history') {
    return `顧問${item.u?.username} 轉交了聊天室給 ${item?.transferData?.transferredTo?.name}`;
  } else if (type === 'ul') {
    return `顧問${item.u?.username} 已離開聊天室`;
  } else if (type === 'uj') {
    return `顧問${item.u?.username} 已加入聊天室`;
  } else {
    return item?.msg ?? '';
  }
};
const getEarliestMessageDate = async (rid: string) => {
  const messages = await database
    .get(MESSAGES_TABLE)
    .query(Q.where('roomId', rid))
    .fetch();
  if (messages.length === 0) return undefined;

  return moment.unix(messages[messages.length - 1]?.date).toISOString();
};
const getMessageType = (item: Arg | Message) => {
  const type = item?.t ?? undefined;
  if (
    type === 'livechat-started' ||
    type === 'command' ||
    type === 'livechat_transfer_history' ||
    type === '' ||
    type === 'ul' ||
    type === 'uj'
  ) {
    return 'system';
  } else if ((item?.attachments?.length ?? []) > 0) {
    return 'image';
  } else {
    return 'Text';
  }
};
// const createMessage = () =>{
//   return  database.write(async()=>{
//         await database.get(MESSAGES_TABLE).create((message)=>{
//          message.message_id = messageData._id;
//          message.text = ;
//          message.name = name;
//          message.avatar = avatar;
//          message.date = date;
//          message.type = type;
//          message.image = image;
//          message.isEarliest = isEarliest;
//          message.userId = userId;
//          message.roomId = roomId;
//          message.username = username;
//          })
//        })
// }
const updateOrCreateMessage = (
  messageId: string,
  {
    message_id,
    text,
    name,
    avatar,
    date,
    type,
    image,
    isEarliest,
    userId,
    roomId,
    username,
  }: {
    message_id: string;
    text: string;
    name: string;
    avatar: string;
    date: number;
    type: string;
    image: string;
    isEarliest: boolean;
    userId: string;
    roomId: string;
    username: string;
  },
) => {
  console.log(
    messageId,
    message_id,
    text,
    name,
    avatar,
    date,
    type,
    image,
    isEarliest,
    userId,
    roomId,
    username,
  );
  return new Promise(async (resolve, reject) => {
    try {
      const messages = await database
        .get(MESSAGES_TABLE)
        .query(Q.where('message_id', messageId))
        .fetch();
      if (messages.length == 0) {
        resolve(
          database.get(MESSAGES_TABLE).prepareCreate(message => {
            message.message_id = message_id;
            message.text = text;
            message.name = name;
            message.avatar = avatar;
            message.date = date;
            message.type = type;
            message.image = image;
            message.isEarliest = isEarliest;
            message.userId = userId;
            message.roomId = roomId;
            message.username = username;
          }),
        );
      } else {
        const existMessage = await database
          .get(MESSAGES_TABLE)
          .find(messages[0].id);
        resolve(
          existMessage.prepareUpdate(message => {
            message.message_id = message_id;
            message.text = text;
            message.name = name;
            message.avatar = avatar;
            message.date = date;
            message.type = type;
            message.image = image;
            message.isEarliest = isEarliest;
            message.userId = userId;
            message.roomId = roomId;
            message.username = username;
          }),
        );
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export {
  saveMessage,
  getEarliestMessageDate,
  updateOrCreateMessage,
  getImageValue,
};
