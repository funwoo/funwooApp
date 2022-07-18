import {ActivityIndicator, Text, View} from 'react-native';
import React from 'react';
import {webSocketStatusType} from '../../../../context/WebsocketContextProvider';

export const WebsocketConnectStatus = ({
  status,
}: {
  status: webSocketStatusType;
}) => {
  if (status === '已連接') return null;
  return (
    <View
      style={{
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        position: 'absolute',
        bottom: 0,
      }}>
      <ActivityIndicator />
      <Text style={{color: 'white', marginLeft: 10, fontWeight: 'bold'}}>
        {status}
      </Text>
    </View>
  );
};
