import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MoreStackPageName} from './PageNames';
import MoreScreen from '../screens/entrance/MoreScreen';
import AboutUsScreen from '../screens/entrance/MoreScreen/Screen/AboutUsScreen';
import AboutFunderScreen from '../screens/entrance/MoreScreen/Screen/AboutFunderScreen';
import AgentsScreen from '../screens/entrance/MoreScreen/Screen/AgentsScreen';
import JobsScreen from '../screens/entrance/MoreScreen/Screen/JobsScreen/JobsScreen';
import ContactUsScreen from '../screens/entrance/MoreScreen/Screen/ContactUsScreen';
import OverseaScreen from '../screens/entrance/MoreScreen/Screen/OverseaScreen';
import ServiceTermsScreen from '../screens/entrance/MoreScreen/Screen/ServiceTermsScreen';
import PrivatePolicyScreen from '../screens/entrance/MoreScreen/Screen/PrivatePolicyScreen';
import UserCookieTermsScreen from '../screens/entrance/MoreScreen/Screen/UserCookieTermsScreen';
import LicenseScreen from '../screens/entrance/MoreScreen/Screen/LicenseScreen';

const Stack = createNativeStackNavigator<MoreScreenParamsList>();

const MoreScreenNavigatorStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={MoreStackPageName.navigate}>
      <Stack.Screen name={MoreStackPageName.navigate} component={MoreScreen} />
      <Stack.Screen
        name={MoreStackPageName.aboutUs}
        component={AboutUsScreen}
      />
      <Stack.Screen
        name={MoreStackPageName.aboutFounder}
        component={AboutFunderScreen}
      />
      <Stack.Screen name={MoreStackPageName.agents} component={AgentsScreen} />
      <Stack.Screen name={MoreStackPageName.jobs} component={JobsScreen} />
      <Stack.Screen
        name={MoreStackPageName.contactUs}
        component={ContactUsScreen}
      />
      <Stack.Screen
        name={MoreStackPageName.overseas}
        component={OverseaScreen}
      />
      <Stack.Screen
        name={MoreStackPageName.serviceTerms}
        component={ServiceTermsScreen}
      />
      <Stack.Screen
        name={MoreStackPageName.privatePolicy}
        component={PrivatePolicyScreen}
      />
      <Stack.Screen
        name={MoreStackPageName.userCookieTerms}
        component={UserCookieTermsScreen}
      />
      <Stack.Screen
        name={MoreStackPageName.license}
        component={LicenseScreen}
      />
    </Stack.Navigator>
  );
};
export default MoreScreenNavigatorStack;
