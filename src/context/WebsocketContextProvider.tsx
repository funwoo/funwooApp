import React, {createContext, FC, useContext, useRef, useState} from 'react';
import uuid from 'react-native-uuid';
import useWebSocket from 'react-native-use-websocket';
import {StreamRoomMessagesProps} from '../types/StreamRoomMessagesPropsType';
import {useUserInfoContextProvider} from './UserInfoContextProvider';
import {database} from '../..';
import {ROOMS_TABLE} from '../model/Room';
import {Q} from '@nozbe/watermelondb';
import moment from 'moment';
import apis from '../network/apis';

interface WebsocketContextProviderProps {
  sendJsonMessage: (value: Object) => void;
  removeRoomChangeCallcak: () => void;
  setRoomMessageChangeCallback: (
    callback: (value: RoomChangeProps) => void,
  ) => void;
  removeRoomMessageChangeCallback: () => void;
  webSocketStatus: webSocketStatusType;
}

const WebsocketContext = createContext({} as WebsocketContextProviderProps);
export type webSocketStatusType = '嘗試連接中' | '錯誤' | '已連接';
const socketUrl = 'wss://crm.funwoo.com.tw/websocket';
const WebsocketContextProviderProvider: FC<{}> = ({children}) => {
  const {userInfo} = useUserInfoContextProvider();
  const [webSocketStatus, setWebsocketStatus] =
    useState<webSocketStatusType>('嘗試連接中');
  const RoomChangeCallbackRef = useRef<(value: RoomChangeProps) => void>();
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
  const removeRoomChangeCallcak = () => {
    RoomChangeCallbackRef.current = undefined;
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

        database.write(async () => {
          if (room.length === 0) {
            await database.get(ROOMS_TABLE).create(room => {
              room.custom_id = item.v._id;
              room.name = item.fname;
              room.username = item.username;
              room.token = item.v.token;
              room.phone = [];
              room.roomId = item._id ?? '';
              room.last_message = item.lastMessage.msg ?? '';
              room.line_id = '';
              room.date = moment(item.ts.date).unix() ?? 0;
              room.avatar = visitor?.visitor?.livechatData?.avatar ?? '';
              room.unread = 0;
            });
          } else {
            const existRoom = await database.get(ROOMS_TABLE).find(room[0].id);
            if (servedBy != userInfo.userId) {
              await existRoom.destroyPermanently();
            } else {
              await existRoom.update(room => {
                room.custom_id = item.v._id;
                room.name = item.fname;
                room.username = item.username;
                room.token = item.v.token;
                room.phone = existRoom.phone;
                room.roomId = item._id ?? '';
                room.last_message = item.lastMessage.msg ?? '';
                room.line_id = existRoom.line_id;
                room.date = moment(item.ts.date).unix() ?? 0;
                room.avatar = visitor?.visitor?.livechatData?.avatar ?? '';
                room.unread = existRoom.unread + 1 ?? 0;
              });
            }
          }
        });

        RoomChangeCallbackRef.current && RoomChangeCallbackRef?.current(data);
      } else if (data.collection === 'stream-room-messages') {
        RoomMessageChangeCallbackRef.current &&
          RoomMessageChangeCallbackRef.current(data);
      } else {
        console.log(data);
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
  return (
    <>
      <WebsocketContext.Provider
        value={{
          webSocketStatus: webSocketStatus,
          sendJsonMessage: sendJsonMessage,
          setRoomMessageChangeCallback,
          removeRoomMessageChangeCallback,
          removeRoomChangeCallcak: removeRoomChangeCallcak,
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
