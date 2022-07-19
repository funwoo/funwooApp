import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/entrance/LoginScreen';
import EntranceNavigatorTabs from './EntranceNavigatorTabs';
import {PageNames} from './PageNames';
import HouseScreenNavigatorStack from './HouseScreenNavigatorStack';
import AgentScreen from '../screens/entrance/AgentScreen';
import JobScreen from '../screens/entrance/JobScreen';

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
      <Stack.Screen
        name={PageNames.house}
        component={HouseScreenNavigatorStack}
      />
      <Stack.Screen name={PageNames.agent} component={AgentScreen} />
      <Stack.Screen name={PageNames.job} component={JobScreen} />
    </Stack.Navigator>
  );
};
export default EntranceNavigatorStack;
