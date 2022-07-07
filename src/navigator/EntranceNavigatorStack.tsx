import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/entrance/LoginScreen';
import EntranceNavigatorTabs from './EntranceNavigatorTabs';
import {PageNames} from './PageNames';

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
    </Stack.Navigator>
  );
};
export default EntranceNavigatorStack;
