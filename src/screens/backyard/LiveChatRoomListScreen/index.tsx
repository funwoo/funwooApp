import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native"
import React, { FC, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useRecoilValueLoadable } from "recoil"
import { liveChatroomsState, LiveChatroomsStateProps, Room } from "../../state/liveChatRooms"
import { currentUserInfoState } from "../../state/currentUserInfoState"
import moment from 'moment'
import 'moment/locale/zh-tw'
import uuid from 'react-native-uuid';
import { useNavigation } from "@react-navigation/native"
import { RoomChangeProps, useWebSocketContext, webSocketStatusType } from "../../context/WebsocketContextProvider"
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus"
import { focusManager, useQuery } from "react-query"
import { fetchLiveChatRooms, fetchVistiorInfo } from "../../network/apis"
import { AxiosResponse } from "axios"
import { VisitorRealmObject } from '../../models/visitor'
import FastImage from "react-native-fast-image"
import Config from '../../models'
import RNUserdefaults from '@tranzerdev/react-native-user-defaults';
import Avatar from "../../components/crm/Avatar"
import ChatListItem from "../../components/crm/ChatListItem"
import { useSafeAreaInsets } from "react-native-safe-area-context"
const { useRealm, useQuery: useRealmQuery, useObject } = Config;
const LiveChatRoomListScreen = () => {

    const { setRoomChangeCallback, removeRoomChangeCallcak, webSocketStatus } = useWebSocketContext()
    const [liveChatRoomsData, setLiveChatRoomsData] = useState<LiveChatroomsStateProps>()
    const [extraDataKey, setExtraDataKey] = useState(uuid.v4())
    const currentUserInfoStateValue = useRecoilValue(currentUserInfoState)
    const { refetch, data, isLoading, isRefetching, } = useQuery<AxiosResponse<LiveChatroomsStateProps>, Error>(['livechatRooms', currentUserInfoStateValue.userId, currentUserInfoStateValue.authToken], () => fetchLiveChatRooms({
        agentId: currentUserInfoStateValue.userId,
        userId: currentUserInfoStateValue.userId,
        authToken: currentUserInfoStateValue.authToke
    }))
    console.log(currentUserInfoStateValue.authToke, '\n', data)
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
    useRefreshOnFocus(refetch)
    useEffect(() => {
        let temp = data?.data
        if (temp) {
            temp.rooms?.sort?.((a, b) => new Date(b?._updatedAt)?.getTime?.() - new Date(a?._updatedAt)?.getTime?.())
            temp.rooms.map((item) => {
                item._updatedAt = getTimeString(item._updatedAt)
            })
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
                temp.rooms.map((item) => {

                    item._updatedAt = getTimeString(item._updatedAt)
                })
            }
            setLiveChatRoomsData(temp)
            setExtraDataKey(uuid.v4())
        }

    }
    const { top } = useSafeAreaInsets()
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: top }}>
            <View style={{ height: 56, width: "100%" }}></View>
            <FlatList extraData={extraDataKey} keyExtractor={item => item._id}
                data={liveChatRoomsData?.rooms ?? []} renderItem={(({ item }) => {
                    return (<ChatRoomItem authToken={currentUserInfoStateValue.authToke} userId={currentUserInfoStateValue.userId} item={item} />
                    )
                })} />
            <WebsocketConnectStatus status={isRefetching || isLoading ? "嘗試連接中" : webSocketStatus} />
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
    const itemPress = useCallback(() => {
        navigation.navigate('ChatRoom' as never, {
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
        })
    }, [item, navigation])
    return (
        <ChatListItem updatedAt={item._updatedAt as unknown as string ?? ""} msg={item?.lastMessage?.msg} name={item.fname} platform={item.v.username} uri={avatar} onPress={itemPress} />
    )
}
const WebsocketConnectStatus = ({ status }: { status: webSocketStatusType }) => {
    if (status === "已連接") return null
    return <View style={{ width: "100%", height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: "lightblue", position: 'absolute', bottom: 0 }}>
        <ActivityIndicator />
        <Text style={{ color: "white", marginLeft: 10, fontWeight: "bold" }}>{status}</Text>
    </View>
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