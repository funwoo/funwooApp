import { ActivityIndicator, FlatList, Text, View } from "react-native"
import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/zh-tw'
import uuid from 'react-native-uuid';
import { useNavigation } from "@react-navigation/native"
import { RoomChangeProps, useWebSocketContext, webSocketStatusType } from "../../../context/WebsocketContextProvider"
import { useRefreshOnFocus } from "../../../hooks/useRefreshOnFocus"
import Apis from "../../../network/apis"
import { LivechatRoomRealmObject } from '../../../models/livechatRoom'
import Config from '../../../models'
import RNUserdefaults from '@tranzerdev/react-native-user-defaults';
import ChatListItem from "../../../components/crm/ChatListItem"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LivechatRoomsInfo } from "../../../network/entities/livechat-rooms-info.entity"
import { PageNames } from "../../../navigator/PageNames"
import AsyncStorage from "@react-native-async-storage/async-storage";
const { useRealm, useQuery: useRealmQuery, useObject } = Config;
const LiveChatRoomListScreen = () => {
    const realm = useRealm();
    const { setRoomChangeCallback, removeRoomChangeCallcak, webSocketStatus } = useWebSocketContext()
    const [liveChatRoomsData, setLiveChatRoomsData] = useState<LivechatRoomsInfo[]>()
    const [extraDataKey, setExtraDataKey] = useState(uuid.v4())
    const [isLoading, setIsLoading] = useState(true)
    const livechatRooms = useRealmQuery('livechatRoom')
    const refresh = useCallback(async () => {
        setIsLoading(true)
        if (realm) {
            try {
                realm.write(async () => {
                    const livechatRoomLastTimeUpdate = await AsyncStorage.getItem("livechatRoomLastTimeUpdate")
                    const { data } = await Apis.getLiveChatRoomList(livechatRoomLastTimeUpdate)
                    realm.beginTransaction()
                    data.sort((a, b) => moment(a.updatedAt).isBefore(moment(b.updatedAt))).map((item) => {
                        const livechatRoom = realm.objectForPrimaryKey('livechatRoom', item.id)
                        if (livechatRoom) {
                            realm.create('livechatRoom', LivechatRoomRealmObject.generate({
                                id: item.id,
                                name: item.name,
                                username: item.username,
                                token: item.token,
                                phone: item?.phone?.map((item) => item?.phoneNumber || item) ?? [],
                                roomId: item.roomId ?? "",
                                msg: item.msg ?? "",
                                line_id: item?.livechatData?.line_id ?? "",
                                date: moment(item.updatedAt).toISOString(),
                                avatar: item?.livechatData?.avatar ?? ""
                            }), Realm.UpdateMode.Modified)
                        } else {
                            realm.create('livechatRoom', LivechatRoomRealmObject.generate({
                                id: item.id,
                                name: item.name,
                                username: item.username,
                                token: item.token,
                                phone: item?.phone?.map((item) => item?.phoneNumber || item) ?? [],
                                roomId: item.roomId ?? "",
                                msg: item.msg ?? "",
                                line_id: item?.livechatData?.line_id ?? "",
                                avatar: item?.livechatData?.avatar ?? "",
                                date: moment(item.updatedAt).toISOString()
                            }))
                        }
                    })
                    realm.commitTransaction()
                    await AsyncStorage.setItem("livechatRoomLastTimeUpdate", new Date().toISOString())
                })
            } catch (error) {
                console.warn('error', error)
            } finally {
                setIsLoading(false)
            }

        }
    }, [realm, setIsLoading])
    useEffect(() => {
        refresh()
    }, [])
    useRefreshOnFocus(() => refresh())
    useEffect(() => {
        setRoomChangeCallback(roomChangeEventHandler)
        return (() => removeRoomChangeCallcak())
    }, [realm])
    const roomChangeEventHandler = (value: RoomChangeProps) => {
        realm.write(() => {
            if (!realm.isInTransaction)
                realm.beginTransaction()

            const livechatRoom = realm.objectForPrimaryKey('livechatRoom', value.fields.args[1].v._id)?.toJSON()
            const item = value.fields.args[1]
            if (livechatRoom) {
                realm.create('livechatRoom', LivechatRoomRealmObject.generate({
                    id: item.v._id,
                    name: item.fname,
                    username: item.username,
                    token: item.v.token,
                    phone: livechatRoom.phone ?? [],
                    roomId: item._id ?? "",
                    msg: item.lastMessage.msg ?? "",
                    line_id: livechatRoom?.line_id ?? "",
                    date: livechatRoom.date,
                    avatar: livechatRoom?.avatar ?? ""
                }), Realm.UpdateMode.Modified)
            } else {
                realm.create('livechatRoom', LivechatRoomRealmObject.generate({
                    id: item.v._id,
                    name: item.fname,
                    username: item.username,
                    token: item.v.token,
                    phone: [],
                    roomId: item._id ?? "",
                    msg: item.lastMessage.msg ?? "",
                    line_id: "",
                    avatar: "",
                    date: moment(item.ts.date).toISOString()
                }))
            }
        })
    }
    const { top } = useSafeAreaInsets()
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: top }}>
            <View style={{ height: 56, width: "100%" }}></View>
            <FlatList extraData={extraDataKey} keyExtractor={item => item.id}
                data={livechatRooms.toJSON().sort((a, b) => moment(a.date).isBefore(moment(b.date)))} renderItem={(({ item }) => {
                    return (<ChatRoomItem item={item} />
                    )
                })} />
            <WebsocketConnectStatus status={isLoading ? "嘗試連接中" : webSocketStatus} />
        </View>
    )
}
const ChatRoomItem = ({ item }: {
    item: {
        id: string;
        name: string;
        username: string;
        token: string;
        avatar?: string;
        date?: Date;
        phone: string[];
        line_id?: string;
        roomId: string
        msg: string
    }
}) => {
    const navigation = useNavigation()
    const itemPress = useCallback(() => {
        navigation.navigate(PageNames.chatroom, {
            roomId: item.id,
            token: item.token,
            name: item.name,
            avatar: item?.avatar
        })
    }, [item, navigation])
    return (
        <ChatListItem updatedAt={item.date as unknown as string ?? ""} msg={item.msg} name={item.name} platform={item.username} uri={item.avatar} onPress={itemPress} />
    )
}
const WebsocketConnectStatus = ({ status }: { status: webSocketStatusType }) => {
    if (status === "已連接") return null
    return <View style={{ width: "100%", height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: "lightblue", position: 'absolute', bottom: 0 }}>
        <ActivityIndicator />
        <Text style={{ color: "white", marginLeft: 10, fontWeight: "bold" }}>{status}</Text>
    </View>
}
export default LiveChatRoomListScreen