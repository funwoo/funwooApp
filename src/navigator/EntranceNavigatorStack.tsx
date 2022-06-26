import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import LoginScreen from "../screens/entrance/LoginScreen";
import MoreScreen from "../screens/entrance/MoreScreen";
import EntranceNavigatorTabs from "./EntranceNavigatorTabs";
import { PageNames } from "./PageNames";
const Stack = createNativeStackNavigator();
const EntranceNavigatorStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName={"entranceTabs"}  >
            <Stack.Screen name="entranceTabs" component={EntranceNavigatorTabs} />
            <Stack.Screen options={{
                headerShown: true,
                title: "登入Backyard",
                headerBackTitle: "返回"
            }} name={PageNames.signIn} component={LoginScreen} />
        </Stack.Navigator>
    )
}
const MoreScreenStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName={PageNames.more}   >
            <Stack.Screen name={PageNames.more} component={MoreScreen} />

        </Stack.Navigator>
    )

}
export { MoreScreenStack }
export default EntranceNavigatorStack