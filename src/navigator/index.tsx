import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EntranceNavigatorStack from "./EntranceNavigatorStack";
import RNBootSplash from "react-native-bootsplash";
import { useUserInfoContextProvider } from "../context/UserInfoContextProvider";
import BackyardNavigatorStack from "./BackyardNavigatorStack";

function Main() {
    const { userInfo } = useUserInfoContextProvider()
    return (
        <NavigationContainer onReady={() => RNBootSplash.hide()} >
            {!userInfo?.jwt ? <EntranceNavigatorStack /> : <BackyardNavigatorStack />}

        </NavigationContainer >
    );
}
export default Main