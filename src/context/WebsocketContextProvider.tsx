import React, { createContext, FC, useContext, useRef, useState } from 'react'
import uuid from 'react-native-uuid';
import useWebSocket from 'react-native-use-websocket';
import { useRecoilValue } from 'recoil';
import { currentUserInfoState } from '../state/currentUserInfoState';
import { StreamRoomMessagesProps } from '../types/StreamRoomMessagesPropsType';
interface WebsocketContextProviderProps {
    sendJsonMessage: (value: Object) => void
    setRoomChangeCallback: (callback: (value: RoomChangeProps) => void) => void
    removeRoomChangeCallcak: () => void
    setRoomMessageChangeCallback: (callback: (value: RoomChangeProps) => void) => void
    removeRoomMessageChangeCallcak: () => void
    webSocketStatus: webSocketStatusType
}
const WebsocketContext = createContext({

} as WebsocketContextProviderProps)
export type webSocketStatusType = "嘗試連接中" | "錯誤" | "已連接"
const socketUrl = 'wss://crm.funwoo.com.tw/websocket';
const WebsocketContextProviderProvider: FC<{}> = ({ children }) => {
    const [webSocketStatus, setWebsocketStatus] = useState<webSocketStatusType>("嘗試連接中")
    const currentUserInfoStateValue = useRecoilValue(currentUserInfoState)
    const RoomChangeCallbackRef = useRef<(value: RoomChangeProps) => void>()
    const RoomMessageChangeCallbackRef = useRef<(value: StreamRoomMessagesProps) => void>()
    const setRoomMessageChangeCallback = (callback: (value: StreamRoomMessagesProps) => void) => {
        RoomMessageChangeCallbackRef.current = callback
    }
    const removeRoomMessageChangeCallcak = () => {
        RoomMessageChangeCallbackRef.current = undefined
    }
    const setRoomChangeCallback = (callback: (value: RoomChangeProps) => void) => {
        RoomChangeCallbackRef.current = callback
    }
    const removeRoomChangeCallcak = () => {
        RoomChangeCallbackRef.current = undefined
    }
    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(socketUrl, {
        onMessage: (event) => {
            const data = JSON.parse(event.data)
            if (!currentUserInfoStateValue.authToken) return null
            if (data?.result?.type === 'resume') {
                // sendJsonMessage(
                //     {
                //         "msg": "sub",
                //         "id": uuid.v4(),
                //         "name": "stream-notify-user",
                //         "params": [
                //             `${currentUserInfoStateValue.userId}/event`,
                //             false
                //         ]
                //     }
                // )
                setWebsocketStatus("已連接")
                sendJsonMessage(
                    {
                        "msg": "sub",
                        "id": uuid.v4(),
                        "name": "stream-notify-user",
                        "params": [
                            `${currentUserInfoStateValue.userId}/rooms-changed`,
                            false
                        ]
                    }
                )

                // sendJsonMessage({
                //     "msg": "sub",
                //     "id": uuid.v4(),
                //     "name": "stream-notify-all",
                //     "params": [
                //         "event",
                //         false
                //     ]
                // })
            } else if (data?.msg === "ping") {
                sendJsonMessage({
                    msg: 'pong'
                })
            } else if (data?.collection === 'stream-notify-user' && data?.fields?.eventName === `${currentUserInfoStateValue.userId}/rooms-changed`) {
                RoomChangeCallbackRef.current && RoomChangeCallbackRef?.current(data)
            } else if (data.collection === 'stream-room-messages') {
                RoomMessageChangeCallbackRef.current && RoomMessageChangeCallbackRef.current(data)
            } else {
                console.log(data)
            }

        },
        onOpen: () => {
            sendJsonMessage({
                "msg": "connect",
                "version": "1",
                "support": ["1"]
            })

            sendJsonMessage({
                "msg": "method",
                "method": "login",
                "id": uuid.v4(),
                "params": [
                    { "resume": currentUserInfoStateValue?.authToken }
                ]
            })


            // sendJsonMessage({
            //     "msg": "connect",
            //     "version": "1",
            //     "support": ["1"]
            // })

            // sendJsonMessage({
            //     "msg": "sub",
            //     "id": uuid.v4(),
            //     "name": "stream-notify-all",
            //     "params": [
            //         "event",
            //         false
            //     ]
            // })
            // sendJsonMessage({
            //     "msg": "connect",
            //     "version": "1",
            //     "support": ["1"]
            // })



            console.log('open')
        },
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onClose: (event) => {
            setWebsocketStatus("嘗試連接中")
        },
        onError: (event) => {
            setWebsocketStatus("嘗試連接中")
        },
    });
    return (
        <>
            <WebsocketContext.Provider value={{
                webSocketStatus: webSocketStatus,
                sendJsonMessage: sendJsonMessage,
                setRoomMessageChangeCallback,
                removeRoomMessageChangeCallcak,
                setRoomChangeCallback: setRoomChangeCallback,
                removeRoomChangeCallcak: removeRoomChangeCallcak
            }}>
                {children}
            </WebsocketContext.Provider>
        </>)
}
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
    const context = useContext(WebsocketContext)
    return context
}
export default WebsocketContextProviderProvider
export { useWebSocketContext }