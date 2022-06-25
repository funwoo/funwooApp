import React, { FC } from "react"
import { Pressable, Text, useWindowDimensions, View } from "react-native"
import Avatar from "./Avatar"

interface ChatListItemProps {
    onPress: () => void,
    name?: string,
    platform?: string,
    uri?: string,
    msg?: string,
    updatedAt: string
}
const ChatListItem: FC<ChatListItemProps> = ({ onPress, name, platform, uri, msg, updatedAt }) => {
    const { width } = useWindowDimensions()
    return (
        <Pressable onPress={onPress} style={{
            width: "100%",
            height: 64,
            flexDirection: 'row',
            padding: 8,
            justifyContent: 'space-between'
        }}>
            <View style={{ flexDirection: 'row' }}>
                <Avatar name={name} platform={platform} uri={uri} />
                <View style={{
                    width: width * 0.6,
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
            <View >
                <Text style={{ color: "#616161", fontSize: 14, fontWeight: "400", lineHeight: 24 }}>{updatedAt}</Text>
            </View>
        </Pressable>
    )
}
export default ChatListItem