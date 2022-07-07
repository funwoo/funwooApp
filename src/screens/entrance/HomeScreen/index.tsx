import { Text, View } from "react-native"
import React from 'react'
const HomeScreen = () => {
    return <View style={{ flex: 1, padding: 20, paddingTop: 40 }}>
        <Text style={{ fontFamily: "NotoSansTC-Regular", fontSize: 18, }}>Hello</Text>
        <Text style={{ fontFamily: "NotoSansTC-Bold", fontSize: 18 }}>Hello</Text>
        <Text style={{ fontFamily: "NotoSansTC-Medium", fontSize: 18 }}>Hello</Text>
    </View>
}
export default HomeScreen