/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Suspense } from 'react';
import {
  AppStateStatus,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import useAppState from 'react-native-appstate-hook';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { focusManager, QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import { RecoilRoot } from 'recoil';
import Main from './src/screens';
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

const App = () => {
  function onAppStateChange(status: AppStateStatus) {
    focusManager.setFocused(status === 'active')
  }
  useAppState({
    onChange: onAppStateChange,
  })

  return (
    <Suspense fallback={<View style={{ flex: 1 }} />}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Main />
        </RecoilRoot>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
