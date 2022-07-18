import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Platform, View} from 'react-native';
import {GiftedChat, IMessage, SystemMessage} from 'react-native-gifted-chat';
import {useWebSocketContext} from '../../../context/WebsocketContextProvider';
import {rockatchatAPIHttpClient} from '../../../network/httpClient';
import {useMutation} from 'react-query';
import apis from '../../../network/apis';
import Avatar from '../../../components/crm/Avatar';
import moment from 'moment';
import {useUserInfoContextProvider} from '../../../context/UserInfoContextProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRefreshOnFocus} from '../../../hooks/useRefreshOnFocus';
import ImageMessageRender from './components/ImageMessageRender';
import ActionButton from './components/ActionButton';
import {Composer} from './components/Composer';
import {checkPermission} from '../../../lib/Permission';
import {PageNames} from '../../../navigator/PageNames';
import {PERMISSIONS} from 'react-native-permissions';
import {launchCamera} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {readAll} from '../../../model/lib/Room';
import {getEarliestMessageDate, saveMessage} from '../../../model/lib/Message';
import withObservables from '@nozbe/with-observables';
import {MESSAGES_TABLE} from '../../../model/Message';
import {database} from '../../../..';
import {Q} from '@nozbe/watermelondb';
import {LiveChatMessagesHistoryProps} from '../../../network/entities/history-message-enity';
const ChatRoomScreen: React.FC<{
  route: RouteProp<
    {
      chatRoom: {
        roomId: string;
        id: string;
        username: string;
        avatar: string;
        token: string;
      };
    },
    'chatRoom'
  >;
}> = ({route, messages}) => {
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation();
  const {onExitRoom, onEnterRoom, webSocketStatus} = useWebSocketContext();
  const mutation = useMutation(apis.sentTextMessageToLiveChatRoom);
  const [isEnd, setIsEnd] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const {userInfo} = useUserInfoContextProvider();
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const disPlayMessage = useMemo(
    () =>
      messages.map(item => {
        if (item.type === 'system') {
          return {
            _id: item.id,
            text: item.text ?? '',
            createdAt: moment.unix(item.date).toISOString(),
            system: true,
            user: {
              _id: '',
            },
          };
        } else {
          return {
            _id: item.id,
            text: item.text ?? '',
            createdAt: moment.unix(item.date).toISOString(),
            user: {
              _id: item?.userId ?? '',
              name:
                item.userId === userInfo?.userId ? userInfo?.name : item.name,
              avatar:
                route.params.username === item.username
                  ? route.params.avatar
                  : item.avatar,
            },
            image: item?.image,
            sent: true,
            received: true,
            pending: true,
          };
        }
      }),
    [messages],
  );
  useEffect(() => {
    readAll(route.params.id);
    return () => {
      readAll(route.params.id);
    };
  }, []);
  useEffect(() => {
    if (webSocketStatus === '已連接') {
      onEnterRoom(route.params.roomId);
    }

    return () => {
      if (webSocketStatus === '已連接') {
        onExitRoom();
      }
    };
  }, [webSocketStatus]);
  const onLoadEarlier = useCallback(async () => {
    try {
      setIsLoadingEarlier(true);
      if (isEnd) {
        return;
      }
      const date = await getEarliestMessageDate(route.params.roomId);
      const {data} =
        await rockatchatAPIHttpClient.get<LiveChatMessagesHistoryProps>(
          `/api/v1/livechat/messages.history/${route.params.roomId}`,
          {
            params: {
              token: route.params.token,
              limit: 100,
              end: date,
            },
          },
        );
      saveMessage(data.messages);
      if (data.messages.length < 100) {
        setIsEnd(true);
      }
    } catch (error) {
      console.log(error, 'realm write fail');
    } finally {
      setIsLoadingEarlier(false);
    }
  }, [isEnd, setIsEnd]);
  const onInit = useCallback(async () => {
    try {
      const {data} =
        await rockatchatAPIHttpClient.get<LiveChatMessagesHistoryProps>(
          `/api/v1/livechat/messages.history/${route.params.roomId}`,
          {
            params: {
              token: route.params.token,
              limit: 100,
            },
          },
        );
      saveMessage(data.messages);
    } catch (error) {
      console.log(error);
    }
  }, [route.params.roomId]);
  useRefreshOnFocus(onInit);
  useEffect(() => {
    onInit();
  }, [route.params.roomId]);

  const onSend = useCallback(
    (messages: IMessage[]) => {
      mutation.mutate({
        rid: route.params.roomId,
        msg: messages[0].text,
      });
    },
    [mutation],
  );
  const onCameraButtonPress = useCallback(async () => {
    if (Platform.OS === 'ios') {
      await checkPermission(PERMISSIONS.IOS.CAMERA);
    } else {
      // checkPermission(PERMISSIONS.ANDROID)
    }
    try {
      const result = await launchCamera(
        {
          mediaType: 'photo',
          presentationStyle: 'fullScreen',
        },
        props => {
          console.log(props);
        },
      );
      const maxWidth = Math.min(result.assets?.[0].width ?? 0, 1024);
      const aspectRatio =
        (result.assets?.[0].width ?? 0) / (result.assets?.[0].height ?? 1);
      const resizeResult = await ImageResizer.createResizedImage(
        result.assets?.[0].uri ?? '',
        maxWidth,
        maxWidth / aspectRatio,
        'JPEG',
        1,
        0,
        undefined,
      );
      await apis.setImageMessage(
        {
          filename: result.assets?.[0].fileName ?? '',
          filepath: resizeResult.uri.replace('file://', ''),
          name: 'file',
        },
        route.params.roomId,
      );
    } catch (error) {
      console.log('error', error);
    }
  }, []);
  const onImageButtonPress = useCallback(async () => {
    if (Platform.OS === 'ios') {
      await checkPermission(PERMISSIONS.IOS.PHOTO_LIBRARY);
      // @ts-ignore
      navigation.navigate(PageNames.photoLibrary, {
        permission: 'result',
        roomId: route?.params?.roomId,
      });
    } else {
      // checkPermission(PERMISSIONS.ANDROID)
    }
  }, [navigation]);
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingBottom: bottom}}>
      <GiftedChat
        keyboardShouldPersistTaps={'never'}
        wrapInSafeArea={false}
        onLoadEarlier={() => onLoadEarlier()}
        showUserAvatar
        renderAvatar={({currentMessage}) => {
          return (
            <Avatar
              name={currentMessage?.user?.name}
              uri={currentMessage?.user?.avatar as string}
            />
          );
        }}
        isLoadingEarlier={isLoadingEarlier}
        infiniteScroll
        loadEarlier
        renderComposer={props => {
          return (
            <Composer
              {...props}
              onEndEditing={() => {
                setShowActions(true);
              }}
              onPressIn={() => {
                setShowActions(false);
              }}
            />
          );
        }}
        renderMessageImage={props => {
          return <ImageMessageRender props={props} />;
        }}
        renderActions={() => {
          return (
            <ActionButton
              onCameraButtonPress={onCameraButtonPress}
              onImageButtonPress={onImageButtonPress}
              navigation={navigation}
              setShowActions={setShowActions}
              showActions={showActions}
            />
          );
        }}
        renderUsernameOnMessage
        renderSystemMessage={props => {
          return (
            <SystemMessage
              {...props}
              containerStyle={{
                marginBottom: 15,
              }}
              textStyle={{
                fontSize: 14,
                color: 'red',
              }}
            />
          );
        }}
        messages={disPlayMessage}
        onSend={onSend}
        user={{
          _id: userInfo?.userId ?? '',
        }}
      />
    </View>
  );
};
const enhance = withObservables([MESSAGES_TABLE], ({route}) => {
  return {
    messages: database.collections
      .get(MESSAGES_TABLE)
      .query(Q.where('roomId', route.params.roomId), Q.sortBy('date', Q.desc))
      .observe(),
  };
});

export default enhance(ChatRoomScreen);
