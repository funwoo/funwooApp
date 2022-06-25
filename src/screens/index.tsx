import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import React, { useEffect } from 'react'
import { useRecoilValue } from "recoil";
import { currentUserInfoState } from "../state/currentUserInfoState";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LiveChatRoomListScreen from "./LiveChatRoomListScreen";
import SettingsScreen from "./SettingsScreen";
import { backyardAPIHttpClient, rocketChatHttpClient } from "../network/httpClient";
import ChatRoomScreen from "./ChatRoomScreen";
import WebsocketContextProvider from "../context/WebsocketContextProvider";
import Icon from 'react-native-vector-icons/dist/AntDesign'
import axios from "axios";
import ChatRoomInfoScreen from "./ChatRoomInfoScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
    const currentUserInfoStateValue = useRecoilValue(currentUserInfoState)
    useEffect(() => {
        if (!currentUserInfoStateValue?.authToken || !currentUserInfoStateValue?.userId) return
        //@ts-ignore
        rocketChatHttpClient.defaults.headers['X-Auth-Token'] = currentUserInfoStateValue?.authToken
        //@ts-ignore
        rocketChatHttpClient.defaults.headers['X-User-Id'] = currentUserInfoStateValue?.userId
    }, [currentUserInfoStateValue])
    return (
        <NavigationContainer >
            {currentUserInfoStateValue?.authToken ? <WebsocketContextProvider>
                <Stack.Navigator initialRouteName={currentUserInfoStateValue ? "Tabs" : "Login"} screenOptions={(props) => ({
                    headerShown: props.route.name === 'Login' || props.route.name === 'Tabs' ? false : true
                })}  >
                    <Stack.Screen name="ChatRoom" options={({ route }) => ({ title: route.params.name })} component={ChatRoomScreen} />
                    <Stack.Screen name="ChatRoomInfo" options={({ route }) => ({ title: route.params.name })} component={ChatRoomInfoScreen} />
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
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'LiveChatRoomList') {
                        iconName = 'customerservice';
                    } else if (route.name === 'Settings') {
                        iconName = 'setting'
                    }
                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })} >
                <Tab.Screen name="LiveChatRoomList" options={{
                    title: "客戶",
                    headerShown: false
                }} component={LiveChatRoomListScreen} />
                <Tab.Screen options={{
                    title: "設定"
                }} name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </>
    );
}

export default Main