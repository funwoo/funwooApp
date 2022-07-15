import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import EntranceNavigatorStack from './EntranceNavigatorStack';
import RNBootSplash from 'react-native-bootsplash';
import {useUserInfoContextProvider} from '../context/UserInfoContextProvider';
import BackyardNavigatorStack from './BackyardNavigatorStack';
import {PageNames} from './PageNames';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Linking} from 'react-native';

const Stack = createNativeStackNavigator();

function Main() {
  const [ready, setReady] = useState(false);
  const {userInfo} = useUserInfoContextProvider();
  // const linking = {
  //   prefixes: ['https://funwoo.com.tw', 'funwoo://'],
  //   config: {
  //     screens: {
  //       entrance: 'entrance',
  //     },
  //   },
  // };
  const navigationRef = useNavigationContainerRef<RootStackParamsList>();
  useEffect(() => {
    if (!ready) {
      return;
    }
    if (userInfo?.jwt) {
      navigationRef.navigate('backyard');
    } else {
      navigationRef.navigate('entrance');
    }
  }, [userInfo?.jwt, ready]);
  return (
    <NavigationContainer
      ref={navigationRef}
      children={
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={PageNames.entranceTabs}>
          <Stack.Screen
            name={PageNames.entrance}
            component={EntranceNavigatorStack}
          />
          {userInfo?.jwt && (
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={PageNames.backyard}
              component={BackyardNavigatorStack}
            />
          )}
        </Stack.Navigator>
        // !userInfo?.jwt ? <EntranceNavigatorStack /> : <BackyardNavigatorStack />
      }
      linking={{
        prefixes: ['https://funwoo.com.tw', 'funwoo://'],
        config: {
          screens: {
            [PageNames.entrance]: {
              path: 'app',
              initialRouteName: PageNames.entranceTabs,
              screens: {
                [PageNames.entranceTabs]: {
                  path: '',
                  // initialRouteName: PageNames.home,
                  screens: {
                    [PageNames.home]: {
                      path: 'home',
                      initialRouteName: PageNames.home,
                    },
                    [PageNames.searchHouse]: {
                      path: 'searchHouse',
                      initialRouteName: PageNames.searchHouse,
                    },
                    [PageNames.sell]: {
                      path: 'sell',
                      initialRouteName: PageNames.sell,
                    },
                    [PageNames.more]: {
                      path: 'more',
                      initialRouteName: PageNames.more,
                    },
                    [PageNames.myFavorite]: {
                      path: 'myFavorite',
                      initialRouteName: PageNames.myFavorite,
                    },
                  },
                },
                [PageNames.signIn]: PageNames.signIn,
                [PageNames.house]: {
                  path: `${PageNames.house}/:sid`,
                  parse: {
                    sid: (sid: string) => `${sid}`,
                  },
                  stringify: {
                    sid: (sid: string) => sid.replace(/^user-/, ''),
                  },
                },
              },
            },
            [PageNames.backyard]: {
              path: 'backyard',
              // initialRouteName: PageNames.entranceTabs,
              screens: {
                [PageNames.backyardTabs]: {
                  path: PageNames.backyardTabs,
                },
                [PageNames.chatroom]: {
                  path: `${PageNames.house}/:sid`,
                  parse: {
                    sid: (sid: string) => `${sid}`,
                  },
                  stringify: {
                    sid: (sid: string) => sid.replace(/^user-/, ''),
                  },
                },
              },
            },
          },
        },
        subscribe(listener) {
          const onReceiveURL = ({url}: {url: string}) => {
            if (!ready) {
              listener('funwoo:///app');
            }
            if (!userInfo?.jwt && url.includes(PageNames.backyard)) {
              listener('funwoo:///app/signIn');
              return;
            }
            console.log(url);
            listener(url);
          };

          // Listen to incoming links from deep linking
          Linking.addEventListener('url', onReceiveURL);

          return () => {
            // Clean up the event listeners
            Linking.removeAllListeners('url');
          };
        },
      }}
      onReady={() => {
        setReady(true);
        RNBootSplash.hide();
      }}
    />
  );
}

export default Main;
