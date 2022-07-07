import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import EntranceNavigatorStack from './EntranceNavigatorStack';
import RNBootSplash from 'react-native-bootsplash';
import {useUserInfoContextProvider} from '../context/UserInfoContextProvider';
import BackyardNavigatorStack from './BackyardNavigatorStack';

function Main() {
  const {userInfo} = useUserInfoContextProvider();

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      {!userInfo?.jwt ? <EntranceNavigatorStack /> : <BackyardNavigatorStack />}
    </NavigationContainer>
  );
}

export default Main;
