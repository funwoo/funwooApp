import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback } from 'react'
import { CustomTabIcon } from '../assets/fonts';
import LiveChatRoomListScreen from '../screens/backyard/LiveChatRoomListScreen';
import SettingsScreen from '../screens/backyard/SettingsScreen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Text } from 'react-native';
const Tab = createBottomTabNavigator();
export const BackyardNavigatorTabs = () => {
    const getRouteTitle = useCallback((name: string) => {
        switch (name) {
            case "LiveChatRoomList":
                return '主頁';
            case "Settings":
                return '設定';
            default:
                break;
        }
    }, []);
    return (
        <>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarLabel: ({ focused }) => {
                    return (
                        <Text
                            style={{
                                fontFamily: 'NotoSansTC-Regular',
                                fontSize: 12,
                                fontWeight: 'normal',
                                fontStyle: 'normal',
                                lineHeight: 18,
                                letterSpacing: 0.4,
                                textAlign: 'center',
                                color: focused ? '#1c1e21' : '#6d6d6d',
                            }}
                        >
                            {getRouteTitle(route?.name)}
                        </Text>
                    );
                },
                tabBarIcon: ({ focused, size }) => {
                    const state = focused ? 'active' : 'inactive';
                    const color = focused ? "black" : "gray"
                    if (route.name === 'LiveChatRoomList') {
                        return <CustomTabIcon name={`home-${state}`} size={size} color={color} />;
                    } else if (route.name === 'Settings') {
                        return <AntDesign name='setting' color={color} size={size} />
                    }
                },

            })}
                defaultScreenOptions={{
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                    tabBarLabelStyle: {
                        marginBottom: 5,
                    }
                }} >
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