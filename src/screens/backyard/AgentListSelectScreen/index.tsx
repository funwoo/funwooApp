import {FlatList, Pressable, View} from 'react-native';
import {useAsync} from 'react-use';
import apis from '../../../network/apis';
import React from 'react';
import Text from '../../../components/common/Text/BaseText';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
const AgentListSelectScreen = () => {
  const agentList = useAsync(async () => {
    const {data} = await apis.getAllAgentList();
    return data.users;
  }, []);
  console.log(JSON.stringify(agentList));
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, paddingTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{position: 'absolute', left: 16}}>
          <AntDesign size={25} name={'close'} />
        </Pressable>

        <Text style={{fontSize: 18, textAlign: 'center', fontWeight: '500'}}>
          選擇負責顧問
        </Text>
      </View>
      <FlatList
        data={agentList.value}
        renderItem={({item}) => {
          return (
            <View
              style={{
                height: 80,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>{item.username}</Text>
              <Text>{item._id}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
export default AgentListSelectScreen;
