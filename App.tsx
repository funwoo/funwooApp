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
// import Config from './src/models/index';
import Main from './src/navigator';
import Toast from 'react-native-toast-message';
import DimensionsContextProvider from './src/context/DimensionsContext';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import {MyFavoriteContextProvider} from './src/context/MyFavoriteContext';
import Spinner from './src/components/feature/Spinner';
import CodePush from 'react-native-code-push';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {database} from '.';
import RNFetchBlob from 'rn-fetch-blob';
LogBox.ignoreAllLogs(true);
console.log(RNFetchBlob.fs.dirs.DocumentDir);
const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});
// const {RealmProvider} = Config;

const App = () => {
  function onAppStateChange(status: AppStateStatus) {
    focusManager.setFocused(status === 'active');
  }

  useAppState({
    onChange: onAppStateChange,
  });
  return (
    <DatabaseProvider database={database}>
      <TailwindProvider utilities={utilities}>
        <Suspense fallback={<View style={{flex: 1}} />}>
          <DimensionsContextProvider>
            <QueryClientProvider client={queryClient}>
              <RecoilRoot>
                <UserInfoContextProvider>
                  <MyFavoriteContextProvider>
                    <Main />
                    {/* <Spinner /> */}
                  </MyFavoriteContextProvider>
                </UserInfoContextProvider>
              </RecoilRoot>
            </QueryClientProvider>
          </DimensionsContextProvider>
          <Toast />
        </Suspense>
      </TailwindProvider>
    </DatabaseProvider>
  );
};
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  updateDialog: false,
};

export default CodePush(codePushOptions)(App);
