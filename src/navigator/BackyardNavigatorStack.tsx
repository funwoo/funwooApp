import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {openLimitedPhotoLibraryPicker} from 'react-native-permissions';
import WebsocketContextProviderProvider from '../context/WebsocketContextProvider';
import ChatRoomScreen from '../screens/backyard/ChatRoomScreen';
import ImageViewerScreen from '../screens/backyard/ImageViewerScreen';
import PhotoLibraryScreen from '../screens/backyard/PhotoLibraryScreen';
import {BackyardNavigatorTabs} from './BackyardNavigatorTabs';
import {PageNames} from './PageNames';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import UserDetailScreen from '../screens/backyard/UserContactScreen';

const Stack = createNativeStackNavigator();

const BackyardNavigatorStack = () => {
  return (
    <WebsocketContextProviderProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'backyardTabs'}>
        <Stack.Screen name="backyardTabs" component={BackyardNavigatorTabs} />
        <Stack.Screen
          options={({route, navigation}) => ({
            headerShown: true,
            headerTitle: props => {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {route?.params?.platform != 'unknow' ? (
                    <FastImage
                      style={{width: 25, height: 25, marginRight: 10}}
                      source={{
                        uri: route?.params?.platform?.includes('line')
                          ? 'https://cdn.funwoo.com.tw/inventory/funwoo_assets/2845b9ae3e30d84325734772837238b23738782b.jpeg'
                          : 'https://cdn.funwoo.com.tw/inventory/funwoo_assets/7a8333a5cf7d80deba12fc8e47b8656906d0f3d8.jpeg',
                      }}
                    />
                  ) : null}
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      color: '#212121',
                    }}>
                    {route?.params?.name ?? ''}
                  </Text>
                </View>
              );
            },
            headerRight: () => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate(PageNames.userContact, {
                      platform: route.params.platform,
                      name: route.params.name,
                      id: route.params.id,
                    })
                  }>
                  <AntDesign size={25} name={'infocirlceo'} color={'black'} />
                </Pressable>
              );
            },
          })}
          name={PageNames.chatroom}
          component={ChatRoomScreen}
        />
        <Stack.Screen
          options={({route}) => ({
            headerShown: true,
            headerBackTitle: '返回',
            headerTitle: props => {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {route?.params?.platform != 'unknow' ? (
                    <FastImage
                      style={{width: 25, height: 25, marginRight: 10}}
                      source={{
                        uri: route?.params?.platform?.includes('line')
                          ? 'https://cdn.funwoo.com.tw/inventory/funwoo_assets/2845b9ae3e30d84325734772837238b23738782b.jpeg'
                          : 'https://cdn.funwoo.com.tw/inventory/funwoo_assets/7a8333a5cf7d80deba12fc8e47b8656906d0f3d8.jpeg',
                      }}
                    />
                  ) : null}
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      color: '#212121',
                    }}>
                    {route?.params?.name ?? ''}
                  </Text>
                </View>
              );
            },
          })}
          name={PageNames.userContact}
          component={UserDetailScreen}
        />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            options={({route, navigation}) => {
              return {
                headerShown: true,
                headerBackTitle: '返回',
                title: '圖片選取',
                presentation: 'modal',
                headerLeft: () => {
                  return (
                    <Pressable
                      onPress={() => {
                        navigation.pop();
                      }}>
                      <Text style={{fontWeight: 'bold'}}>關閉</Text>
                    </Pressable>
                  );
                },
                headerRight: () => {
                  if (route.params?.permission) {
                    return (
                      <Pressable
                        onPress={() => {
                          openLimitedPhotoLibraryPicker();
                        }}>
                        <Text>管理</Text>
                      </Pressable>
                    );
                  } else {
                    return null;
                  }
                },
              };
            }}
            component={PhotoLibraryScreen}
            name={PageNames.photoLibrary}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'fullScreenModal'}}>
          <Stack.Screen
            options={({route, navigation}) => {
              return {
                headerShown: true,
                headerBackButtonMenuEnabled: false,
                title: '',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerRight: () => {
                  return (
                    <Pressable onPress={() => navigation.goBack()}>
                      <AntDesign size={25} name={'close'} color={'white'} />
                    </Pressable>
                  );
                },
              };
            }}
            component={ImageViewerScreen}
            name={PageNames.imageViewer}
          />
        </Stack.Group>
      </Stack.Navigator>
    </WebsocketContextProviderProvider>
  );
};
export default BackyardNavigatorStack;
