import {FlatList, Text, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/zh-tw';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
import {useWebSocketContext} from '../../../context/WebsocketContextProvider';
import {useRefreshOnFocus} from '../../../hooks/useRefreshOnFocus';
import Apis from '../../../network/apis';

import ChatListItem from './components/ChatListItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PageNames} from '../../../navigator/PageNames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Avatar from '../../../components/crm/Avatar';
import {useUserInfoContextProvider} from '../../../context/UserInfoContextProvider';
import Feather from 'react-native-vector-icons/Feather';
import {useQuery} from 'react-query';
import apis from '../../../network/apis';
import {ROOMS_TABLE} from '../../../model/Room';
import withObservables from '@nozbe/with-observables';
import {database} from '../../../..';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import {Q} from '@nozbe/watermelondb';
import {WebsocketConnectStatus} from './components/WebsocketConnectStatus';
import {updateOrCreate} from '../../../model/lib/Room';
const LiveChatRoomListScreen = ({rooms}) => {
  const database = useDatabase();
  useQuery('setUserStatus', apis.setUserStatus);
  const navigation = useNavigation();
  const {webSocketStatus} = useWebSocketContext();
  const {userInfo} = useUserInfoContextProvider();
  const [extraDataKey, setExtraDataKey] = useState(uuid.v4());
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const {top} = useSafeAreaInsets();
  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      const livechatRoomLastTimeUpdate = await AsyncStorage.getItem(
        'livechatRoomLastTimeUpdate',
      );
      const {data} = await Apis.getLiveChatRoomList(livechatRoomLastTimeUpdate);
      let roomMap = new Map();
      data.forEach(item => {
        roomMap.set(item.id, item);
      });
      const values = await Promise.all(
        data.map(item =>
          updateOrCreate(item.id, {
            ...item,
            msg: item.msg,
            line_id: item?.livechatData?.line_id,
            avatar: item?.livechatData?.avatar,
            updatedAt: item.updatedAt,
            phone: item?.phone?.map(res => res?.phoneNumber || res) ?? [],
            roomId: item.roomId,
          }),
        ),
      );
      database.write(async () => {
        await database.batch(values);
      });
      //刪除被移除的聊天室
      const currentRooms = await database.get(ROOMS_TABLE).query().fetch();
      const removedRooms = currentRooms.filter(res => {
        return !roomMap.get(res.custom_id);
      });
      const roomsNeedToBeDeleted = removedRooms.map(item => {
        return database
          .get(ROOMS_TABLE)
          .query(Q.where('custom_id', item.custom_id))
          .fetch();
      });

      const datas = await Promise.all(roomsNeedToBeDeleted);
      const result = datas.map(item => {
        return item[0].destroyPermanently();
      });
      database.write(async () => {
        await database.batch(result);
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);
  useEffect(() => {
    refresh();
  }, []);
  useRefreshOnFocus(refresh);

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingTop: top}}>
      <View
        style={{
          height: 56,
          width: '100%',
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Avatar
          style={{width: 40, height: 40}}
          name={userInfo?.name}
          uri={userInfo?.image}
        />
        <Text
          style={{
            marginLeft: 16,
            color: '#212121',
            fontWeight: '400',
            fontSize: 20,
          }}>
          {userInfo?.name}
        </Text>
      </View>
      <View
        style={{
          height: 32,
          marginHorizontal: 16,
          backgroundColor: '#FAFAFA',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Feather
          name="search"
          color={'#9E9E9E'}
          size={20}
          style={{marginHorizontal: 8}}
        />
        <TextInput
          onChangeText={txt => {
            setFilter(txt);
          }}
          style={{flex: 1}}
          placeholder="搜尋"
        />
      </View>
      <FlatList
        extraData={extraDataKey}
        keyExtractor={item => item.id}
        data={rooms.filter(item => {
          return item?.name
            ?.toLowerCase?.()
            ?.includes(filter?.toLowerCase() ?? '');
        })}
        renderItem={({item}) => {
          return (
            <ChatListItem
              unread={item.unread}
              updatedAt={moment.unix(item.date).toISOString()}
              msg={item.last_message}
              name={item.name}
              platform={item.username}
              uri={item.avatar}
              onPress={() => {
                navigation.navigate(PageNames.chatroom, {
                  roomId: item.roomId,
                  token: item.token,
                  name: item.name,
                  avatar: item?.avatar,
                  roomName: item.name,
                  platform: item.username?.includes('facebook')
                    ? 'facebook'
                    : item.username?.includes('line')
                    ? 'line'
                    : 'unknow',
                  username: item.username,
                  id: item.id,
                });
              }}
            />
          );
        }}
      />
      <WebsocketConnectStatus
        status={isLoading ? '嘗試連接中' : webSocketStatus}
      />
    </View>
  );
};
const enhance = withObservables([ROOMS_TABLE], () => {
  return {
    rooms: database.collections
      .get(ROOMS_TABLE)
      .query(Q.sortBy('date', Q.desc))
      .observe(),
  };
});

export default enhance(LiveChatRoomListScreen);
