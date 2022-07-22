import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import uuid from 'react-native-uuid';
import useWebSocket from 'react-native-use-websocket';
import {StreamRoomMessagesProps} from '../types/StreamRoomMessagesPropsType';
import {useUserInfoContextProvider} from './UserInfoContextProvider';
import {database} from '../..';
import {ROOMS_TABLE} from '../model/Room';
import {Q} from '@nozbe/watermelondb';
import moment from 'moment';
import apis from '../network/apis';
import {MESSAGES_TABLE} from '../model/Message';
import {
  getImageValue,
  saveMessage,
  updateOrCreateMessage,
} from '../model/lib/Message';

interface WebsocketContextProviderProps {
  sendJsonMessage: (value: Object) => void;
  setRoomMessageChangeCallback: (
    callback: (value: RoomChangeProps) => void,
  ) => void;
  removeRoomMessageChangeCallback: () => void;
  webSocketStatus: webSocketStatusType;
  onEnterRoom: (roomId: string) => void;
  onExitRoom: () => void;
}

const WebsocketContext = createContext({} as WebsocketContextProviderProps);
export type webSocketStatusType = '嘗試連接中' | '錯誤' | '已連接';
const socketUrl = 'wss://crm.funwoo.com.tw/websocket';
const WebsocketContextProviderProvider: FC<{}> = ({children}) => {
  const roomDBIsWritting = useRef(false);
  const roomSubId = useRef(uuid.v4());
  const {userInfo} = useUserInfoContextProvider();
  const currentRoomId = useRef('');
  const [webSocketStatus, setWebsocketStatus] =
    useState<webSocketStatusType>('嘗試連接中');
  const RoomMessageChangeCallbackRef =
    useRef<(value: StreamRoomMessagesProps) => void>();
  const setRoomMessageChangeCallback = (
    callback: (value: StreamRoomMessagesProps) => void,
  ) => {
    RoomMessageChangeCallbackRef.current = callback;
  };
  const removeRoomMessageChangeCallback = () => {
    RoomMessageChangeCallbackRef.current = undefined;
  };
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onMessage: async event => {
      const data = JSON.parse(event.data);
      if (!userInfo?.authToken) {
        return null;
      }
      if (data?.result?.type === 'resume') {
        setWebsocketStatus('已連接');
        sendJsonMessage({
          msg: 'sub',
          id: uuid.v4(),
          name: 'stream-notify-user',
          params: [`${userInfo.userId}/rooms-changed`, false],
        });
      } else if (data?.msg === 'ping') {
        sendJsonMessage({
          msg: 'pong',
        });
      } else if (
        data?.collection === 'stream-notify-user' &&
        data?.fields?.eventName === `${userInfo.userId}/rooms-changed`
      ) {
        const visitorId = data?.fields?.args?.[1]?.v?._id ?? null;
        const servedBy = data?.fields?.args?.[1]?.servedBy?._id ?? null;
        let visitor: any = undefined;
        if (visitorId != null) {
          const {data: visitorInfo} = await apis.getUserInfo(visitorId);
          visitor = visitorInfo;
        }

        const item = data.fields.args[1];
        const room = await database
          .get(ROOMS_TABLE)
          .query(Q.where('custom_id', data.fields.args[1].v._id))
          .fetch();
        if (roomDBIsWritting.current) return;
        await database.write(async () => {
          roomDBIsWritting.current = true;
          if (room.length === 0) {
            await database.get(ROOMS_TABLE).create(room => {
              room.custom_id = item?.v?._id ?? '';
              room.name = item?.fname;
              room.username = item?.v?.username ?? '';
              room.token = item?.v?.token;
              room.phone = [];
              room.roomId = item?._id ?? '';
              room.last_message = item?.lastMessage?.msg ?? '';
              room.line_id = '';
              room.date = moment(item?.ts?.date).unix() ?? 0;
              room.avatar = visitor?.visitor?.livechatData?.avatar ?? '';
              room.unread = 0;
            });
          } else {
            const existRoom = await database.get(ROOMS_TABLE).find(room[0].id);
            if (servedBy != userInfo.userId) {
              await existRoom.destroyPermanently();
            } else {
              await existRoom.update(room => {
                room.custom_id = item?.v?._id;
                room.name = item?.fname;
                room.username = item?.v?.username;
                room.token = item?.v?.token;
                room.phone = existRoom?.phone;
                room.roomId = item?._id ?? '';
                room.last_message = item?.lastMessage?.msg ?? '';
                room.line_id = existRoom?.line_id;
                room.date = moment(item?.ts?.date).unix() ?? 0;
                room.avatar = visitor?.visitor?.livechatData?.avatar ?? '';
                room.unread =
                  currentRoomId?.current === item?._id
                    ? 0
                    : existRoom?.unread + 1 ?? 0;
              });
            }
          }
          roomDBIsWritting.current = false;
        });
      } else if (data.collection === 'stream-room-messages') {
        try {
          const messageData = data?.fields?.args?.[0] ?? {};
          database.write(async () => {
            await database.get(MESSAGES_TABLE).create(message => {
              message.message_id = messageData._id;
              message.text = messageData?.msg ?? '';
              message.name = messageData?.u?.name;
              message.avatar = messageData?.attachments ? 'image' : 'Text';
              message.date = moment().unix();
              message.type = 'text';
              message.image = getImageValue(messageData);
              message.isEarliest = false;
              message.userId = messageData?.u?._id;
              message.roomId = messageData.rid;
              message.username = messageData?.u?.username;
            });
          });
        } catch (error) {
          console.warn(error);
        }

        // RoomMessageChangeCallbackRef.current &&
        //   RoomMessageChangeCallbackRef.current(data);
      } else {
        console.log('onMessage', data);
      }
    },
    onOpen: () => {
      sendJsonMessage({
        msg: 'connect',
        version: '1',
        support: ['1'],
      });

      sendJsonMessage({
        msg: 'method',
        method: 'login',
        id: uuid.v4(),
        params: [{resume: userInfo?.authToken}],
      });
      console.log('open');
    },
    shouldReconnect: closeEvent => true,
    onClose: event => {
      setWebsocketStatus('嘗試連接中');
    },
    onError: event => {
      setWebsocketStatus('嘗試連接中');
    },
  });
  const onEnterRoom = useCallback(
    (roomId: string) => {
      currentRoomId.current = roomId;
      roomSubId.current = uuid.v4();
      console.log(roomId, roomSubId.current);
      sendJsonMessage({
        msg: 'sub',
        id: roomSubId.current,
        name: 'stream-room-messages',
        params: [roomId, false],
      });
    },
    [sendJsonMessage],
  );
  const onExitRoom = useCallback(() => {
    sendJsonMessage({
      msg: 'unsub',
      id: roomSubId.current,
    });
    roomSubId.current = uuid.v4();
    currentRoomId.current = '';
  }, [sendJsonMessage]);
  return (
    <>
      <WebsocketContext.Provider
        value={{
          webSocketStatus: webSocketStatus,
          sendJsonMessage: sendJsonMessage,
          setRoomMessageChangeCallback,
          removeRoomMessageChangeCallback,
          onEnterRoom: onEnterRoom,
          onExitRoom: onExitRoom,
        }}>
        {children}
      </WebsocketContext.Provider>
    </>
  );
};

export interface Fields {
  eventName: string;
  args: any[];
}

export interface RoomChangeProps {
  msg: string;
  collection: string;
  id: string;
  fields: Fields;
}

const useWebSocketContext = () => {
  const context = useContext(WebsocketContext);
  return context;
};
export default WebsocketContextProviderProvider;
export {useWebSocketContext};
