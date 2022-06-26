import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, View } from 'react-native'
import { GiftedChat, IMessage, SystemMessage } from 'react-native-gifted-chat'
import { useWebSocketContext } from '../../../context/WebsocketContextProvider'
import { rockatchatAPIHttpClient } from '../../../network/httpClient'
import uuid from 'react-native-uuid';
import { useMutation } from 'react-query'
import apis from '../../../network/apis'
import { StreamRoomMessagesProps } from '../../../types/StreamRoomMessagesPropsType'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Avatar from '../../../components/crm/Avatar'
import Config from '../../../models'
import moment from 'moment'
import { MessageRealmObject } from '../../../models/message'
import { useUserInfoContextProvider } from '../../../context/UserInfoContextProvider'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRefreshOnFocus } from '../../../hooks/useRefreshOnFocus'
import { LivechatRoomRealmObject } from '../../../models/livechatRoom'
const { useRealm, useQuery: useRealmQuery, useObject } = Config;
const ChatRoomScreen = ({ route }) => {
    const realm = useRealm()
    const { bottom } = useSafeAreaInsets()
    const navigation = useNavigation()
    const { sendJsonMessage, setRoomMessageChangeCallback, removeRoomMessageChangeCallcak } = useWebSocketContext()
    const roomUUID = useRef(uuid.v4()).current
    const mutation = useMutation(apis.sentTextMessageToLiveChatRoom)
    const [isEnd, setIsEnd] = useState(false)
    const { userInfo } = useUserInfoContextProvider()
    const [isLoadingEarlier, setIsLoadingEarlier] = useState(false)
    const messagesDB = useRealmQuery('message').filtered(`roomId == '${route.params.roomId}'`).sorted('date', true).map((item) => {
        const element: {
            _id: string;
            text?: string;
            name: string;
            username: string;
            avatar?: string;
            date?: string;
            //text,image,file
            type: string
            image?: string
            isEarliest: boolean
            userId?: string
            roomId: string
        } = item.toJSON()
        if (element.type === 'system') {
            return {
                _id: element._id,
                text: element.text,
                createdAt: moment(element.date).toDate(),
                system: true,
                // Any additional custom parameters are passed through
            }
        } else {
            return {
                _id: element._id,
                text: element.text,
                createdAt: moment(element.date).toDate(),
                user: {
                    _id: element.userId,
                    name: element.userId === userInfo?.userId ? userInfo?.name : element.name,
                    avatar: element.avatar,
                },
                image: element.image,
                sent: true,
                received: true,
                pending: true,
            }
        }
    })
    useEffect(() => {
        realm.write(() => {
            if (!realm.isInTransaction) realm.beginTransaction()
            const livechatRoom = realm.objectForPrimaryKey('livechatRoom', route.params.id)?.toJSON()
            realm.create('livechatRoom', LivechatRoomRealmObject.generate({
                id: livechatRoom.id,
                name: livechatRoom.name,
                username: livechatRoom.username,
                token: livechatRoom.token,
                phone: livechatRoom.phone ?? [],
                roomId: livechatRoom.roomId ?? "",
                msg: livechatRoom.msg ?? "",
                line_id: livechatRoom?.line_id ?? "",
                date: livechatRoom.date,
                avatar: livechatRoom?.avatar ?? "",
                unread: 0
            }), Realm.UpdateMode.Modified)
        })
    }, [route.params.id])
    const webhookResponseMessageParser = (data: StreamRoomMessagesProps) => {
        realm.write(() => {
            if (!realm.isInTransaction) realm.beginTransaction()
            data.fields.args.forEach((item) => {
                const message = realm.objectForPrimaryKey('message', item._id)
                if (message) {
                    realm.create('message', MessageRealmObject.generate({
                        _id: item._id,
                        name: item?.u?.name ?? "",
                        username: item?.u?.username ?? "",
                        type: getType(item),
                        isEarliest: false,
                        roomId: item.rid,
                        userId: item.u._id,
                        image: item?.attachments?.length > 0 ? item?.attachments?.[0].image_url : "",
                        text: getText(item),
                        date: moment().toISOString(),
                        avatar: route.params.username === item.u.username ? route.params.avatar : ""

                    }), Realm.UpdateMode.Modified)
                } else {
                    realm.create('message', MessageRealmObject.generate({
                        _id: item._id,
                        name: item?.u?.name ?? "",
                        username: item?.u?.username ?? "",
                        type: getType(item),
                        isEarliest: false,
                        roomId: item.rid,
                        userId: item.u._id,
                        image: item?.attachments?.length > 0 ? item.attachments[0].image_url : "",
                        text: getText(item),
                        date: moment().toISOString(),
                        avatar: route.params.username === item.u.username ? route.params.avatar : ""

                    }))
                }
            })
        })
    }
    useEffect(() => {
        setRoomMessageChangeCallback(webhookResponseMessageParser)
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
    const getType = useCallback((item: Message) => {
        if (item.t === 'livechat-started' || item.t === "command" || item.t === "livechat_transfer_history" || item.t === '' || item.t === "ul" || item.t === "uj") {
            return "system"
        } else if (item?.attachments?.length > 0) {
            return "image"
        } else {
            return "text"
        }
    }, [])
    const getText = useCallback((item: Message) => {
        if (item.t === 'livechat-started') {
            return `${item.u.name} 已加入 `
        } else if (item.t === "command" && item.msg == "connected") {
            return `顧問${item.u.username} 已開始接手`
        } else if (item.t === "livechat_transfer_history") {
            return `顧問${item.u.username} 轉交了聊天室給 ${item?.transferData?.transferredTo?.name}`
        } else if (item.t === "ul") {
            return `顧問${item.u.username} 已離開聊天室`
        } else if (item.t === "uj") {
            return `顧問${item.u.username} 已加入聊天室`
        } else {
            return item.msg
        }
    }, [])
    const onLoadEarlier = useCallback(async () => {
        try {
            setIsLoadingEarlier(true)
            if (isEnd) return
            const { data } = await rockatchatAPIHttpClient.get<LiveChatMessagesHistoryProps>(`/api/v1/livechat/messages.history/${route.params.roomId}`, {
                params: {
                    token: route.params.token,
                    limit: 100,
                    end: messagesDB.length > 0 ? moment(messagesDB[messagesDB.length - 1].createdAt).toISOString() : undefined,
                }
            })
            if (data.messages.length < 100) {
                setIsEnd(true)
            }

            realm.write(() => {
                if (!realm.isInTransaction) realm.beginTransaction()
                data.messages.sort((a, b) => moment(a._updatedAt).isBefore(moment(b._updatedAt)) ? 0 : -1).map((item) => {
                    const message = realm.objectForPrimaryKey('message', item._id)
                    if (message) {

                        realm.create('message', MessageRealmObject.generate({
                            _id: item._id,
                            name: item?.u?.name ?? "",
                            username: item?.u?.username ?? "",
                            type: getType(item),
                            isEarliest: false,
                            roomId: item.rid,
                            userId: item.u._id,
                            image: item?.attachments?.length > 0 ? item.attachments[0].image_url : "",
                            text: getText(item),
                            date: item?._updatedAt ? moment(item?._updatedAt).toISOString() : "",
                            avatar: route.params.username === item.u.username ? route.params.avatar : ""

                        }), Realm.UpdateMode.Modified)
                    } else {
                        realm.create('message', MessageRealmObject.generate({
                            _id: item._id,
                            name: item?.u?.name ?? "",
                            username: item?.u?.username ?? "",
                            type: getType(item),
                            isEarliest: false,
                            roomId: item.rid,
                            userId: item.u._id,
                            image: item?.attachments?.length > 0 ? item.attachments[0].image_url : "",
                            text: getText(item),
                            date: item?._updatedAt ? moment(item?._updatedAt).toISOString() : "",
                            avatar: route.params.username === item.u.username ? route.params.avatar : ""

                        }))
                    }
                })
            })
        } catch (error) {
            console.log(error, 'realm write fail')
        } finally {
            setIsLoadingEarlier(false)
        }
    }, [isEnd, setIsEnd, messagesDB])
    const onInit = useCallback(async () => {
        try {
            const { data } = await rockatchatAPIHttpClient.get<LiveChatMessagesHistoryProps>(`/api/v1/livechat/messages.history/${route.params.roomId}`, {
                params: {
                    token: route.params.token,
                    limit: 100,

                }
            })
            realm.write(() => {
                if (!realm.isInTransaction) realm.beginTransaction()
                data.messages.sort((a, b) => moment(a._updatedAt).isBefore(moment(b._updatedAt)) ? 0 : -1).map((item) => {
                    const message = realm.objectForPrimaryKey('message', item._id)
                    if (message) {

                        realm.create('message', MessageRealmObject.generate({
                            _id: item._id,
                            name: item.u.name,
                            username: item.u.username,
                            type: getType(item),
                            isEarliest: false,
                            roomId: item.rid,
                            userId: item.u._id,
                            image: item?.attachments?.length > 0 ? item.attachments[0].image_url : "",
                            text: getText(item),
                            date: item?._updatedAt ? moment(item?._updatedAt).toISOString() : "",
                            avatar: route.params.username === item.u.username ? route.params.avatar : ""

                        }), Realm.UpdateMode.Modified)
                    } else {
                        realm.create('message', MessageRealmObject.generate({
                            _id: item._id,
                            name: item.u.name,
                            username: item.u.username,
                            type: getType(item),
                            isEarliest: false,
                            roomId: item.rid,
                            userId: item.u._id,
                            image: item?.attachments?.length > 0 ? item.attachments[0].image_url : "",
                            text: getText(item),
                            date: item?._updatedAt ? moment(item?._updatedAt).toISOString() : "",
                            avatar: route.params.username === item.u.username ? route.params.avatar : ""

                        }))
                    }
                })
            })

        } catch (error) {
            console.log(error)
        }

    }, [route.params.roomId, getType, getText])
    useRefreshOnFocus(onInit)
    useEffect(() => {
        onInit()
    }, [route.params.roomId, getType, getText])

    const onSend = (messages: IMessage[]) => {
        mutation.mutate({
            rid: route.params.roomId,
            msg: messages[0].text,
        })
        // sendJsonMessage({ "msg": "method", "method": "sendMessageLivechat", "params": [{ "_id": uuid.v4(), "rid": route.params.roomId, "msg": messages[0].text, "token": userInfo?.authToken }], "id": "11" })
    }
    return <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: bottom }}>
        <GiftedChat
            wrapInSafeArea={false}
            onLoadEarlier={() => onLoadEarlier()}
            showUserAvatar
            renderAvatar={({ currentMessage }) => {
                return <Avatar name={currentMessage?.user?.name} uri={currentMessage?.user?.avatar as string} />
            }}
            isLoadingEarlier={isLoadingEarlier}
            infiniteScroll
            loadEarlier
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
            messages={messagesDB}
            onSend={onSend}
            user={{
                _id: userInfo?.userId,
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