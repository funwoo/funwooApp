import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/entrance/LoginScreen';
import EntranceNavigatorTabs from './EntranceNavigatorTabs';
import {PageNames} from './PageNames';
import HouseScreen from '../screens/entrance/HouseScreen/HouseScreen';

const Stack = createNativeStackNavigator<EntranceRootStackParamsList>();

const EntranceNavigatorStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={PageNames.entranceTabs}>
      <Stack.Screen
        name={PageNames.entranceTabs}
        component={EntranceNavigatorTabs}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: '登入Backyard',
          headerBackTitle: '返回',
        }}
        name={PageNames.signIn}
        component={LoginScreen}
      />
      <Stack.Screen name={PageNames.house} component={HouseScreen} />
    </Stack.Navigator>
  );
};
export default EntranceNavigatorStack;
