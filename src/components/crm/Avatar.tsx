import React, { FC, useCallback, useMemo } from "react";
import { FlexStyle, Text, View, ViewStyle } from "react-native";
import FastImage from "react-native-fast-image"
import stc from 'string-to-color';

type AvatarProps = {
    uri?: string,
    name?: string,
    style?: FlexStyle,
    platform?: string
}
const Avatar: FC<AvatarProps> = ({ name, uri, style, platform }) => {
    const getBackaground = useCallback(() => {
        return stc(name)
    }, [name])
    const getNameStr = useCallback(() => {
        if (name?.includes(" ") && name.split(" ").length > 1) {
            return name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[1].charAt(0).toUpperCase()
        } else {
            return name?.charAt(0).toUpperCase() ?? ""
        }
    }, [name])
    const fontSize = useMemo(() => {
        if (style?.width && typeof style.width === 'number') {
            return Math.floor(style.width) / 2 + 1
        } else {
            return 18
        }
    }, [style?.width])
    const Container = useMemo(() => {
        if (uri) {
            return <FastImage source={{ uri: uri }} style={{ width: 48, height: 48, borderRadius: 24, ...style }} />
        } else {
            return <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: getBackaground(), justifyContent: 'center', alignItems: 'center', ...style }}>
                <Text style={{ fontSize: fontSize, color: "white", fontWeight: "bold" }}>{getNameStr()}</Text>
            </View>
        }
    }, [fontSize, name, uri])
    const PlatformIcon = useMemo(() => {
        if (platform?.includes('facebook')) {
            return <View style={{
                width: 18, height: 18, borderRadius: 3, backgroundColor: 'white', position: 'absolute',
                bottom: -3, right: -3, borderWidth: 1, borderColor: "#f8f8f8"
            }}>
                <FastImage style={{ width: "100%", height: "100%" }} source={{ uri: "https://cdn.funwoo.com.tw/inventory/funwoo_assets/7a8333a5cf7d80deba12fc8e47b8656906d0f3d8.jpeg" }} />
            </View>
        } else if (platform?.includes('line')) {
            return <View style={{
                width: 18, height: 18, borderRadius: 3, backgroundColor: 'white', position: 'absolute',
                bottom: -3, right: -3, borderWidth: 1, borderColor: "#f8f8f8"
            }}>
                <FastImage style={{ width: "100%", height: "100%" }} source={{ uri: "https://cdn.funwoo.com.tw/inventory/funwoo_assets/2845b9ae3e30d84325734772837238b23738782b.jpeg" }} />
            </View>
        } else {
            return null
        }


    }, [platform])
    return <View >
        {Container}
        {PlatformIcon}
    </View>

}
export default Avatar