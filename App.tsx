/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Suspense} from 'react';
import {AppStateStatus, LogBox, View} from 'react-native';
import useAppState from 'react-native-appstate-hook';
import {focusManager, QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import UserInfoContextProvider from './src/context/UserInfoContextProvider';
import Config from './src/models/index';
import Main from './src/navigator';
import Toast from 'react-native-toast-message';
import DimensionsContextProvider from './src/context/DimensionsContext';

LogBox.ignoreAllLogs(true);
const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});
const {RealmProvider} = Config;
const App = () => {
  function onAppStateChange(status: AppStateStatus) {
    focusManager.setFocused(status === 'active');
  }

  useAppState({
    onChange: onAppStateChange,
  });
  return (
    <Suspense fallback={<View style={{flex: 1}} />}>
      <DimensionsContextProvider>
        <RealmProvider>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <UserInfoContextProvider>
                <Main />
              </UserInfoContextProvider>
            </RecoilRoot>
          </QueryClientProvider>
        </RealmProvider>
      </DimensionsContextProvider>
      <Toast />
    </Suspense>
  );
};

export default App;
