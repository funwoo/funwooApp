import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import React, { useEffect } from 'react'
import { useRecoilValue } from "recoil";
import { currentUserInfoState } from "../state/currentUserInfoState";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LiveChatRoomListScreen from "./LiveChatRoomListScreen";
import SettingsScreen from "./SettingsScreen";
import { rocketChatHttpClient } from "../network/httpClient";
import ChatRoomScreen from "./ChatRoomScreen";
import WebsocketContextProvider from "../context/WebsocketContextProvider";
export type RootStackParamList = {
    ChatRoom: { roomid: string };
    Login: undefined;
    Tabs: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function Main() {
    const currentUserInfoStateValue = useRecoilValue(currentUserInfoState)
    useEffect(() => {
        if (!currentUserInfoStateValue?.authToken || !currentUserInfoStateValue?.userId) return
        //@ts-ignore
        rocketChatHttpClient.defaults.headers['X-Auth-Token'] = currentUserInfoStateValue?.authToken
        //@ts-ignore
        rocketChatHttpClient.defaults.headers['X-User-Id'] = currentUserInfoStateValue?.userId
        console.log(currentUserInfoStateValue?.authToken, currentUserInfoStateValue?.userId)
    }, [currentUserInfoStateValue])
    return (
        <NavigationContainer >

            {currentUserInfoStateValue?.authToken ? <WebsocketContextProvider>
                <Stack.Navigator initialRouteName={currentUserInfoStateValue ? "Tabs" : "Login"} screenOptions={(props) => ({
                    headerShown: props.route.name === 'Login' || props.route.name === 'Tabs' ? false : true
                })}  >
                    <Stack.Screen name="ChatRoom" options={({ route }) => ({ title: route.params.name })} component={ChatRoomScreen} />
                    <Stack.Screen name="Tabs" component={Tabs} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                </Stack.Navigator>
            </WebsocketContextProvider> : <Stack.Navigator initialRouteName={currentUserInfoStateValue ? "Tabs" : "Login"} screenOptions={(props) => ({
                headerShown: props.route.name === 'Login' || props.route.name === 'Tabs' ? false : true
            })}  >
                <Stack.Screen name="Login" component={LoginScreen} />

            </Stack.Navigator>}
        </NavigationContainer >
    );
}
function Tabs() {
    return (
        <>
            <Tab.Navigator >
                <Tab.Screen name="LiveChatRoomList" component={LiveChatRoomListScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </>
    );
}

export default Main