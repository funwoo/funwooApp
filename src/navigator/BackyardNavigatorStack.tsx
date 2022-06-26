import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import WebsocketContextProviderProvider from '../context/WebsocketContextProvider';
import ChatRoomScreen from '../screens/backyard/ChatRoomScreen';
import { BackyardNavigatorTabs } from './BackyardNavigatorTabs';
import { PageNames } from './PageNames';
const Stack = createNativeStackNavigator();
const BackyardNavigatorStack = () => {
    return (
        <WebsocketContextProviderProvider>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} initialRouteName={"backyardTabs"}  >
                <Stack.Screen name="backyardTabs" component={BackyardNavigatorTabs} />
                <Stack.Screen options={{
                    headerShown: true
                }} name={PageNames.chatroom} component={ChatRoomScreen} />
            </Stack.Navigator>
        </WebsocketContextProviderProvider>
    )
}
export default BackyardNavigatorStack