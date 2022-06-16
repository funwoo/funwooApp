import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { GiftedChat, IMessage, SystemMessage } from 'react-native-gifted-chat'
import { useRecoilValue } from 'recoil'
import { useWebSocketContext } from '../../context/WebsocketContextProvider'
import { rocketChatHttpClient } from '../../network/httpClient'
import { currentUserInfoState } from '../../state/currentUserInfoState'
import uuid from 'react-native-uuid';
import { useMutation } from 'react-query'
import { sentTextMessageToLiveChatRoom } from '../../network/apis'
import { StreamRoomMessagesProps } from '../../types/StreamRoomMessagesPropsType'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
const ChatRoomScreen = ({ route }) => {
    const navigation = useNavigation()
    const { sendJsonMessage, setRoomMessageChangeCallback, removeRoomMessageChangeCallcak } = useWebSocketContext()
    const [messages, setMessages] = useState<IMessage[]>([]);
    const roomUUID = useRef(uuid.v4()).current
    const currentUserInfoStateValue = useRecoilValue(currentUserInfoState)
    const mutation = useMutation(sentTextMessageToLiveChatRoom)
    const getAvatar = (id: string) => {
        if (id === route.params.client_Id) {
            return route.params.avatar
        } else {
            return undefined
        }
    }
    const webhookResponseMessageParser = useCallback((data: StreamRoomMessagesProps) => {
        let messages: any[] = []
        data.fields.args.forEach((item) => {
            if (item?.attachments?.length) {
                messages.push({
                    _id: item._id,
                    text: item.msg,
                    createdAt: new Date(),
                    image: !item.attachments[0].image_url.includes('http') ? "https://crm.funwoo.com.tw" + item.attachments[0].image_url : item.attachments[0].image_url,
                    user: {
                        _id: currentUserInfoStateValue.userId === item.u._id ? 1 : 0,
                        avatar: getAvatar(item.u._id),
                        name: item.u.name,
                    }


                })
            } else {
                messages.push({
                    _id: item._id,
                    text: item.msg,
                    createdAt: new Date(),
                    user: {
                        _id: currentUserInfoStateValue.userId === item.u._id ? 1 : 0,
                        name: item.u.username,
                        avatar: getAvatar(item.u._id)
                    }

                })
            }
        })
        return messages
    }, [])
    const onRoomMessageChangeHandler = (data: StreamRoomMessagesProps) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, webhookResponseMessageParser(data)))
    }
    useEffect(() => {
        setRoomMessageChangeCallback(onRoomMessageChangeHandler)
        sendJsonMessage({
            "msg": "sub",
            "id": roomUUID,
            "name": "stream-room-messages",
            "params": [
                route.params.roomId,
                false
            ]
        })
        return (() => {
            removeRoomMessageChangeCallcak()
            sendJsonMessage({
                "msg": "unsub",
                "id": roomUUID,
            })
        })
    }, [])
    useEffect(() => {
        (async () => {
            try {

                const { data } = await rocketChatHttpClient.get<LiveChatMessagesHistoryProps>(`/api/v1/livechat/messages.history/${route.params.roomId}`, {
                    params: {
                        token: route.params.token,
                        limit: 300,
                    }
                })
                const history: IMessage[] = data.messages.map((item) => {
                    if (item.t === 'livechat-started') {
                        return {
                            _id: item._id,
                            system: true,
                            text: `${item.u.name} 已加入 Livechat ID: ${item.u.username}`,
                            createdAt: item._updatedAt,
                            user: {
                                _id: 1,
                                name: route.params.name,
                            }
                        }
                    } else if (item.t === "command" && item.msg == "connected") {
                        return {
                            _id: item._id,
                            system: true,
                            text: `顧問${item.u.username} 已開始接手`,
                            createdAt: item._updatedAt,
                            user: {
                                _id: 1,
                                name: route.params.name,
                            }
                        }
                    } else if (item.t === "livechat_transfer_history") {
                        return {
                            _id: item._id,
                            system: true,
                            text: `顧問${item.u.username} 轉交了聊天室給 ${item?.transferData?.transferredTo?.name}`,
                            createdAt: item._updatedAt,
                            user: {
                                _id: 1,
                                name: route.params.name,
                            }
                        }
                    } else if (item.t === "ul") {
                        return {
                            _id: item._id,
                            system: true,
                            text: `顧問${item.u.username} 已離開聊天室`,
                            createdAt: item._updatedAt,
                            user: {
                                _id: 1,
                                name: route.params.name,
                            }
                        }
                    } else if (item.t === "uj") {
                        return {
                            _id: item._id,
                            system: true,
                            text: `顧問${item.u.username} 已加入聊天室`,
                            createdAt: item._updatedAt,
                            user: {
                                _id: 1,
                                name: route.params.name,
                            }
                        }
                    } else if (item?.attachments?.[0]?.image_url) {
                        return {
                            _id: item._id,
                            text: item.msg,
                            createdAt: item._updatedAt,
                            image: !item.attachments[0].image_url.includes('http') ? "https://crm.funwoo.com.tw" + item.attachments[0].image_url : item.attachments[0].image_url,
                            user: {
                                _id: currentUserInfoStateValue.userId === item.u._id ? 1 : 0,
                                avatar: getAvatar(item.u._id),
                                name: item.u.name,
                            }

                        }
                    } else if (item.fileUpload) {
                        return {

                            _id: item._id,
                            text: item.msg,
                            createdAt: item._updatedAt,
                            image: item.fileUpload.publicFilePath,
                            user: {
                                _id: currentUserInfoStateValue.userId === item.u._id ? 1 : 0,
                                avatar: getAvatar(item.u._id),
                                name: item.u.username,
                            }

                        }
                    } else {
                        return {
                            _id: item._id,
                            text: item.msg,
                            createdAt: item._updatedAt,
                            user: {
                                _id: currentUserInfoStateValue.userId === item.u._id ? 1 : 0,
                                name: item.u.username,
                                avatar: getAvatar(item.u._id)
                            }

                        }
                    }

                })
                setMessages(history)

            } catch (error) {
                console.log(error)
            }


        })()

    }, [route.params.roomId])
    const onSend = (messages: IMessage[]) => {
        mutation.mutate({
            rid: route.params.roomId,
            msg: messages[0].text,
            token: currentUserInfoStateValue.authToken,
            userId: currentUserInfoStateValue.userId
        })
        // sendJsonMessage({ "msg": "method", "method": "sendMessageLivechat", "params": [{ "_id": uuid.v4(), "rid": route.params.roomId, "msg": messages[0].text, "token": currentUserInfoStateValue.authToken }], "id": "11" })
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => navigation.navigate('ChatRoomInfo', {
                    name: route.params.name + '的詳細資料'
                })}  >
                    <AntDesign name="infocirlceo" size={24} color="black" />
                </Pressable>
            ),
        });
    }, [navigation]);
    return <View style={{ flex: 1, backgroundColor: 'white' }}>
        <GiftedChat
            showUserAvatar
            renderUsernameOnMessage
            renderSystemMessage={(props) => {
                return <SystemMessage
                    {...props}
                    containerStyle={{
                        marginBottom: 15,
                    }}
                    textStyle={{
                        fontSize: 14,
                        color: "red"
                    }}
                />
            }}
            messages={messages}
            onSend={onSend}
            user={{
                _id: 1,
            }}
        />
    </View>
}


export interface File {
    _id: string;
    name: Date;
    type: string;
}

export interface File2 {
    _id: string;
    name: Date;
    type: string;
}

export interface ImageDimensions {
    width: number;
    height: number;
}

export interface Attachment {
    ts: Date;
    title: Date;
    title_link: string;
    title_link_download: boolean;
    image_dimensions: ImageDimensions;
    image_preview: string;
    image_url: string;
    image_type: string;
    image_size: number;
    type: string;
}

export interface U {
    _id: string;
    username: string;
    name: string;
}

export interface FileUpload {
    publicFilePath: string;
    type: string;
    size: number;
}

export interface Value {
    type: string;
    value: string;
}

export interface Md {
    type: string;
    value: Value[];
}

export interface Message {
    _id: string;
    rid: string;
    ts: Date;
    msg: string;
    file: File;
    files: File2[];
    groupable: boolean;
    attachments: Attachment[];
    u: U;
    _updatedAt: Date;
    urls: any[];
    mentions: any[];
    channels: any[];
    fileUpload: FileUpload;
    alias: string;
    token: string;
    md: Md[];
    t: string;
}

export interface LiveChatMessagesHistoryProps {
    messages: Message[];
    success: boolean;
}

export default ChatRoomScreen