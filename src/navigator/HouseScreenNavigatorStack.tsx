import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HouseStackPageName} from './PageNames';
import HouseScreen from '../screens/entrance/HouseScreen/HouseScreen';
import AddAddressScreen from '../screens/entrance/HouseScreen/AddAddressScreen';

const Stack = createNativeStackNavigator<HouseScreenStackParamsList>();

const HouseScreenNavigatorStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={HouseStackPageName.detail}>
      <Stack.Screen name={HouseStackPageName.detail} component={HouseScreen} />
      <Stack.Screen
        name={HouseStackPageName.addAddress}
        component={AddAddressScreen}
      />
    </Stack.Navigator>
  );
};
export default HouseScreenNavigatorStack;
