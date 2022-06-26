import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EntranceNavigatorStack from "../navigator/EntranceNavigatorStack";
import RNBootSplash from "react-native-bootsplash";

function Main() {
    return (
        <NavigationContainer onReady={() => RNBootSplash.hide()} >
            <EntranceNavigatorStack />
        </NavigationContainer >
    );
}
export default Main