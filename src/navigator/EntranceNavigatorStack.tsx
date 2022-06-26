import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import EntranceNavigatorTabs from "./EntranceNavigatorTabs";
const Stack = createNativeStackNavigator();
const EntranceNavigatorStack = () => {
    return (
        <Stack.Navigator initialRouteName={"entranceTabs"} screenOptions={(props) => ({
            headerShown: props.route.name === 'Login' || props.route.name === 'Tabs' ? false : true
        })}  >
            <Stack.Screen name="entranceTabs" component={EntranceNavigatorTabs} />

        </Stack.Navigator>
    )
}
export default EntranceNavigatorStack