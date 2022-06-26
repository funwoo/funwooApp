import moment from "moment"
import React, { FC, useCallback } from "react"
import { Pressable, Text, useWindowDimensions, View } from "react-native"
import Avatar from "../../../../components/crm/Avatar"

interface ChatListItemProps {
    onPress: () => void,
    name?: string,
    platform?: string,
    uri?: string,
    msg?: string,
    updatedAt: string,
    unread: number
}
const ChatListItem: FC<ChatListItemProps> = ({ onPress, name, platform, uri, msg, updatedAt, unread }) => {
    const { width } = useWindowDimensions()
    const getTimeString = useCallback((date: Date | number | string) => {
        if (date === "") return ""
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
        <Pressable onPress={onPress} style={{
            width: "100%",
            height: 64,
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 8,
            justifyContent: 'space-between'
        }}>
            <View style={{ flexDirection: 'row', flex: 3 }}>
                <Avatar name={name} platform={platform} uri={uri} />
                <View style={{
                    width: "60%",
                    marginLeft: 16,
                    justifyContent: 'center',
                    height: "100%"
                }}>
                    <Text style={{ fontWeight: "400", fontSize: 16, color: "#212121", lineHeight: 24 }}>{name}</Text>
                    <Text numberOfLines={1} style={{
                        color: "#616161",
                        fontSize: 14,
                        fontWeight: "400",
                        lineHeight: 24
                    }}>{msg}</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ color: "#616161", fontSize: 14, fontWeight: "400", lineHeight: 24, textAlign: 'right' }}>{getTimeString(updatedAt)}</Text>
                {unread > 0 && <View style={{
                    backgroundColor: "#38A169",
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 24,

                    alignSelf: 'flex-end'
                }}>
                    <Text style={{ textAlign: 'right', color: "white" }}>{unread}</Text>
                </View>}

            </View>
        </Pressable>
    )
}
export default ChatListItem