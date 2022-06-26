import { Button, Pressable, Text, View } from "react-native"
import React from 'react'
import { AppColors } from "../../../assets/colors/AppColors"
import { useUserInfoContextProvider } from "../../../context/UserInfoContextProvider"
const SettingsScreen = () => {
    const { signOut } = useUserInfoContextProvider()
    return (
        <View style={{ flex: 1, paddingTop: 50 }}>
            <Pressable onPress={signOut} style={{ backgroundColor: AppColors.black, height: 48, justifyContent: 'center', alignItems: 'center', borderRadius: 8, width: "70%", alignSelf: 'center' }}>
                <Text style={{ color: "white" }}>登出</Text>
            </Pressable>
        </View>
    )
}
export default SettingsScreen