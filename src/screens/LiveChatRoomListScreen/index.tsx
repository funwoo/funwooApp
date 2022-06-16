import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native"
import React, { FC, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useRecoilValueLoadable } from "recoil"
import { liveChatroomsState, LiveChatroomsStateProps, Room } from "../../state/liveChatRooms"
import { currentUserInfoState } from "../../state/currentUserInfoState"
import moment from 'moment'
import 'moment/locale/zh-tw'
import uuid from 'react-native-uuid';
import { useNavigation } from "@react-navigation/native"
import { Avatar } from "react-native-gifted-chat"
import { RoomChangeProps, useWebSocketContext, webSocketStatusType } from "../../context/WebsocketContextProvider"
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus"
import { focusManager, useQuery } from "react-query"
import { fetchLiveChatRooms, fetchVistiorInfo } from "../../network/apis"
import { AxiosResponse } from "axios"
import { VisitorRealmObject } from '../../models/visitor'
import FastImage from "react-native-fast-image"
import Config from '../../models'
import RNUserdefaults from '@tranzerdev/react-native-user-defaults';
const { useRealm, useQuery: useRealmQuery, useObject } = Config;
const LiveChatRoomListScreen = () => {
    const { setRoomChangeCallback, removeRoomChangeCallcak, webSocketStatus } = useWebSocketContext()
    const [liveChatRoomsData, setLiveChatRoomsData] = useState<LiveChatroomsStateProps>()
    const [extraDataKey, setExtraDataKey] = useState(uuid.v4())
    const navigation = useNavigation()
    const currentUserInfoStateValue = useRecoilValue(currentUserInfoState)
    const { refetch, data, isLoading, isRefetching, } = useQuery<AxiosResponse<LiveChatroomsStateProps>, Error>(['livechatRooms', currentUserInfoStateValue.userId, currentUserInfoStateValue.authToken], () => fetchLiveChatRooms({
        agentId: currentUserInfoStateValue.userId,
        userId: currentUserInfoStateValue.userId,
        authToken: currentUserInfoStateValue.authToken
    }))

    useRefreshOnFocus(refetch)
    useEffect(() => {
        let temp = data?.data
        if (temp) {
            temp.rooms?.sort?.((a, b) => new Date(b?._updatedAt)?.getTime?.() - new Date(a?._updatedAt)?.getTime?.())
            setLiveChatRoomsData(temp)
        }

    }, [data])
    useEffect(() => {
        setRoomChangeCallback(roomChangeEventHandler)
        return (() => removeRoomChangeCallcak())
    }, [liveChatRoomsData])
    const roomChangeEventHandler = (value: RoomChangeProps) => {
        const roomIdx = liveChatRoomsData?.rooms.findIndex((item) => item?._id === value?.fields?.args?.[1]?._id)
        if (roomIdx != undefined && roomIdx != -1) {
            let temp = liveChatRoomsData
            if (temp) {
                let newRoomInfo = value.fields.args[1]
                newRoomInfo._updatedAt = new Date()
                temp.rooms[roomIdx] = newRoomInfo
            }
            setLiveChatRoomsData(temp)
            setExtraDataKey(uuid.v4())
        }

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <WebsocketConnectStatus status={webSocketStatus} />
            <FlatList extraData={extraDataKey} refreshing={isRefetching || isLoading} onRefresh={refetch} keyExtractor={item => item._id} data={liveChatRoomsData?.rooms ?? []} renderItem={(({ item }) => {
                return (<ChatRoomItem authToken={currentUserInfoStateValue.authToken} userId={currentUserInfoStateValue.userId} item={item} />
                )
            })} />
        </View>
    )
}
const ChatRoomItem = ({ item, userId, authToken }: { item: Room, userId: string, authToken: string }) => {
    const realm = useRealm();
    const visitor = useObject(VisitorRealmObject, item.v._id);
    const { refetch, data, isLoading, isRefetching, } = useQuery<AxiosResponse<any>, Error>(['livechatVisitor' + item.v._id, userId, authToken], () => fetchVistiorInfo({
        visitorId: item.v._id,
        userId: userId,
        authToken: authToken
    }), { enabled: !visitor?.toJSON().date || new Date() < visitor?.toJSON().date.getDate() + 1 })
    useEffect(() => {
        (async () => {
            RNUserdefaults.setFromSuite(JSON.stringify(visitor?.toJSON() || data?.data?.visitor?.livechatData), item.v._id, "group.com.funwoo.funwoochat.onesignal");
            const value = await RNUserdefaults.getFromSuite(item.v._id, "group.com.funwoo.funwoochat.onesignal",);
            console.log(value, item.v._id)
        })()

    }, [data?.data, visitor])
    useEffect(() => {
        realm.write(() => {
            if (data?.data) {
                const visitor = realm.objectForPrimaryKey('visitor', item.v._id)
                if (visitor) {
                    realm.create('visitor', VisitorRealmObject.generate(item.v._id, item.fname, item.v.username, data?.data?.visitor?.livechatData?.avatar), Realm.UpdateMode.Modified)
                } else {
                    realm.create('visitor', VisitorRealmObject.generate(item.v._id, item.fname, item.v.username, data?.data?.visitor?.livechatData?.avatar))
                }
            }
        })
    }, [data?.data, realm])
    const avatar = useMemo(() => {
        return visitor?.toJSON().avatar || data?.data?.visitor?.livechatData?.avatar
    }, [data?.data, visitor])
    const navigation = useNavigation()
    const getTimeString = useCallback((date: Date | number) => {
        const a = moment()
        const b = moment(date)
        const days = a.diff(b, 'days')
        if (days === 1) {
            return '昨天'
        } else if (days > 1 && days < 7) {
            return b.format('dddd')
        } else if (days >= 7) {
            return b.format('YYYY-MM-DD')
        } else {
            return b.format('A hh:mm')
        }
    }, [])
    return (
        <Pressable onPress={() => navigation.navigate('ChatRoom' as never, {
            //@ts-ignore
            roomId: item._id,
            //@ts-ignore
            token: item.v.token ?? "",
            //@ts-ignore
            name: item.fname,
            //@ts-ignore
            avatar: avatar ?? undefined,
            //@ts-ignore
            client_Id: item.v._id
        })} style={{ minHeight: 56, paddingVertical: 10, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', paddingLeft: 16, width: "100%" }}>
            {avatar ? <FastImage source={{ uri: avatar }} style={{ width: 38, height: 38, borderRadius: 19 }} /> : <Avatar currentMessage={{
                _id: item._id,
                text: item?.lastMessage?.msg ?? "",
                createdAt: item.lastMessage._updatedAt,
                user: {
                    _id: item._id,
                    name: item.fname,
                }
            }} />}


            <View style={{ flexDirection: 'column', marginLeft: 10, flex: 1, borderBottomColor: "#e2e2e2", borderBottomWidth: 1, paddingBottom: 15, paddingRight: 16 }}>
                <View style={{ width: "100%" }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5 }}>{item.fname}</Text>
                        <Text style={{ color: "#9d9d9d", fontSize: 14 }}>{getTimeString(item._updatedAt)}</Text>
                    </View>

                </View>
                <Text numberOfLines={2} style={{ fontSize: 16, color: "gray" }}>{item?.lastMessage?.msg}</Text>
            </View>

        </Pressable>
    )
}
const WebsocketConnectStatus = ({ status }: { status: webSocketStatusType }) => {
    if (status === "已連接") return null
    return <View style={{ width: "100%", height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ADD8E6", }}>
        <Text style={{ color: "white" }}>{status}</Text>
    </View>
}
const colors = [
    "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
    "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
]
interface AvatarProps {
    name: string
}
// const Avatar: FC<AvatarProps> = ({ name }) => {
//     const getBgColor = () => {
//         let num = name.split(" ")?.[0]?.length + name.split(" ")?.[1]?.length ?? 0
//         return colors[num % 20] ?? colors[0]
//     }
//     return (
//         <View style={{ width: 50, height: 50, backgroundColor: getBgColor(), borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
//             <Text style={{ color: 'white', fontSize: 20 }}>{name.includes(" ") ? name.split(" ")?.[0][0].toUpperCase() + name.split(" ")?.[1][0].toUpperCase() : name.split(" ")?.[0][0].toUpperCase()}</Text>
//         </View>
//     )
// }
const LiveChatRoomListScreenContainer = () => {
    return <Suspense fallback={<View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} /></View>}>
        <LiveChatRoomListScreen />
    </Suspense>
}
export default LiveChatRoomListScreenContainer