import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
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
                <Stack.Screen options={({ route }) => ({
                    headerShown: true,
                    headerTitle: (props) => {
                        console.log("route", route.params)

                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {route?.params?.platform != 'unknow' ? <FastImage style={{ width: 25, height: 25, marginRight: 10 }} source={{ uri: route?.params?.platform?.includes('line') ? "https://cdn.funwoo.com.tw/inventory/funwoo_assets/2845b9ae3e30d84325734772837238b23738782b.jpeg" : "https://cdn.funwoo.com.tw/inventory/funwoo_assets/7a8333a5cf7d80deba12fc8e47b8656906d0f3d8.jpeg" }} /> : null}

                                <Text style={{ fontSize: 20, fontWeight: "500", color: "#212121" }}>{route?.params?.name ?? ""}</Text>
                            </View>
                        )

                    }
                })} name={PageNames.chatroom} component={ChatRoomScreen} />
            </Stack.Navigator>
        </WebsocketContextProviderProvider>
    )
}
export default BackyardNavigatorStack