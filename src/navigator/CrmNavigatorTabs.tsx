import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign'
import LiveChatRoomListScreen from '../screens/LiveChatRoomListScreen';
import SettingsScreen from '../screens/SettingsScreen';
const Tab = createBottomTabNavigator();
export const CrmNavigatorTabs = () => {
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